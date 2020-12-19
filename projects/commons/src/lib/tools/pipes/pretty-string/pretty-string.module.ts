import { NgModule } from '@angular/core';
import { PrettyStringPipe } from './pretty-string.pipe';

@NgModule({
  declarations: [PrettyStringPipe],
  exports: [PrettyStringPipe],
})
export class PrettyStringModule {}
