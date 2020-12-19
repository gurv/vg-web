import { BusEvent } from 'projects/commons/src/lib/event/entities/bus-event';
import { SplitPane } from './split-pane';

export class SplitShownEvent extends BusEvent {
  public static readonly CHANNEL = 'split-shown';

  constructor(public id: string, public index: number, public pane: SplitPane) {
    super(SplitShownEvent.CHANNEL);
  }
}
