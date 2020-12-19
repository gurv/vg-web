import { BusEvent } from 'projects/commons/src/lib/event/entities/bus-event';
import { StorageNode } from './storage-node';

export class SaveNodeEvent extends BusEvent {
  public static readonly CHANNEL = 'save-storage-node';

  constructor(public readonly node: StorageNode) {
    super(SaveNodeEvent.CHANNEL);
  }
}
