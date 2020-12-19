import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { gitCommandServiceSpy } from 'projects/commons/src/lib/git/services/git-command/git-command.service.spec';
import { GitProjectService } from 'projects/commons/src/lib/git/services/git-project/git-project.service';
import { ProjectMenuComponent } from './project-menu.component';
import { ProjectMenuModule } from './project-menu.module';
import SpyObj = jasmine.SpyObj;

describe('ProjectMenuComponent', () => {
  let component: ProjectMenuComponent;
  let fixture: ComponentFixture<ProjectMenuComponent>;
  let gitProjectService: SpyObj<GitProjectService>;

  beforeEach(
    waitForAsync(() => {
      gitProjectService = gitCommandServiceSpy();
      TestBed.configureTestingModule({
        imports: [ProjectMenuModule],
        providers: [{ provide: GitProjectService, useValue: gitProjectService }],
      })
        .overrideTemplate(ProjectMenuComponent, '')
        .compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
