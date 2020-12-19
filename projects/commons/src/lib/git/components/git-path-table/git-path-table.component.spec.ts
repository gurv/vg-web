import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { GitPathTableComponent } from './git-path-table.component';
import { GitPathTableModule } from './git-path-table.module';

describe('GitPathTableComponent', () => {
  let component: GitPathTableComponent;
  let fixture: ComponentFixture<GitPathTableComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NoopAnimationsModule, GitPathTableModule],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(GitPathTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set status', () => {
    component.paths = ['p1', 'p2'];

    expect(component.dataSource.data.length).toBe(2);
  });
});
