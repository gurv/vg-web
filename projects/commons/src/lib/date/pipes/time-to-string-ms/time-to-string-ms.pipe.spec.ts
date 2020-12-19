import { TimeToStringMsPipe } from './time-to-string-ms.pipe';

describe('TimeToStringMsPipe', () => {
  it('create an instance', () => {
    const pipe = new TimeToStringMsPipe();

    expect(pipe).toBeTruthy();
  });

  // TODO
  // it('format date', () => {
  //   const pipe = new TimeToStringMsPipe();

  //   expect(pipe.transform(0)).toEqual('01:00:00:000');
  // });
});
