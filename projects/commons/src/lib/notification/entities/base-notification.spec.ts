import { NotificationLevel } from './notification-level';
import { BaseNotification } from './base-notification';
import { BusEvent } from 'projects/commons/src/lib/event/entities/bus-event';

export const testNotification: () => BaseNotification = () => new BaseNotification('test');

describe('BaseNotification', () => {
  it('should be created', () => {
    expect(testNotification()).toBeTruthy();
  });

  it('should be created with all constructor fields', () => {
    expect(
      new BaseNotification(`TADA !`, NotificationLevel.ERROR, 'HOME', {
        selector: '.test',
        busEvent: new BusEvent('open-left-tab'),
      }),
    ).toBeTruthy();
  });
});
