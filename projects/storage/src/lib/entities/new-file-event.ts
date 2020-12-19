import { BusEvent } from 'projects/commons/src/lib/event/entities/bus-event';
import { StorageNode } from './storage-node';

export class NewFileEvent extends BusEvent {
  public static readonly CHANNEL = 'new-file';

  constructor(public readonly node: StorageNode) {
    super(NewFileEvent.CHANNEL);
  }
}
