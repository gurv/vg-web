import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NotConnectedToGitComponent } from './not-connected-to-git.component';
import { NotConnectedToGitModule } from './not-connected-to-git.module';

describe('NotConnectedToGitComponent', () => {
  let component: NotConnectedToGitComponent;
  let fixture: ComponentFixture<NotConnectedToGitComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NotConnectedToGitModule],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(NotConnectedToGitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
