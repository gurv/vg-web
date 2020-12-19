import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { EventBusService } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service';
import { StorageNode } from 'projects/storage/src/lib/entities/storage-node';
import { NodeDeletedEvent } from 'projects/storage/src/lib/entities/node-deleted-event';
import { StorageConfigurationService } from '../storage-configuration/storage-configuration.service';
import { StorageNodeToPredicatePipe } from 'projects/storage/src/lib/pipes/storage-node-to-predicate/storage-node-to-predicate.pipe';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

@Injectable()
export class CopyPasteService implements OnDestroy {
  _cutNodes: SelectionModel<StorageNode>;
  _copiedNodes: SelectionModel<StorageNode>;

  private subscription: Subscription;

  constructor(
    private configuration: StorageConfigurationService,
    private http: HttpClient,
    private eventBus: EventBusService,
    private toPredicate: StorageNodeToPredicatePipe,
  ) {
    this._cutNodes = new SelectionModel(true);
    this._copiedNodes = new SelectionModel(true);
    this.subscription = this.eventBus
      .of(NodeDeletedEvent.CHANNEL)
      .subscribe(this._fileDeleted.bind(this));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  cut(nodes: StorageNode[]) {
    this.clearSelection();
    this._cutNodes.select(...nodes);
  }

  copy(nodes: StorageNode[]) {
    this.clearSelection();
    this._copiedNodes.select(...nodes);
  }

  paste(node: StorageNode) {
    const nodes = this._cutNodes.hasValue() ? this._cutNodes.selected : this._copiedNodes.selected;
    const path = this._cutNodes.hasValue() ? '/move' : '/copy';
    this.http
      .post<StorageNode[]>(this.configuration.storageApiUrl(path), _.map(nodes, 'path'), {
        params: {
          destination: node.path,
        },
      })
      .subscribe();
    this.clearSelection();
  }

  isCut(node: StorageNode): boolean {
    return this._cutNodes.isSelected(node);
  }

  canPaste(): boolean {
    return this._cutNodes.hasValue() || this._copiedNodes.hasValue();
  }

  clearSelection() {
    this._copiedNodes.clear();
    this._cutNodes.clear();
  }

  _fileDeleted(event: NodeDeletedEvent) {
    const predicate = this.toPredicate.transform(event.node);
    _.filter(this._copiedNodes.selected, predicate).forEach((node: StorageNode) =>
      this._copiedNodes.deselect(node),
    );
    _.filter(this._cutNodes.selected, predicate).forEach((node: StorageNode) =>
      this._cutNodes.deselect(node),
    );
  }
}
