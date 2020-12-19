import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLevelDownAlt } from '@fortawesome/free-solid-svg-icons/faLevelDownAlt';
import { faUnlink } from '@fortawesome/free-solid-svg-icons/faUnlink';
import * as _ from 'lodash';
import { RestServerError } from 'projects/commons/src/lib/config/entities/rest-server-error';
import { GitCommandService } from 'projects/commons/src/lib/git/services/git-command/git-command.service';
import { GitProjectService } from 'projects/commons/src/lib/git/services/git-project/git-project.service';
import { IconDynamic } from 'projects/commons/src/lib/icon/entities/icon-dynamic';
import { IconFa } from 'projects/commons/src/lib/icon/entities/icon-fa';
import { LOADING_ICON } from 'projects/commons/src/lib/icon/entities/icons';
import { CodeEditorComponent } from 'projects/editor/src/lib/components/code-editor/code-editor.component';
import { Subscription } from 'rxjs';

library.add(faUnlink);

@Component({
  selector: 'lib-git-command',
  templateUrl: './git-command.component.html',
  styleUrls: ['./git-command.component.scss'],
})
export class GitCommandComponent implements AfterViewInit, OnDestroy {
  @ViewChild(CodeEditorComponent) codeEditor: CodeEditorComponent;

  readonly disconnectIcon = new IconFa(faUnlink, 'error');
  readonly executeIcon = new IconDynamic(new IconFa(faLevelDownAlt, 'accent', 'rotate-90'), {
    loading: LOADING_ICON,
  });

  public input = '';
  public loading = false;

  private subscriptions: Subscription[] = [];

  constructor(public gitProject: GitProjectService, private gitCommand: GitCommandService) { }

  ngAfterViewInit() {
    this.subscriptions.push(
      this.gitCommand.logsSubject.subscribe((text) => this.codeEditor.appendText(`${text}\n`)),
    );
  }

  ngOnDestroy() {
    _.invokeMap(this.subscriptions, 'unsubscribe');
  }

  public execute(): void {
    if (this.loading) {
      return;
    }
    this.loading = true;
    const command = this.input.startsWith('git ') ? this.input : `git ${this.input}`;
    this.codeEditor.appendText(`> ${command}\n`);
    this.input = '';
    this.gitCommand.execute(command).subscribe(
      () => (this.loading = false),
      (error: RestServerError) => {
        this.codeEditor.appendText(`${error.title}: ${error.message}\n${error.trace}`);
        this.loading = false;
      },
    );
  }
}
