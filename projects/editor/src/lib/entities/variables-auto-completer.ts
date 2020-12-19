import { Ace } from 'ace-builds';
import { CompletionCallback } from './completion-callback';

export interface VariablesAutoCompleter {
  autoCompleteVariableNames(
    editor: Ace.Editor,
    session: any,
    pos: Ace.Point,
    prefix: string,
    callback: CompletionCallback,
  );
}
