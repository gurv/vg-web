import { BusEvent } from 'projects/commons/src/lib/event/entities/bus-event';

export class GitLogEvent extends BusEvent {
  public static readonly CHANNEL = 'git-log-event';

  constructor(public readonly text: string) {
    super(GitLogEvent.CHANNEL);
  }
}
