import { NgModule } from '@angular/core';
import { XyToColorPipe } from './xy-to-color.pipe';

@NgModule({
  declarations: [XyToColorPipe],
  exports: [XyToColorPipe],
})
export class XyToColorModule {}
