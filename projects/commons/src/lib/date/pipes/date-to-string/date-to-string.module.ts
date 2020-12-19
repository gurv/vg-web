import { NgModule } from '@angular/core';
import { DateToStringPipe } from './date-to-string.pipe';

@NgModule({
  declarations: [DateToStringPipe],
  exports: [DateToStringPipe],
})
export class DateToStringModule {}
