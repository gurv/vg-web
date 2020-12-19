import { Component } from '@angular/core';
import { GitCommandService } from 'projects/commons/src/lib/git/services/git-command/git-command.service';
import { REFRESH_ICON } from 'projects/commons/src/lib/icon/entities/icons';

@Component({
  selector: 'lib-git-refresh-status-button',
  templateUrl: './git-refresh-status-button.component.html',
})
export class GitRefreshStatusButtonComponent {
  readonly refreshIcon = REFRESH_ICON;
  public loading = false;

  constructor(private gitCommand: GitCommandService) { }

  refresh() {
    this.loading = true;
    this.gitCommand.status().subscribe((value) => (this.loading = false));
  }
}
