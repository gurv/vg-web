import { BusEvent } from 'projects/commons/src/lib/event/entities/bus-event';

export class GitRefreshStorageEvent extends BusEvent {
  public static readonly CHANNEL = 'git-refresh-storage-event';

  constructor() {
    super(GitRefreshStorageEvent.CHANNEL);
  }
}
