import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { testGitStatus } from 'projects/commons/src/lib/git/entities/git-status.spec';
import { GitCommandService } from 'projects/commons/src/lib/git/services/git-command/git-command.service';
import { gitCommandServiceSpy } from 'projects/commons/src/lib/git/services/git-command/git-command.service.spec';
import { GitProjectService } from 'projects/commons/src/lib/git/services/git-project/git-project.service';
import { gitProjectServiceSpy } from 'projects/commons/src/lib/git/services/git-project/git-project.service.spec';
import { GitStatusComponent } from './git-status.component';
import { GitStatusModule } from './git-status.module';
import SpyObj = jasmine.SpyObj;

describe('GitStatusComponent', () => {
  let component: GitStatusComponent;
  let fixture: ComponentFixture<GitStatusComponent>;
  let gitProject: SpyObj<GitProjectService>;
  let gitCommand: SpyObj<GitCommandService>;

  beforeEach(
    waitForAsync(() => {
      gitProject = gitProjectServiceSpy();
      gitCommand = gitCommandServiceSpy();
      TestBed.configureTestingModule({
        imports: [GitStatusModule],
        providers: [
          { provide: GitProjectService, useValue: gitProject },
          { provide: GitCommandService, useValue: gitCommand },
        ],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(GitStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set status', () => {
    gitCommand.statusSubject.next(testGitStatus());

    expect(component.status).toBeDefined();
  });
});
