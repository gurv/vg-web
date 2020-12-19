import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SplitPanesModule } from './components/split-panes/split-panes.module';
import { SplitPaneModule } from './directives/split-pane/split-pane.module';
import { SplitVgModule } from './directives/split-vg/split-vg.module';

@NgModule({
  imports: [CommonModule, SplitPanesModule, SplitPaneModule, SplitVgModule],
  exports: [SplitPanesModule, SplitPaneModule, SplitVgModule],
})
export class SplitModule {}
