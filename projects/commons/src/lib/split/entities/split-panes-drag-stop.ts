import { BusEvent } from 'projects/commons/src/lib/event/entities/bus-event';

export class SplitPanesDragStop extends BusEvent {
  public static readonly CHANNEL = 'split-drag-stop';

  constructor() {
    super(SplitPanesDragStop.CHANNEL);
  }
}
