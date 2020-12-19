import { SelectionModel } from '@angular/cdk/collections';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TableOverlayComponent } from 'projects/commons/src/lib/table/components/table-overlay/table-overlay.component';
import {
  KeyBinding,
  KeyBindingsService,
} from 'projects/commons/src/lib/tools/services/key-bindings/key-bindings.service';
import { GuiToolsService } from 'projects/commons/src/lib/tools/services/gui-tools/gui-tools.service';
import * as _ from 'lodash';

@Component({
  selector: 'lib-table-overlay-selection',
  templateUrl: '../table-overlay/table-overlay.component.html',
  styleUrls: ['../table-overlay/table-overlay.component.scss'],
})
export class TableOverlaySelectionComponent<T>
  extends TableOverlayComponent
  implements OnInit, OnDestroy {
  @Input() loading: boolean;
  @Input() dataSource: MatTableDataSource<any>;
  @Input() noDataLabel: string;
  @Input() selection: SelectionModel<any>;
  @Output() deleteSelection = new EventEmitter<boolean>();
  @Output() enterSelection = new EventEmitter<void>();

  @ViewChild('scrollableTable') scrollableTable: ElementRef<HTMLElement>;

  private keyBindings: KeyBinding[] = [];

  constructor(
    private keys: KeyBindingsService,
    private element: ElementRef,
    private guiTools: GuiToolsService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.noDataLabel = this.noDataLabel || 'Нет данных';
    this.keyBindings.push(new KeyBinding(['ArrowUp', 'Up'], this.upSelection.bind(this), this.id));
    this.keyBindings.push(
      new KeyBinding(['ArrowDown', 'Down'], this.downSelection.bind(this), this.id),
    );
    this.keyBindings.push(
      new KeyBinding(['Delete', 'ctrl + Delete'], this._deleteSelectionEmit.bind(this), this.id),
    );
    this.keyBindings.push(new KeyBinding(['Enter'], this._enterSelectionEmit.bind(this), this.id));
    this.keyBindings.forEach((binding) => {
      this.keys.add([binding]);
    });
  }

  ngOnDestroy() {
    this.keyBindings.forEach((binding) => this.keys.remove([binding]));
  }

  public upSelection(): boolean {
    const lastIndex = this.getLastIndex();
    if (lastIndex > 0) {
      this.selectOne(this.nodes[lastIndex - 1]);
      this.guiTools.scrollTo(this.scrollableTable, this.getSelectedElement.bind(this));
      return true;
    }
    return false;
  }

  public downSelection(): boolean {
    const lastIndex = this.getLastIndex();
    if (lastIndex < this.nodes.length - 1) {
      this.selectOne(this.nodes[lastIndex + 1]);
      this.guiTools.scrollTo(this.scrollableTable, this.getSelectedElement.bind(this));
      return true;
    }
    return false;
  }

  _deleteSelectionEmit(event: KeyboardEvent): boolean {
    this.deleteSelection.emit(event.ctrlKey);
    return true;
  }

  _enterSelectionEmit(): boolean {
    this.enterSelection.emit();
    return true;
  }

  private get nodes(): any[] {
    return this.dataSource._orderData(this.dataSource.data);
  }

  private getLastIndex(): number {
    if (this.selection.isEmpty()) {
      return -1;
    }
    const nodes = this.dataSource._orderData(this.dataSource.data);
    const last = this.selection.selected[0];
    const node = nodes.find((item) => last.id === item.id);

    return _.indexOf(nodes, node);
  }

  private selectOne(node: any) {
    this.selection.clear();
    this.selection.select(node);
  }

  private getSelectedElement(): Element {
    return this.element.nativeElement.getElementsByClassName('mat-row-selected')[0];
  }
}
