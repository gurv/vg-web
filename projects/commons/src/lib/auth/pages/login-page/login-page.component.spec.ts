import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoginPageComponent } from './login-page.component';
import { LoginPageModule } from './login-page.module';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [LoginPageModule],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TODO: NullInjectorError: No provider for FormBuilder!
  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
