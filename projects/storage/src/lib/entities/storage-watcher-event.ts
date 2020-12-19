import { StorageNode } from './storage-node';
import { StorageWatcherEventType } from './storage-watcher-event-type';
import { Owner } from 'projects/commons/src/lib/security/entities/owner';

export interface StorageWatcherEvent {
  node: StorageNode;
  type: StorageWatcherEventType;
  owner: Owner;
}
