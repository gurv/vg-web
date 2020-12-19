import { NgModule } from '@angular/core';
import { ColorToTextClassPipe } from './color-to-text-class.pipe';

@NgModule({
  declarations: [ColorToTextClassPipe],
  exports: [ColorToTextClassPipe],
})
export class ColorToTextClassModule {}
