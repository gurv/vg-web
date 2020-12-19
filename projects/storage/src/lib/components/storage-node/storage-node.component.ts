import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import {
  Component,
  ElementRef,
  Inject,
  InjectionToken,
  Injector,
  Input,
  OnDestroy,
  Optional,
} from '@angular/core';
import { Color } from 'projects/commons/src/lib/color/entities/color';
import { EventBusService } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service';
import { GitFileStatusEvent } from 'projects/commons/src/lib/git/entities/git-file-status-event';
import { GitFileStatusService } from 'projects/commons/src/lib/git/services/git-file-status/git-file-status.service';
import { StorageNode } from 'projects/storage/src/lib/entities/storage-node';
import { STORAGE_NODE } from 'projects/storage/src/lib/entities/storage-node-editor';
import { StorageNodeButtonsComponent } from 'projects/storage/src/lib/components/storage-node-buttons/storage-node-buttons.component';
import { StorageTreeControlService } from 'projects/storage/src/lib/services/storage-tree-control/storage-tree-control.service';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export const STORAGE_NODE_BUTTONS = new InjectionToken<ComponentType<any>>('StorageNodeButtons');

@Component({
  selector: 'lib-storage-node',
  templateUrl: './storage-node.component.html',
  styleUrls: ['./storage-node.component.scss'],
})
export class StorageNodeComponent implements OnDestroy {
  @Input() public expanded: boolean;

  _subscription: Subscription;

  public hasChild: boolean;
  public nodeButtons: ComponentPortal<any>;
  public color: Color = 'foreground';

  private _hover = false;
  private _node: StorageNode;

  constructor(
    public ref: ElementRef,
    public treeControl: StorageTreeControlService,
    private injector: Injector,
    @Inject(STORAGE_NODE_BUTTONS) @Optional() private nodeButtonsType: any /*ComponentType<any>*/,
    private eventBus: EventBusService,
    private gitFileStatus: GitFileStatusService,
  ) {
    this._subscription = this.eventBus
      .of<GitFileStatusEvent>(GitFileStatusEvent.CHANNEL)
      .pipe(
        filter((event) => event.path === this._node.path),
        map((event) => event.color),
      )
      .subscribe((color) => {
        this.color = color;
      });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  @Input() set node(node: StorageNode) {
    this._node = node;
    this.hasChild = node.type === 'DIRECTORY';
    this.hover = false;
    this.color = this.gitFileStatus.getEvent(this._node.path).color;
  }

  get node(): StorageNode {
    return this._node;
  }

  set hover(hover: boolean) {
    if (hover) {
      this.nodeButtons = new ComponentPortal(
        this.nodeButtonsType ? this.nodeButtonsType : StorageNodeButtonsComponent,
        null,
        Injector.create({
          providers: [{ provide: STORAGE_NODE, useValue: this.node }],
          parent: this.injector,
        }),
      );
    } else if (this.nodeButtons && this.nodeButtons.isAttached) {
      this.nodeButtons.detach();
    }
    this._hover = hover;
  }

  get hover(): boolean {
    return this._hover;
  }
}
