import { NgModule } from '@angular/core';
import { DateTimeFromNowPipe } from './date-time-from-now.pipe';

@NgModule({
  declarations: [DateTimeFromNowPipe],
  exports: [DateTimeFromNowPipe],
})
export class DateTimeFromNowModule {}
