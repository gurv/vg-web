import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LazyIfDirective } from './lazy-if.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [LazyIfDirective],
  exports: [LazyIfDirective],
})
export class LazyModule {}
