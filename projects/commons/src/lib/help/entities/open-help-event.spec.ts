import { OpenHelpEvent } from './open-help-event';

describe('OpenHelpEvent', () => {
  it('should create', () => {
    expect(new OpenHelpEvent('HOME')).toBeTruthy();
    expect(new OpenHelpEvent(null)).toBeTruthy();
  });
});
