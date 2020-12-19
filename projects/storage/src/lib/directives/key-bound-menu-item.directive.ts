import { Directive, OnDestroy, OnInit } from '@angular/core';
import {
  KeyBinding,
  KeyBindingsService,
} from 'projects/commons/src/lib/tools/services/key-bindings/key-bindings.service';
import { StorageNode } from 'projects/storage/src/lib/entities/storage-node';
import { StorageTreeControlService } from 'projects/storage/src/lib/services/storage-tree-control/storage-tree-control.service';

@Directive()
export class KeyBoundMenuItemDirective implements OnInit, OnDestroy {
  constructor(
    protected treeControl: StorageTreeControlService,
    protected keys: KeyBindingsService,
    public binding: KeyBinding,
  ) {}

  ngOnInit() {
    this.keys.add([this.binding]);
  }

  ngOnDestroy() {
    this.keys.remove([this.binding]);
  }

  _handleKey(operation: (nodes: StorageNode[]) => void): boolean {
    if (this.treeControl.hasSelection) {
      operation(this.treeControl.selected);
      return true;
    }
    return false;
  }
}
