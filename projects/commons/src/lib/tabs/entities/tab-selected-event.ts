import { BusEvent } from 'projects/commons/src/lib/event/entities/bus-event';
import { Tab } from './tab';

export class TabSelectedEvent extends BusEvent {
  public static readonly CHANNEL = 'tab-selected';

  constructor(public tab: Tab) {
    super(TabSelectedEvent.CHANNEL);
  }
}
