import { BusEvent } from 'projects/commons/src/lib/event/entities/bus-event';
import { StorageNode } from './storage-node';

export class ContextualMenuEvent extends BusEvent {
  public static readonly CHANNEL = 'storage-contextual-menu';

  constructor(
    public readonly $event: MouseEvent,
    public readonly storageId: string,
    public readonly node?: StorageNode,
  ) {
    super(ContextualMenuEvent.CHANNEL);
  }
}
