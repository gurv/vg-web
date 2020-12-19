import { DialogSize } from 'projects/commons/src/lib/dialog/entities/dialog-size';
import { DefaultDialogService } from 'projects/commons/src/lib/dialog/services/default-dialog/default-dialog.service';
import { defaultDialogServiceSpy } from 'projects/commons/src/lib/dialog/services/default-dialog/default-dialog.service.spec';
import { ConnectProjectDialogComponent } from 'projects/commons/src/lib/git/components/connect-project-dialog/connect-project-dialog.component';
import { testGitConfiguration } from 'projects/commons/src/lib/git/entities/git-configuration.spec';
import { GitProjectService } from 'projects/commons/src/lib/git/services/git-project/git-project.service';
import { gitProjectServiceSpy } from 'projects/commons/src/lib/git/services/git-project/git-project.service.spec';
import { of } from 'rxjs';
import { ConnectProjectDirective } from './connect-project.directive';
import SpyObj = jasmine.SpyObj;

describe('ConnectProjectDirective', () => {
  let directive: ConnectProjectDirective;
  let gitProject: SpyObj<GitProjectService>;
  let dialogs: SpyObj<DefaultDialogService>;

  beforeEach(() => {
    gitProject = gitProjectServiceSpy();
    dialogs = defaultDialogServiceSpy();
    directive = new ConnectProjectDirective(gitProject, dialogs);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should open dialog', () => {
    const repositoryUrl = 'repositoryUrl';
    dialogs.open.and.returnValue(of(repositoryUrl));
    dialogs.waitFor.and.returnValue(of('ok'));
    gitProject.connect.and.returnValue(of(testGitConfiguration()));
    directive.onClick();

    expect(dialogs.open).toHaveBeenCalledWith(ConnectProjectDialogComponent, DialogSize.SIZE_MD);
    // eslint-disable-next-line jasmine/prefer-toHaveBeenCalledWith
    expect(dialogs.waitFor).toHaveBeenCalled();
    expect(gitProject.connect).toHaveBeenCalledWith(repositoryUrl);
  });
});
