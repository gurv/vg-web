import { BusEvent } from 'projects/commons/src/lib/event/entities/bus-event';
import { Tab } from './tab';

export class TabUnselectedEvent extends BusEvent {
  public static readonly CHANNEL = 'tab-unselected';

  constructor(public tab: Tab) {
    super(TabUnselectedEvent.CHANNEL);
  }
}
