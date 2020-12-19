import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CodeService } from '../../services/code/code.service';
import { CodeMode } from '../../entities/code-mode';
import { VariablesAutoCompleter } from '../../entities/variables-auto-completer';
import { KeyBinding } from 'projects/commons/src/lib/tools/services/key-bindings/key-bindings.service';
import { CodeSnippet } from '../../entities/code-snippet';
import { CodeSnippetService } from '../../services/code-snippet/code-snippet.service';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { Ace, edit } from 'ace-builds';
import Editor = Ace.Editor;

@Component({
  selector: 'lib-code-editor',
  template: '',
  styleUrls: ['./code-editor.component.scss'],
  providers: [
    CodeService,
    CodeSnippetService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CodeEditorComponent),
      multi: true,
    },
  ],
})
export class CodeEditorComponent implements OnInit, OnDestroy, AfterViewInit, ControlValueAccessor {
  @Input() readonly = false;
  @Input() enableBasicAutoCompletion = true;
  @Input() snippets: CodeSnippet[] = [];
  @Input() variablesAutoCompleter?: VariablesAutoCompleter;
  @Input() tabsSize?: number;
  @Input() keyBindings?: KeyBinding[];
  @Output() contentChange = new EventEmitter<string>();
  _value = '';
  _mode: CodeMode = 'text';
  _editor: Ace.Editor;
  _onTouched = new EventEmitter<string>();
  _onChange = new EventEmitter<string>();
  _silent = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private codeService: CodeService,
    private codeSnippetService: CodeSnippetService,
    private elRef: ElementRef,
    private changeDetector: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    if (!!this.snippets.length) {
      this.codeSnippetService.load(this.snippets, this._mode);
    }

    this._editor = edit(this.elRef.nativeElement, {
      fontSize: '11pt',
      theme: 'ace/theme/vg',
      mode: this.sessionMode,
      readOnly: this.readonly,
      value: this._value,
      enableSnippets: !!this.snippets.length,
      enableBasicAutocompletion: this.enableBasicAutoCompletion,
    } as any);

    let scrolled = false;
    this._editor.renderer.on('afterRender', () => {
      if (!scrolled) {
        this.scrollToBottom();
        scrolled = true;
      }
    });
  }

  ngAfterViewInit() {
    this.codeService.initCodeEditorComponent(this._editor, this.variablesAutoCompleter);
    this._editor.on('change', () => {
      if (this._silent) {
        return;
      }
      this._value = this.value;
      this._onTouched.emit();
      this._onChange.emit(this._value);
      this.contentChange.emit(this._value);
    });
    if (this.tabsSize) {
      this._editor.getSession().setTabSize(this.tabsSize);
    }
    _.forEach(this.keyBindings, (binding: KeyBinding) => {
      _.forEach(binding.keys, (key) => {
        this._editor.commands.addCommand({
          name: key,
          bindKey: key,
          exec: (editor: Editor, args?: any): void => {
            binding.binding(null);
          },
        });
      });
    });
  }

  ngOnDestroy() {
    _.invokeMap(this.subscriptions, 'unsubscribe');
  }

  registerOnChange(fn: any): void {
    this.subscriptions.push(this._onChange.subscribe(fn));
  }

  registerOnTouched(fn: any): void {
    this.subscriptions.push(this._onTouched.subscribe(fn));
  }

  writeValue(obj: any): void {
    // -1 prevents the _editor from selecting the whole value
    this._editor.setValue(obj, -1);
  }

  setDisabledState(isDisabled: boolean): void {
    this._editor.setReadOnly(isDisabled);
  }

  scrollToBottom(): void {
    const editor = this._editor;
    editor.scrollToRow(editor.session.getLength());
  }

  resize() {
    this._editor.resize(true);
  }

  appendText(text: string) {
    this._value += text;
    const editor = this._editor;
    if (editor) {
      const scrollToBottom = editor.session.getLength() - editor.renderer.getLastVisibleRow() <= 2;

      editor.session.insert(
        {
          row: editor.session.getLength(),
          column: 0,
        },
        text,
      );

      if (scrollToBottom) {
        this.scrollToBottom();
      }
      const left = editor.session.getScrollLeft();
      editor.session.setScrollLeft(Number.MAX_VALUE);
      editor.session.setScrollLeft(left);

      this.changeDetector.detectChanges();
    }
  }

  @Input() set value(value: string) {
    this._silent = true;
    if (this._editor && value !== this._value) {
      this._editor.getSession().setValue(value);
    }
    this._value = value;
    this._silent = false;
  }

  get value(): string {
    return this._editor.getSession().getValue();
  }

  @Input() set mode(mode: CodeMode) {
    this._mode = mode;
    if (this._editor) {
      this._editor.getSession().setMode(this.sessionMode);
    }
  }

  get sessionMode(): string {
    return `ace/mode/${this._mode}`;
  }
}
