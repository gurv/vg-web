import { BusEvent } from 'projects/commons/src/lib/event/entities/bus-event';
import { SplitPane } from './split-pane';

export class SplitHiddenEvent extends BusEvent {
  public static readonly CHANNEL = 'split-hidden';

  constructor(public id: string, public index: number, public pane: SplitPane) {
    super(SplitHiddenEvent.CHANNEL);
  }
}
