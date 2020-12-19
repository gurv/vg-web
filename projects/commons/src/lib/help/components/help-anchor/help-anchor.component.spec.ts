import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HelpAnchorComponent } from './help-anchor.component';
import { HelpAnchorModule } from './help-anchor.module';

describe('HelpAnchorComponent', () => {
  let component: HelpAnchorComponent;
  let fixture: ComponentFixture<HelpAnchorComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HelpAnchorModule],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpAnchorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
