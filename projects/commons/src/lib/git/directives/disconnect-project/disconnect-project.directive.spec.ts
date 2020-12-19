import { DefaultDialogService } from 'projects/commons/src/lib/dialog/services/default-dialog/default-dialog.service';
import { defaultDialogServiceSpy } from 'projects/commons/src/lib/dialog/services/default-dialog/default-dialog.service.spec';
import { GitProjectService } from 'projects/commons/src/lib/git/services/git-project/git-project.service';
import { gitProjectServiceSpy } from 'projects/commons/src/lib/git/services/git-project/git-project.service.spec';
import { of } from 'rxjs';
import { DisconnectProjectDirective } from './disconnect-project.directive';
import SpyObj = jasmine.SpyObj;

describe('DisconnectProjectDirective', () => {
  let directive: DisconnectProjectDirective;
  let gitProject: SpyObj<GitProjectService>;
  let dialogs: SpyObj<DefaultDialogService>;

  beforeEach(() => {
    gitProject = gitProjectServiceSpy();
    dialogs = defaultDialogServiceSpy();
    directive = new DisconnectProjectDirective(gitProject, dialogs);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should open dialog', () => {
    dialogs.confirm.and.returnValue(of(null));
    dialogs.waitFor.and.returnValue(of('ok'));
    gitProject.disconnect.and.returnValue(of(null));
    directive.onClick({ ctrlKey: true });

    // eslint-disable-next-line jasmine/prefer-toHaveBeenCalledWith
    expect(dialogs.confirm).toHaveBeenCalled();
    // eslint-disable-next-line jasmine/prefer-toHaveBeenCalledWith
    expect(dialogs.waitFor).toHaveBeenCalled();
    // eslint-disable-next-line jasmine/prefer-toHaveBeenCalledWith
    expect(gitProject.disconnect).toHaveBeenCalled();
  });
});
