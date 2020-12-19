import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorToTextClassModule } from './pipes/color-to-text-class/color-to-text-class.module';
import { ColorToBackgroundClassModule } from './pipes/color-to-background-class/color-to-background-class.module';

@NgModule({
  imports: [CommonModule, ColorToTextClassModule, ColorToBackgroundClassModule],
  exports: [ColorToTextClassModule, ColorToBackgroundClassModule],
  // providers: [ColorToTextClassPipe, ColorToBackgroundClassPipe],
})
export class ColorModule {}
