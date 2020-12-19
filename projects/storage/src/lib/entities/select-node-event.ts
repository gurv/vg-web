import { BusEvent } from 'projects/commons/src/lib/event/entities/bus-event';
import { StorageNode } from './storage-node';

export class SelectNodeEvent extends BusEvent {
  public static readonly CHANNEL = 'select-storage-node';

  constructor(public readonly node: StorageNode) {
    super(SelectNodeEvent.CHANNEL);
  }
}
