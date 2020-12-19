import { SelectHelpEvent } from './select-help-event';

describe('SelectHelpEvent', () => {
  it('should create', () => {
    expect(new SelectHelpEvent('HOME')).toBeTruthy();
    expect(new SelectHelpEvent(null)).toBeTruthy();
  });
});
