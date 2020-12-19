import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import * as _ from 'lodash';
import { EventBusService } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service';
import { StorageNode } from 'projects/storage/src/lib/entities/storage-node';
import { NodeModifiedEvent } from 'projects/storage/src/lib/entities/node-modified-event';
import { NodePendingSaveEvent } from 'projects/storage/src/lib/entities/node-pending-save-event';
import { SaveNodeEvent } from 'projects/storage/src/lib/entities/save-node-event';
import { StorageConfigurationService } from 'projects/storage/src/lib/services/storage-configuration/storage-configuration.service';
import { StorageService } from 'projects/storage/src/lib/services/storage/storage.service';
import { BehaviorSubject, Subscription, timer } from 'rxjs';
import { debounce, filter } from 'rxjs/operators';
// import { GitRefreshStorageEvent } from 'projects/commons/src/lib/git/events/git-refresh-storage-event';

@Injectable()
export class StorageNodeEditorContentService implements OnDestroy {
  public static readonly DEBOUNCE_DELAY = 2000;

  public state: 'loading' | 'loaded' | 'error' = 'loading';
  public error: string;

  _node: StorageNode;
  _contentSubject = new BehaviorSubject<string>(null);
  _silentUpdate = false;

  private subscriptions: Subscription[] = [];

  constructor(
    protected configuration: StorageConfigurationService,
    protected storage: StorageService,
    protected http: HttpClient,
    protected eventBus: EventBusService,
  ) {
    this.subscriptions.push(
      this.eventBus
        .of<NodeModifiedEvent>(NodeModifiedEvent.CHANNEL)
        .pipe(
          filter((event) => event.node.path === this._node.path),
          filter((event) => event.node.lastModified > this._node.lastModified),
        )
        .subscribe(this._nodeModified.bind(this)),
    );

    this.subscriptions.push(
      this.eventBus
        .of<SaveNodeEvent>(SaveNodeEvent.CHANNEL)
        .pipe(
          filter(() => !!this._node),
          filter((event) => event.node.path === this._node.path),
        )
        .subscribe(this.save.bind(this)),
    );

    // this.subscriptions.push(
    //   this.eventBus.of(GitRefreshStorageEvent.CHANNEL).subscribe(this._refreshOnGit.bind(this)),
    // );

    this.subscriptions.push(
      this._contentSubject
        .pipe(
          filter(() => !this._silentUpdate),
          filter(() => !!this._node),
          filter((content) => content !== null),
          debounce(() => {
            this.eventBus.publish(new NodePendingSaveEvent(this._node, true));
            return timer(StorageNodeEditorContentService.DEBOUNCE_DELAY);
          }),
        )
        .subscribe(this.save.bind(this)),
    );
  }

  ngOnDestroy() {
    this._contentSubject.complete();
    _.invokeMap(this.subscriptions, 'unsubscribe');
  }

  public save() {
    this.http
      .post<StorageNode>(
        this.configuration.storageApiUrl('/set/content'),
        this._contentSubject.value,
        {
          params: {
            path: this._node.path,
          },
        },
      )
      .subscribe(() => {
        this.eventBus.publish(new NodePendingSaveEvent(this._node, false));
      });
  }

  public load(node: StorageNode) {
    this._node = node;
    this.storage.getContent(node).subscribe(
      (content: string) => {
        this._setContent(content);
        this.state = 'loaded';
      },
      () => (this.state = 'error'),
    );
  }

  get content(): string {
    return this._contentSubject.value;
  }

  set content(content: string) {
    this._contentSubject.next(content);
  }

  _setContent(content: string) {
    this._silentUpdate = true;
    this._contentSubject.next(content);
    this._silentUpdate = false;
  }

  _nodeModified(event: NodeModifiedEvent) {
    this.http
      .get(this.configuration.storageApiUrl('/get/content'), {
        responseType: 'text',
        params: {
          path: this._node.path,
        },
      })
      .subscribe(this._setContent.bind(this));
  }

  _refreshOnGit() {
    if (!!this._node && this.state === 'loaded') {
      this.load(this._node);
    }
  }
}
