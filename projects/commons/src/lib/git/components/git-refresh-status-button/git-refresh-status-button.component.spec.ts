import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { testGitStatus } from 'projects/commons/src/lib/git/entities/git-status.spec';
import { GitCommandService } from 'projects/commons/src/lib/git/services/git-command/git-command.service';
import { gitCommandServiceSpy } from 'projects/commons/src/lib/git/services/git-command/git-command.service.spec';
import { of } from 'rxjs';
import { GitRefreshStatusButtonComponent } from './git-refresh-status-button.component';

import SpyObj = jasmine.SpyObj;

describe('GitRefreshStatusButtonComponent', () => {
  let component: GitRefreshStatusButtonComponent;
  let fixture: ComponentFixture<GitRefreshStatusButtonComponent>;
  let gitCommand: SpyObj<GitCommandService>;

  beforeEach(
    waitForAsync(() => {
      gitCommand = gitCommandServiceSpy();
      TestBed.configureTestingModule({
        declarations: [GitRefreshStatusButtonComponent],
        providers: [{ provide: GitCommandService, useValue: gitCommand }],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(GitRefreshStatusButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should refresh', () => {
    gitCommand.status.and.returnValue(of(testGitStatus()));
    component.refresh();

    // eslint-disable-next-line jasmine/prefer-toHaveBeenCalledWith
    expect(gitCommand.status).toHaveBeenCalled();
  });
});
