import { NgModule } from '@angular/core';
import { DateTimeToStringPipe } from './date-time-to-string.pipe';

@NgModule({
  declarations: [DateTimeToStringPipe],
  exports: [DateTimeToStringPipe],
})
export class DateTimeToStringModule {}
