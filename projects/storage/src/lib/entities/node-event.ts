import { BusEvent } from 'projects/commons/src/lib/event/entities/bus-event';
import { StorageNode } from './storage-node';

export class NodeEvent extends BusEvent {
  constructor(public readonly node: StorageNode, public channel: string) {
    super(channel);
  }
}
