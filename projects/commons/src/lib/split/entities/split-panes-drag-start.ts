import { BusEvent } from 'projects/commons/src/lib/event/entities/bus-event';

export class SplitPanesDragStart extends BusEvent {
  public static readonly CHANNEL = 'split-drag-start';

  constructor() {
    super(SplitPanesDragStart.CHANNEL);
  }
}
