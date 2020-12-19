import { Injectable } from '@angular/core';
import { require } from 'ace-builds';
import * as _ from 'lodash';
import { CodeSnippet } from '../../entities/code-snippet';
import { CodeMode } from '../../entities/code-mode';

@Injectable()
export class CodeSnippetService {
  load(snippets: CodeSnippet[], mode: CodeMode) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const snippetManager = require('ace/snippets').snippetManager;
    snippetManager.register(_.cloneDeep(snippets), mode);
  }
}
