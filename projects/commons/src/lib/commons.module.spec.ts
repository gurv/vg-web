import { CommonsModule } from 'projects/commons/src/lib/commons.module';

describe('CommonsModule', () => {
  let layoutModule: CommonsModule;

  beforeEach(() => {
    layoutModule = new CommonsModule();
  });

  it('should create an instance', () => {
    expect(layoutModule).toBeTruthy();
  });
});
