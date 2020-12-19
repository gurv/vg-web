import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as showdown from 'showdown';

@Pipe({
  name: 'markdownToHtml',
})
export class MarkdownToHtmlPipe implements PipeTransform {
  private converter = new showdown.Converter();

  constructor(private sanitizer: DomSanitizer) {}

  transform(markdown: any, args?: any): any {
    return this.sanitizer.bypassSecurityTrustHtml(this.converter.makeHtml(markdown));
  }
}
