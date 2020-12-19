import { StorageNode } from './storage-node';
import { NodeEvent } from './node-event';

export class NodeCreatedEvent extends NodeEvent {
  public static readonly CHANNEL = 'storage-node-created';

  constructor(node: StorageNode) {
    super(node, NodeCreatedEvent.CHANNEL);
  }
}
