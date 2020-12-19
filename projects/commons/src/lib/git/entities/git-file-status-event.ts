import { Color } from 'projects/commons/src/lib/color/entities/color';
import { BusEvent } from 'projects/commons/src/lib/event/entities/bus-event';

export class GitFileStatusEvent extends BusEvent {
  public static readonly CHANNEL = 'git-file-status-event';

  constructor(
    public readonly path: string,
    public readonly xy: string,
    public readonly color: Color = 'foreground',
  ) {
    super(GitFileStatusEvent.CHANNEL);
  }
}
