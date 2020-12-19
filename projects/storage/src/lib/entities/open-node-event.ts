import { BusEvent } from 'projects/commons/src/lib/event/entities/bus-event';
import { StorageNode } from './storage-node';

export class OpenNodeEvent extends BusEvent {
  public static readonly CHANNEL = 'open-storage-node';

  constructor(public readonly node: StorageNode) {
    super(OpenNodeEvent.CHANNEL);
  }
}
