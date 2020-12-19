import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { GitRenamedCopiedStatusTableComponent } from './git-renamed-copied-status-table.component';
import { GitRenamedCopiedStatusTableModule } from './git-renamed-copied-status-table.module';
import { testRenamedCopiedStatus } from 'projects/commons/src/lib/git/entities/git-renamed-copied-status.spec';

describe('GitRenamedCopiedStatusTableComponent', () => {
  let component: GitRenamedCopiedStatusTableComponent;
  let fixture: ComponentFixture<GitRenamedCopiedStatusTableComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NoopAnimationsModule, GitRenamedCopiedStatusTableModule],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(GitRenamedCopiedStatusTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set status', () => {
    component.renamedCopiedStatuses = [testRenamedCopiedStatus(), testRenamedCopiedStatus()];

    expect(component.dataSource.data.length).toBe(2);
  });
});
