import { EventEmitter, Injectable, OnDestroy } from '@angular/core';
import * as _ from 'lodash';
import { EventBusService } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service';
import { ReconnectedEventSourceEvent } from 'projects/commons/src/lib/sse/entities/reconnected-event-source-event';
// import { GitRefreshStorageEvent } from 'projects/commons/src/lib/git/events/git-refresh-storage-event';
import { StorageNode } from 'projects/storage/src/lib/entities/storage-node';
import { NodeCreatedEvent } from 'projects/storage/src/lib/entities/node-created-event';
import { NodeDeletedEvent } from 'projects/storage/src/lib/entities/node-deleted-event';
import { NodeEvent } from 'projects/storage/src/lib/entities/node-event';
import { NodeModifiedEvent } from 'projects/storage/src/lib/entities/node-modified-event';
import { NodeEventToNodePipe } from 'projects/storage/src/lib/pipes/node-event-to-node/node-event-to-node.pipe';
import { StorageNodeToNamePipe } from 'projects/storage/src/lib/pipes/storage-node-to-name/storage-node-to-name.pipe';
import { StorageNodeToParentPathPipe } from 'projects/storage/src/lib/pipes/storage-node-to-parent-path/storage-node-to-parent-path.pipe';
import { StorageNodeToPredicatePipe } from 'projects/storage/src/lib/pipes/storage-node-to-predicate/storage-node-to-predicate.pipe';
import { StorageService } from '../storage/storage.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class StorageListService implements OnDestroy {
  public readonly nodesSubject: BehaviorSubject<StorageNode[]> = new BehaviorSubject([]);
  public readonly nodeCreated: EventEmitter<StorageNode> = new EventEmitter<StorageNode>();
  public readonly nodeModified: EventEmitter<StorageNode> = new EventEmitter<StorageNode>();
  public readonly nodesDeleted: EventEmitter<StorageNode[]> = new EventEmitter<StorageNode[]>();
  public readonly nodesListed: EventEmitter<StorageNode[]> = new EventEmitter<StorageNode[]>();
  private readonly _eventSubscriptions: Subscription[] = [];
  private readonly _subscriptions: Subscription[] = [];
  private rootPath = '';
  private matcher: string;
  private maxDepth: number;

  constructor(
    private storage: StorageService,
    private eventBus: EventBusService,
    private toNode: NodeEventToNodePipe,
    private toName: StorageNodeToNamePipe,
    private toParentPath: StorageNodeToParentPathPipe,
    private toPredicate: StorageNodeToPredicatePipe,
  ) {
    this._subscriptions.push(
      eventBus.of(ReconnectedEventSourceEvent.CHANNEL).subscribe(this._refresh.bind(this)),
    );
    // this._subscriptions.push(
    //   eventBus.of(GitRefreshStorageEvent.CHANNEL).subscribe(this._refresh.bind(this)),
    // );
  }

  init(rootPath = '', matcher?: string, maxDepth?: number) {
    this.nodes = [];
    this.rootPath = rootPath;
    this.matcher = matcher;
    this.maxDepth = maxDepth;
    this._refresh();
  }

  ngOnDestroy() {
    _.invokeMap(this._subscriptions, 'unsubscribe');
    this._clearEventSubscriptions();
  }

  private _refresh() {
    // This method may be called multiple times. We must clear all subscriptions to avoid handling events multiple times.
    this._clearEventSubscriptions();

    this.storage.find(this.rootPath, this.matcher, this.maxDepth).subscribe((nodes) => {
      this.nodes = nodes;
      this.nodesListed.emit(this.nodes);

      const matcherRegexp = new RegExp(this.matcher || '.*');
      const filterNode = (node: StorageNode) =>
        node.path.startsWith(this.rootPath) && !!this.toName.transform(node).match(matcherRegexp);
      this._eventSubscriptions.push(
        this.eventBus
          .of<NodeEvent>(NodeCreatedEvent.CHANNEL)
          .pipe(map(this.toNode.transform), filter(filterNode))
          .subscribe(this._nodeCreated.bind(this)),
      );
      this._eventSubscriptions.push(
        this.eventBus
          .of(NodeDeletedEvent.CHANNEL)
          .pipe(map(this.toNode.transform))
          .subscribe(this._nodeDeleted.bind(this)),
      );
      this._eventSubscriptions.push(
        this.eventBus
          .of(NodeModifiedEvent.CHANNEL)
          .pipe(map(this.toNode.transform), filter(filterNode))
          .subscribe(this._nodeModified.bind(this)),
      );
    });
  }

  private _clearEventSubscriptions() {
    _.invokeMap(this._eventSubscriptions, 'unsubscribe');
    this._eventSubscriptions.length = 0;
  }

  set nodes(nodes: StorageNode[]) {
    this.sortedNodes = _.sortBy(nodes, this._nodeSorter.bind(this));
  }

  set sortedNodes(nodes: StorageNode[]) {
    this.nodesSubject.next(nodes);
  }

  // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
  get nodes(): StorageNode[] {
    return this.nodesSubject.value;
  }

  private _nodeCreated(node: StorageNode) {
    // check if node already exists (may happen if a node is created while we list the nodes)
    const existing = _.find(this.nodes, { path: node.path });
    if (existing && node.lastModified > existing.lastModified) {
      existing.length = node.length;
      existing.lastModified = node.lastModified;
      this.nodeModified.emit(existing);
      return;
    }
    const nodes = this.nodes;
    const index = _.sortedIndexBy(nodes, node, this._nodeSorter.bind(this));
    nodes.splice(index, 0, node);
    this.sortedNodes = nodes;
    this.nodeCreated.emit(node);
  }

  private _nodeDeleted(node: StorageNode) {
    const nodes = this.nodes;
    const deleted = _.remove(nodes, this.toPredicate.transform(node));
    if (deleted.length) {
      this.sortedNodes = nodes;
      this.nodesDeleted.emit(deleted);
    }
  }

  private _nodeModified(modified: StorageNode) {
    const node = _.find(this.nodes, { path: modified.path });
    node.length = modified.length;
    node.lastModified = modified.lastModified;
    this.nodeModified.emit(modified);
  }

  private _nodeSorter(node: StorageNode): string {
    if (node.type === 'DIRECTORY') {
      return node.path;
    }
    if (node.depth === 0) {
      return `\u27BF${this.toName.transform(node)}`;
    } else {
      const parentPath = this.toParentPath.transform(node);
      return `${parentPath}/\u27BF${this.toName.transform(node)}`;
    }
  }
}
