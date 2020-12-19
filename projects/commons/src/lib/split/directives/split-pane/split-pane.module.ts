import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplitPaneDirective } from './split-pane.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [SplitPaneDirective],
  exports: [SplitPaneDirective],
})
export class SplitPaneModule {}
