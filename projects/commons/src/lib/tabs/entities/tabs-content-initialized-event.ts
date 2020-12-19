import { BusEvent } from 'projects/commons/src/lib/event/entities/bus-event';

export class TabsContentInitializedEvent extends BusEvent {
  public static readonly CHANNEL = 'tabs-content-initialized';

  constructor(public content: any) {
    super(TabsContentInitializedEvent.CHANNEL);
  }
}
