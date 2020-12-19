import { StorageNode } from './storage-node';
import { NodeEvent } from './node-event';

export class NodeModifiedEvent extends NodeEvent {
  public static readonly CHANNEL = 'storage-node-modified';

  constructor(node: StorageNode) {
    super(node, NodeModifiedEvent.CHANNEL);
  }
}
