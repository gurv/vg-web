import { Directive, HostListener, Input } from '@angular/core';
import { ConfigurationService } from 'projects/commons/src/lib/config/services/configuration/configuration.service';
import { HelpPageId } from 'projects/commons/src/lib/help/entities/help-page-id';
import { HELP_PAGES } from 'projects/commons/src/lib/help/entities/help-pages';
import { HelpService } from 'projects/commons/src/lib/help/services/help/help.service';
import { WindowService } from 'projects/commons/src/lib/tools/services/window/window.service';
import { of } from 'rxjs';

@Directive({
  selector: '[libOpenHelpExt]',
})
export class OpenHelpExtDirective {
  @Input('libOpenHelpExt') page: HelpPageId;

  constructor(
    private window: WindowService,
    private configuration: ConfigurationService,
    private helpService: HelpService,
  ) { }

  @HostListener('click') open() {
    const id = this.page || this.helpService.lastPage.getValue();
    const url = this.configuration.docUrl(HELP_PAGES[id]);
    this.window.open(of(url));
  }
}
