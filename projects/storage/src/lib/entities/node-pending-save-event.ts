import { BusEvent } from 'projects/commons/src/lib/event/entities/bus-event';
import { StorageNode } from './storage-node';

export class NodePendingSaveEvent extends BusEvent {
  public static readonly CHANNEL = 'storage-node-pending-save';

  constructor(public readonly node: StorageNode, public readonly pendingSave: boolean) {
    super(NodePendingSaveEvent.CHANNEL);
  }
}
