import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { ChangeDetectorRef } from '@angular/core';
import { CodeEditorComponent } from './code-editor.component';
import { CodeEditorModule } from './code-editor.module';
import { CodeService } from '../../services/code/code.service';
import { codeServiceSpy } from '../../services/code/code.service.spec';
import { changeDetectorSpy } from 'projects/commons/src/lib/mock/angular.mock.spec';
import { KeyBinding } from 'projects/commons/src/lib/tools/services/key-bindings/key-bindings.service';
import { CodeSnippetService } from '../../services/code-snippet/code-snippet.service';
import { codeSnippetServiceSpy } from '../../services/code-snippet/code-snippet.service.spec';
import * as _ from 'lodash';
import SpyObj = jasmine.SpyObj;

export const codeEditorComponentSpy = () => {
  // eslint-disable-next-line jasmine/no-unsafe-spy
  const spy = jasmine.createSpyObj('CodeEditorComponent', ['appendText']);
  return spy;
};

describe('CodeEditorComponent', () => {
  let component: CodeEditorComponent;
  let fixture: ComponentFixture<CodeEditorComponent>;
  let codeService: CodeService;
  let codeSnippetService: CodeSnippetService;
  let changeDetector: SpyObj<ChangeDetectorRef>;

  beforeEach(
    waitForAsync(() => {
      codeService = codeServiceSpy();
      codeSnippetService = codeSnippetServiceSpy();
      changeDetector = changeDetectorSpy();
      TestBed.configureTestingModule({
        imports: [CodeEditorModule],
        providers: [
          { provide: CodeService, useValue: codeService },
          { provide: CodeSnippetService, useValue: codeSnippetService },
          { provide: ChangeDetectorRef, useValue: changeDetector },
        ],
      })
        .overrideComponent(CodeEditorComponent, {
          set: {
            providers: [{ provide: CodeService, useValue: codeService }],
          },
        })
        .compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeEditorComponent);
    component = fixture.componentInstance;
    component.variablesAutoCompleter = jasmine.createSpyObj('VariablesAutoCompleter', [
      'autoCompleteVariableNames',
    ]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init editorComponent', inject([CodeService], (service: CodeService) => {
    component.keyBindings = [new KeyBinding(['Del'], ($event: KeyboardEvent) => true)];
    component.ngAfterViewInit();

    expect(service.initCodeEditorComponent).toHaveBeenCalledWith(
      component._editor,
      component.variablesAutoCompleter,
    );
  }));

  it('should init editorComponent with tab size', inject([CodeService], (service: CodeService) => {
    component.tabsSize = 42;
    spyOn(component._editor.getSession(), 'setTabSize');
    component.ngAfterViewInit();

    expect(service.initCodeEditorComponent).toHaveBeenCalledWith(
      component._editor,
      component.variablesAutoCompleter,
    );

    expect(component._editor.getSession().setTabSize).toHaveBeenCalledWith(42);
  }));

  it('should fire change event', () => {
    spyOn(component.contentChange, 'emit');
    spyOn(component._onChange, 'emit');
    spyOn(component._onTouched, 'emit');
    component.writeValue('test');

    expect(component.contentChange.emit).toHaveBeenCalledWith('test');
    expect(component._onChange.emit).toHaveBeenCalledWith('test');
    // eslint-disable-next-line jasmine/prefer-toHaveBeenCalledWith
    expect(component._onTouched.emit).toHaveBeenCalled();
  });

  it('should register change event', () => {
    spyOn(component._onChange, 'subscribe');
    spyOn(component._onTouched, 'subscribe');
    component.registerOnChange(_.noop);
    component.registerOnTouched(_.noop);

    // eslint-disable-next-line jasmine/prefer-toHaveBeenCalledWith
    expect(component._onChange.subscribe).toHaveBeenCalled();
    // eslint-disable-next-line jasmine/prefer-toHaveBeenCalledWith
    expect(component._onTouched.subscribe).toHaveBeenCalled();
  });

  it('should set disabled state', () => {
    component.setDisabledState(true);

    expect(component._editor.getReadOnly()).toBe(true);
  });

  it('should set mode', () => {
    const spy = spyOn(component._editor.getSession(), 'setMode');
    component.mode = 'java';

    expect(component._mode).toBe('java');
    expect(spy).toHaveBeenCalledWith('ace/mode/java');
  });

  it('should set mode no editor', () => {
    const comp = new CodeEditorComponent(null, null, null, null);
    comp.mode = 'java';

    expect(comp._mode).toBe('java');
  });

  it('should resize', () => {
    const spy = spyOn(component._editor, 'resize');
    component.resize();

    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should set and get value', () => {
    component.value = 'new value';

    expect(component.value).toBe('new value');
  });

  it('should set value no editor', () => {
    const comp = new CodeEditorComponent(null, null, null, null);
    comp.value = 'new value';

    expect(comp._value).toBe('new value');
  });

  it('should append text no editor', () => {
    const comp = new CodeEditorComponent(null, null, null, null);
    comp._value = 'foo';
    comp.appendText('bar');

    expect(comp._value).toBe('foobar');
  });

  it('should append text', () => {
    component.appendText('appended');
  });
});
