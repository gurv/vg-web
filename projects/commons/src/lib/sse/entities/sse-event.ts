import { BusEvent } from 'projects/commons/src/lib/event/entities/bus-event';
import { SSEWrapper } from './sse-wrapper';

export class SSEEvent extends BusEvent {
  public static readonly CHANNEL = 'sse-event';

  constructor(public readonly wrapper: SSEWrapper) {
    super(SSEEvent.CHANNEL);
  }
}
