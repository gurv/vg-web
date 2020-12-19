import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileSizeModule } from './pipes/file-size/file-size.module';
import { MarkdownToHtmlModule } from './pipes/markdown-to-html/markdown-to-html.module';
import { PathToNameModule } from './pipes/path-to-name/path-to-name.module';
import { PathToParentPathModule } from './pipes/path-to-parent-path/path-to-parent-path.module';
import { PrettyStringModule } from './pipes/pretty-string/pretty-string.module';
// import { FileSizePipe } from './pipes/file-size/file-size.pipe';
// import { MarkdownToHtmlPipe } from './pipes/markdown-to-html/markdown-to-html.pipe';
// import { PathToNamePipe } from './pipes/path-to-name/path-to-name.pipe';
// import { PathToParentPathPipe } from './pipes/path-to-parent-path/path-to-parent-path.pipe';
// import { PrettyStringPipe } from './pipes/pretty-string/pretty-string.pipe';

@NgModule({
  imports: [
    CommonModule,
    FileSizeModule,
    MarkdownToHtmlModule,
    PathToNameModule,
    PathToParentPathModule,
    PrettyStringModule,
  ],
  exports: [
    FileSizeModule,
    MarkdownToHtmlModule,
    PathToNameModule,
    PathToParentPathModule,
    PrettyStringModule,
  ],
  // providers: [
  //   PrettyStringPipe,
  //   FileSizePipe,
  //   MarkdownToHtmlPipe,
  //   PathToNamePipe,
  //   PathToParentPathPipe,
  // ],
})
export class ToolsModule {}
