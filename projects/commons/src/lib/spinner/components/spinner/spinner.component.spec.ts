import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CoreTestModule } from 'projects/commons/src/lib/core/core.module.spec';
import { SpinnerComponent } from './spinner.component';
import { SpinnerModule } from './spinner.module';

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [CoreTestModule, SpinnerModule],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    component.color = 'success';
    component.size = 42;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
