import { ComponentPortal } from '@angular/cdk/portal';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  AfterViewInit,
  Component,
  Inject,
  InjectionToken,
  OnInit,
  Optional,
  ViewChild
} from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCompress } from '@fortawesome/free-solid-svg-icons/faCompress';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import { EventBusService } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service';
import { HelpPageId } from 'projects/commons/src/lib/help/entities/help-page-id';
import { SelectHelpEvent } from 'projects/commons/src/lib/help/entities/select-help-event';
import { IconFa } from 'projects/commons/src/lib/icon/entities/icon-fa';
import { StorageContextualMenuComponent } from 'projects/storage/src/lib/components/storage-contextual-menu/storage-contextual-menu.component';
import { STORAGE_ID } from 'projects/storage/src/lib/entities/storage-id';
import { StorageNode } from 'projects/storage/src/lib/entities/storage-node';
import { CopyPasteService } from 'projects/storage/src/lib/services/copy-paste/copy-paste.service';
import { StorageKeyBindingService } from 'projects/storage/src/lib/services/storage-key-binding/storage-key-binding.service';
import { StorageTreeControlService } from 'projects/storage/src/lib/services/storage-tree-control/storage-tree-control.service';
import {
  StorageTreeDataSourceService,
  STORAGE_ROOT_NODE,
} from 'projects/storage/src/lib/services/storage-tree-data-source/storage-tree-data-source.service';
import { StorageTreeScrollService } from 'projects/storage/src/lib/services/storage-tree-scroll/storage-tree-scroll.service';
import { StorageListService } from 'projects/storage/src/lib/services/storage-list/storage-list.service';

library.add(faEllipsisV, faCompress);

export const STORAGE_CONTEXTUAL_MENU = new InjectionToken<any /*ComponentType<any>*/>(
  'StorageContextualMenu',
);
export const STORAGE_TREE_LABEL = new InjectionToken<string>('StorageTreeLabel');

@Component({
  selector: 'lib-storage-tree',
  templateUrl: './storage-tree.component.html',
  styleUrls: ['./storage-tree.component.scss'],
  providers: [
    StorageListService,
    StorageTreeDataSourceService,
    StorageTreeControlService,
    StorageKeyBindingService,
    StorageTreeScrollService,
    CopyPasteService,
  ],
})
export class StorageTreeComponent implements OnInit, AfterViewInit {
  @ViewChild('scrollableTree') scrollableTree: CdkVirtualScrollViewport;

  readonly menuIcon = new IconFa(faEllipsisV, 'primary');
  readonly collapseAllIcon = new IconFa(faCompress, 'foreground');

  public contextualMenu: ComponentPortal<any>;
  public label: string;

  constructor(
    public treeControl: StorageTreeControlService,
    public dataSource: StorageTreeDataSourceService,
    public copyPaste: CopyPasteService,
    @Inject(STORAGE_CONTEXTUAL_MENU) @Optional() contextualMenuType: any /*ComponentType<any>*/,
    @Inject(STORAGE_TREE_LABEL) @Optional() label: string,
    @Inject(STORAGE_ID) public id: string,
    @Inject(STORAGE_ROOT_NODE) private readonly rootNode: StorageNode,
    private eventBus: EventBusService,
    private keyBinding: StorageKeyBindingService, // DO NOT REMOVE
    private scroll: StorageTreeScrollService,
  ) {
    dataSource.treeControl = treeControl;
    this.contextualMenu = new ComponentPortal<any>(
      contextualMenuType ? contextualMenuType : StorageContextualMenuComponent,
    );
    this.label = label ? label : 'Files';
  }

  ngOnInit() {
    this.dataSource.init();
  }

  ngAfterViewInit(): void {
    this.scroll.init(this.scrollableTree);
    this.keyBinding.init();
  }

  selectHelpPage() {
    this.eventBus.publish(new SelectHelpEvent(this.id as HelpPageId));
  }

  depth(node: StorageNode): number {
    return node.depth - this.rootNode.depth - 1;
  }
}
