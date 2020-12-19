import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeDiffModule } from './components/code-diff/code-diff.module';
import { CodeEditorModule } from './components/code-editor/code-editor.module';
import { PathToCodeEditorModeModule } from './pipes/path-to-code-editor-mode/path-to-code-editor-mode.module';

@NgModule({
  imports: [CommonModule, CodeEditorModule, CodeDiffModule, PathToCodeEditorModeModule],
  exports: [CodeEditorModule, CodeDiffModule, PathToCodeEditorModeModule],
})
export class EditorModule {}
