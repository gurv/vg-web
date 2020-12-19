import { Directive, HostListener } from '@angular/core';
import { DialogSize } from 'projects/commons/src/lib/dialog/entities/dialog-size';
import { DefaultDialogService } from 'projects/commons/src/lib/dialog/services/default-dialog/default-dialog.service';
import { ConnectProjectDialogComponent } from 'projects/commons/src/lib/git/components/connect-project-dialog/connect-project-dialog.component';
import { GitProjectService } from 'projects/commons/src/lib/git/services/git-project/git-project.service';
import { mergeMap } from 'rxjs/operators';

@Directive({
  selector: '[libConnectProject]',
})
export class ConnectProjectDirective {
  constructor(private gitProject: GitProjectService, private dialogs: DefaultDialogService) { }

  @HostListener('click', ['$event']) onClick() {
    this.dialogs
      .open(ConnectProjectDialogComponent, DialogSize.SIZE_MD)
      .pipe(
        mergeMap((repositoryUrl: string) =>
          this.dialogs.waitFor(this.gitProject.connect(repositoryUrl)),
        ),
      )
      .subscribe();
  }
}
