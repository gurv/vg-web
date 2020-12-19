import { NgModule } from '@angular/core';
import { DurationToStringPipe } from './duration-to-string.pipe';

@NgModule({
  declarations: [DurationToStringPipe],
  exports: [DurationToStringPipe],
})
export class DurationToStringModule {}
