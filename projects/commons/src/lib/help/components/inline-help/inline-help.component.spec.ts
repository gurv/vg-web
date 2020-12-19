import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CoreTestModule } from 'projects/commons/src/lib/core/core.module.spec';
import { InlineHelpComponent } from './inline-help.component';
import { InlineHelpModule } from './inline-help.module';

describe('InlineHelpComponent', () => {
  let component: InlineHelpComponent;
  let fixture: ComponentFixture<InlineHelpComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [CoreTestModule, InlineHelpModule],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
