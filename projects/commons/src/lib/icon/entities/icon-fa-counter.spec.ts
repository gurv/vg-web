import { IconFaCounter } from './icon-fa-counter';
import { IconFa } from './icon-fa';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons/faAsterisk';

describe('IconFaCounter', () => {
  it('should new', () => {
    expect(new IconFaCounter(new IconFa(faAsterisk))).toBeDefined();
  });
});
