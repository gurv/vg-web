import { inject, TestBed } from '@angular/core/testing';
import { BusEvent } from 'projects/commons/src/lib/event/entities/bus-event';
import { EMPTY } from 'rxjs';
import { EventBusService } from './event-bus.service';

export const eventBusSpy = () => {
  // eslint-disable-next-line jasmine/no-unsafe-spy
  const spy = jasmine.createSpyObj('EventBusService', ['publish', 'of']);
  spy.of.and.returnValue(EMPTY);
  return spy;
};

class TestMessage extends BusEvent {
  constructor(public testStr: string) {
    super('test');
  }
}

describe('EventBusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventBusService],
    });
  });

  it('should be created', inject([EventBusService], (service: EventBusService) => {
    const testSubscription = service.of<TestMessage>('test').subscribe((message) => {
      expect(message.testStr).toBe('toto');
    });
    service.publish(new TestMessage('toto'));
    testSubscription.unsubscribe();
  }));
});
