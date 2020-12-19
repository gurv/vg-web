import { BusEvent } from 'projects/commons/src/lib/event/entities/bus-event';
import { TabsSide } from './tabs-side';
import { TabsPosition } from './tabs-position';

export class TabsAddedEvent extends BusEvent {
  public static readonly CHANNEL = 'tabs-added';

  constructor(public side: TabsSide, public position: TabsPosition) {
    super(TabsAddedEvent.CHANNEL);
  }
}
