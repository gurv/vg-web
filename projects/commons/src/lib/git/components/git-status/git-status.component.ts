import { Component, OnDestroy, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { GitStatus } from 'projects/commons/src/lib/git/entities/git-status';
import { GitCommandService } from 'projects/commons/src/lib/git/services/git-command/git-command.service';
import { GitProjectService } from 'projects/commons/src/lib/git/services/git-project/git-project.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lib-git-status',
  templateUrl: './git-status.component.html',
})
export class GitStatusComponent implements OnInit, OnDestroy {
  public status: GitStatus;
  private subscriptions: Subscription[] = [];

  constructor(public gitProject: GitProjectService, private gitCommand: GitCommandService) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.gitCommand.statusSubject.subscribe((status) => (this.status = status)),
    );
  }

  ngOnDestroy() {
    _.invokeMap(this.subscriptions, 'unsubscribe');
  }
}
