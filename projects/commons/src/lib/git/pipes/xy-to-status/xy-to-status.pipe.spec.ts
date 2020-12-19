import { XyToStatusPipe } from './xy-to-status.pipe';

describe('XyToStatusPipe', () => {
  let pipe: XyToStatusPipe;

  beforeEach(() => {
    pipe = new XyToStatusPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform ..', () => {
    expect(pipe.transform('..')).toBe('Unmodified/Unmodified');
  });

  it('should transform M.', () => {
    expect(pipe.transform('M.')).toBe('Modified/Unmodified');
  });

  it('should transform .M', () => {
    expect(pipe.transform('.M')).toBe('Unmodified/Modified');
  });

  it('should transform AM', () => {
    expect(pipe.transform('AM')).toBe('Added/Modified');
  });
});
