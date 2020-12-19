import { NgModule } from '@angular/core';
import { ColorToBackgroundClassPipe } from './color-to-background-class.pipe';

@NgModule({
  declarations: [ColorToBackgroundClassPipe],
  exports: [ColorToBackgroundClassPipe],
})
export class ColorToBackgroundClassModule {}
