import { Injectable } from '@angular/core';
import { Ace, config } from 'ace-builds';
import { VariablesAutoCompleter } from '../../entities/variables-auto-completer';

config.set('basePath', 'assets/ace');
config.loadModule('ace/ext/language_tools', () => {});

@Injectable()
export class CodeService {
  initCodeEditorComponent(editor: Ace.Editor, autoCompleter?: VariablesAutoCompleter) {
    editor.resize(true);
    if (autoCompleter) {
      (editor as any).completers.push({
        getCompletions: autoCompleter.autoCompleteVariableNames.bind(autoCompleter),
      });
    }
  }
}
