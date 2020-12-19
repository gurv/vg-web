import { Directive, HostListener } from '@angular/core';
import { DefaultDialogService } from 'projects/commons/src/lib/dialog/services/default-dialog/default-dialog.service';
import { GitProjectService } from 'projects/commons/src/lib/git/services/git-project/git-project.service';
import { mergeMap } from 'rxjs/operators';

@Directive({
  selector: '[libDisconnectProject]',
})
export class DisconnectProjectDirective {
  constructor(
    private gitProjectService: GitProjectService,
    private dialogs: DefaultDialogService,
  ) { }

  @HostListener('click', ['$event']) onClick($event) {
    this.dialogs
      .confirm(
        'Disconnect fom Git',
        'Are you sure you want to disconnect the current project from Git?',
        $event.ctrlKey,
      )
      .pipe(mergeMap(() => this.dialogs.waitFor(this.gitProjectService.disconnect())))
      .subscribe();
  }
}
