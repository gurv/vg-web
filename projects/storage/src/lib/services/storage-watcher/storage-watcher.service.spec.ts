import { TestBed } from '@angular/core/testing';
import { CoreTestModule } from 'projects/commons/src/lib/core/core.module.spec';
import { EventBusService } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service';
import { SSEEvent } from 'projects/commons/src/lib/sse/entities/sse-event';
import { testStorageDirectoryNode } from 'projects/storage/src/lib/entities/storage-node.spec';
import { StorageWatcherEvent } from 'projects/storage/src/lib/entities/storage-watcher-event';
import { NodeCreatedEvent } from 'projects/storage/src/lib/entities/node-created-event';
import { NodeDeletedEvent } from 'projects/storage/src/lib/entities/node-deleted-event';
import { NodeModifiedEvent } from 'projects/storage/src/lib/entities/node-modified-event';
import { StorageWatcherService } from './storage-watcher.service';

describe('StorageWatcherService', () => {
  let service: StorageWatcherService;
  let eventBus: EventBusService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreTestModule],
      providers: [EventBusService, StorageWatcherService],
    });
    eventBus = TestBed.inject(EventBusService);
    service = TestBed.inject(StorageWatcherService);
  });

  afterEach(() => {
    service.ngOnDestroy();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle CREATE event', () => {
    const watcherEvent: StorageWatcherEvent = {
      node: testStorageDirectoryNode(),
      type: 'CREATE',
      owner: null,
    };
    const spy = spyOn(eventBus, 'publish').and.callThrough();
    eventBus.publish(new SSEEvent({ type: 'NODE', value: watcherEvent }));

    expect(spy).toHaveBeenCalledWith(new NodeCreatedEvent(watcherEvent.node));
  });

  it('should handle DELETE event', () => {
    const watcherEvent: StorageWatcherEvent = {
      node: testStorageDirectoryNode(),
      type: 'DELETE',
      owner: null,
    };
    const spy = spyOn(eventBus, 'publish').and.callThrough();
    eventBus.publish(new SSEEvent({ type: 'NODE', value: watcherEvent }));

    expect(spy).toHaveBeenCalledWith(new NodeDeletedEvent(watcherEvent.node));
  });

  it('should handle MODIFY event', () => {
    const watcherEvent: StorageWatcherEvent = {
      node: testStorageDirectoryNode(),
      type: 'MODIFY',
      owner: null,
    };
    const spy = spyOn(eventBus, 'publish').and.callThrough();
    eventBus.publish(new SSEEvent({ type: 'NODE', value: watcherEvent }));

    expect(spy).toHaveBeenCalledWith(new NodeModifiedEvent(watcherEvent.node));
  });
});
