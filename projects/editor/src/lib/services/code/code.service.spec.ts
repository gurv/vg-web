import { TestBed, inject } from '@angular/core/testing';
import { CodeService } from './code.service';

export const codeServiceSpy = () =>
  // eslint-disable-next-line jasmine/no-unsafe-spy
  jasmine.createSpyObj('CodeService', ['initCodeEditorComponent', 'autoCompleteVariableNames']);

describe('CodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CodeService],
    });
  });

  it('should be created', inject([CodeService], (service: CodeService) => {
    expect(service).toBeTruthy();
  }));

  it('should initCodeEditorComponent', inject([CodeService], (service: CodeService) => {
    const editorSpy = jasmine.createSpyObj('Editor', ['resize']);
    editorSpy.completers = [];
    service.initCodeEditorComponent(editorSpy);

    expect(editorSpy.resize).toHaveBeenCalledWith(true);
    expect(editorSpy.completers.length).toBe(0);
  }));

  it('should initCodeEditorComponent (2)', inject([CodeService], (service: CodeService) => {
    const editorSpy = jasmine.createSpyObj('Editor', ['resize']);
    const completerSpy = jasmine.createSpyObj('VariablesAutoCompleter', [
      'autoCompleteVariableNames',
    ]);
    editorSpy.completers = [];
    service.initCodeEditorComponent(editorSpy, completerSpy);

    expect(editorSpy.resize).toHaveBeenCalledWith(true);
    expect(editorSpy.completers.length).toBe(1);
  }));
});
