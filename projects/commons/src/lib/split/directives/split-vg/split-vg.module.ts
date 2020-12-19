import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SplitVgDirective } from './split-vg.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [SplitVgDirective],
  exports: [SplitVgDirective],
})
export class SplitVgModule {}
