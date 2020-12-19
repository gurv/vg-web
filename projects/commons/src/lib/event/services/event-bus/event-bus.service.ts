import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { BusEvent } from 'projects/commons/src/lib/event/entities/bus-event';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EventBusService {
  private events: Subject<BusEvent>;

  constructor() {
    this.events = new Subject<BusEvent>();
  }

  publish(event: BusEvent): void {
    this.events.next(event);
  }

  of<T extends BusEvent>(...channels: string[]): Observable<T> {
    return this.events.pipe(filter((event: T) => _.indexOf(channels, event.channel) !== -1));
  }
}
