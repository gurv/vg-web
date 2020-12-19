import { BusEvent } from 'projects/commons/src/lib/event/entities/bus-event';

export class OpenStorageTreeEvent extends BusEvent {
  public static readonly CHANNEL = 'open-storage-tree';

  constructor() {
    super(OpenStorageTreeEvent.CHANNEL);
  }
}
