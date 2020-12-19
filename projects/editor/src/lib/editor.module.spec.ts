import { EditorModule } from './editor.module';

describe('EditorModule', () => {
  let codeModule: EditorModule;

  beforeEach(() => {
    codeModule = new EditorModule();
  });

  it('should create an instance', () => {
    expect(codeModule).toBeTruthy();
  });
});
