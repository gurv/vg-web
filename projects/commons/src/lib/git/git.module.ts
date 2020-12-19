import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GitCommandService } from 'projects/commons/src/lib/git/services/git-command/git-command.service';
import { GitFileStatusService } from 'projects/commons/src/lib/git/services/git-file-status/git-file-status.service';
import { GitWatcherService } from 'projects/commons/src/lib/git/services/git-watcher/git-watcher.service';
import { IconModule } from 'projects/commons/src/lib/icon/components/icon/icon.module';
import { EditorModule } from 'projects/editor/src/lib/editor.module';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { ConnectProjectDialogModule } from './components/connect-project-dialog/connect-project-dialog.module';
import { CurrentProjectModule } from './components/current-project/current-project.module';
import { GitCommandModule } from './components/git-command/git-command.module';
import { GitFileStatusTableModule } from './components/git-file-status-table/git-file-status-table.module';
import { GitPathTableModule } from './components/git-path-table/git-path-table.module';
import { GitRefreshStatusButtonModule } from './components/git-refresh-status-button/git-refresh-status-button.module';
import { GitRenamedCopiedStatusTableModule } from './components/git-renamed-copied-status-table/git-renamed-copied-status-table.module';
import { GitStatusTabHeaderModule } from './components/git-status-tab-header/git-status-tab-header.module';
import { GitStatusModule } from './components/git-status/git-status.module';
import { NotConnectedToGitModule } from './components/not-connected-to-git/not-connected-to-git.module';
import { ProjectMenuModule } from './components/project-menu/project-menu.module';
import { RepositoryUrlInputModule } from './components/repository-url-input/repository-url-input.module';
import { SshPublicKeyModule } from './components/ssh-public-key/ssh-public-key.module';
import { ConnectProjectModule } from './directives/connect-project/connect-project.module';
import { DisconnectProjectModule } from './directives/disconnect-project/disconnect-project.module';
import { XyToColorModule } from './pipes/xy-to-color/xy-to-color.module';
import { XyToStatusModule } from './pipes/xy-to-status/xy-to-status.module';

@NgModule({
  imports: [
    CommonModule,
    VendorsModule,
    EditorModule,
    IconModule,
    ConnectProjectDialogModule,
    CurrentProjectModule,
    GitCommandModule,
    GitFileStatusTableModule,
    GitPathTableModule,
    GitRefreshStatusButtonModule,
    GitRenamedCopiedStatusTableModule,
    GitStatusModule,
    GitStatusTabHeaderModule,
    NotConnectedToGitModule,
    ProjectMenuModule,
    RepositoryUrlInputModule,
    SshPublicKeyModule,
    ConnectProjectModule,
    DisconnectProjectModule,
    XyToColorModule,
    XyToStatusModule,
  ],
  providers: [GitWatcherService, IconModule, GitFileStatusService, GitCommandService],
  exports: [
    ConnectProjectDialogModule,
    CurrentProjectModule,
    GitCommandModule,
    GitFileStatusTableModule,
    GitPathTableModule,
    GitStatusModule,
    GitStatusTabHeaderModule,
    ProjectMenuModule,
    RepositoryUrlInputModule,
    ConnectProjectModule,
    DisconnectProjectModule,
    XyToColorModule,
  ],
})
export class GitModule { }
