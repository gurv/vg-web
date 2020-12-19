import { BusEvent } from 'projects/commons/src/lib/event/entities/bus-event';
import { GitStatus } from './git-status';

export class GitStatusEvent extends BusEvent {
  public static readonly CHANNEL = 'git-status-event';

  constructor(public readonly status: GitStatus) {
    super(GitStatusEvent.CHANNEL);
  }
}
