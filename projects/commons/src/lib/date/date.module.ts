import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DateTimeFromNowModule } from './pipes/date-time-from-now/date-time-from-now.module';
import { DateTimeToStringModule } from './pipes/date-time-to-string/date-time-to-string.module';
import { DateTimeToStringMsModule } from './pipes/date-time-to-string-ms/date-time-to-string-ms.module';
import { DateToStringModule } from './pipes/date-to-string/date-to-string.module';
import { DurationToStringModule } from './pipes/duration-to-string/duration-to-string.module';
import { TimeToStringMsModule } from './pipes/time-to-string-ms/time-to-string-ms.module';
// import { DateToStringPipe } from 'projects/commons/src/lib/date/date-to-string.pipe';
// import { DurationToStringPipe } from 'projects/commons/src/lib/date/duration-to-string.pipe';
// import { TimeToStringMsPipe } from 'projects/commons/src/lib/date/time-to-string-ms.pipe';
// import { DateTimeFromNowPipe } from './date-time-from-now.pipe';
// import { DateTimeToStringMsPipe } from './date-time-to-string-ms.pipe';
// import { DateTimeToStringPipe } from './date-time-to-string.pipe';

@NgModule({
  imports: [
    CommonModule,
    DateTimeFromNowModule,
    DateTimeToStringModule,
    DateTimeToStringMsModule,
    DateToStringModule,
    DurationToStringModule,
    TimeToStringMsModule,
  ],
  // providers: [
  //   DateTimeToStringPipe,
  //   DateTimeToStringMsPipe,
  //   DateTimeFromNowPipe,
  //   DurationToStringPipe,
  //   TimeToStringMsPipe,
  //   DateToStringPipe,
  // ],
  exports: [
    // DateTimeToStringPipe,
    // DateTimeToStringMsPipe,
    // DateTimeFromNowPipe,
    // DurationToStringPipe,
    // TimeToStringMsPipe,
    // DateToStringPipe,
    DateTimeFromNowModule,
    DateTimeToStringModule,
    DateTimeToStringMsModule,
    DateToStringModule,
    DurationToStringModule,
    TimeToStringMsModule,
  ],
})
export class DateModule {}
