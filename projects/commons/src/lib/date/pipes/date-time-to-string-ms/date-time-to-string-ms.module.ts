import { NgModule } from '@angular/core';
import { DateTimeToStringMsPipe } from './date-time-to-string-ms.pipe';

@NgModule({
  declarations: [DateTimeToStringMsPipe],
  exports: [DateTimeToStringMsPipe],
})
export class DateTimeToStringMsModule {}
