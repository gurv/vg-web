import { NgModule } from '@angular/core';
import { TimeToStringMsPipe } from './time-to-string-ms.pipe';

@NgModule({
  declarations: [TimeToStringMsPipe],
  exports: [TimeToStringMsPipe],
})
export class TimeToStringMsModule {}
