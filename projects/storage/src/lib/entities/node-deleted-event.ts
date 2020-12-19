import { StorageNode } from './storage-node';
import { NodeEvent } from './node-event';

export class NodeDeletedEvent extends NodeEvent {
  public static readonly CHANNEL = 'storage-node-deleted';

  constructor(node: StorageNode) {
    super(node, NodeDeletedEvent.CHANNEL);
  }
}
