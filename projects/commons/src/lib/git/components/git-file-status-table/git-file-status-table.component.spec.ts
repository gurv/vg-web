import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { GitFileStatusTableComponent } from './git-file-status-table.component';
import { GitFileStatusTableModule } from './git-file-status-table.module';
import { testGitFileStatus } from 'projects/commons/src/lib/git/entities/git-file-status.spec';

describe('GitFileStatusTableComponent', () => {
  let component: GitFileStatusTableComponent;
  let fixture: ComponentFixture<GitFileStatusTableComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NoopAnimationsModule, GitFileStatusTableModule],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(GitFileStatusTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set status', () => {
    component.fileStatuses = [testGitFileStatus(), testGitFileStatus()];

    expect(component.dataSource.data.length).toBe(2);
  });
});
