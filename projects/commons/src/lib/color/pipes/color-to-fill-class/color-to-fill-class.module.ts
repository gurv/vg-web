import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorToFillClassPipe } from './color-to-fill-class.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [ColorToFillClassPipe],
  exports: [ColorToFillClassPipe],
  providers: [ColorToFillClassPipe],
})
export class ColorToFillClassModule {}
