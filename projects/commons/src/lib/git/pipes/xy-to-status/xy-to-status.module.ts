import { NgModule } from '@angular/core';
import { XyToStatusPipe } from './xy-to-status.pipe';

@NgModule({
  declarations: [XyToStatusPipe],
  exports: [XyToStatusPipe],
})
export class XyToStatusModule {}
