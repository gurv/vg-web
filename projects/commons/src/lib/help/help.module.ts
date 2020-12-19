import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { HelpAnchorModule } from './components/help-anchor/help-anchor.module';
import { HelpPanelModule } from './components/help-panel/help-panel.module';
import { InlineHelpModule } from './components/inline-help/inline-help.module';
import { HighlightModule } from './directives/highlight/highlight.module';
import { OpenHelpModule } from './directives/open-help/open-help.module';
import { OpenHelpExtModule } from './directives/open-help-ext/open-help-ext.module';
import { HelpService } from './services//help/help.service';

@NgModule({
  imports: [
    CommonModule,
    VendorsModule,
    HelpAnchorModule,
    HelpPanelModule,
    InlineHelpModule,
    HighlightModule,
    OpenHelpModule,
    OpenHelpExtModule,
  ],
  exports: [
    HighlightModule,
    HelpAnchorModule,
    HelpPanelModule,
    InlineHelpModule,
    OpenHelpModule,
    OpenHelpExtModule,
  ],
})
export class HelpModule {
  constructor(public helpService: HelpService) {}
}
