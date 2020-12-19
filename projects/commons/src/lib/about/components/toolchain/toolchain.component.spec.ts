import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ToolchainComponent } from './toolchain.component';
import { ToolchainModule } from './toolchain.module';

describe('ToolchainComponent', () => {
  let component: ToolchainComponent;
  let fixture: ComponentFixture<ToolchainComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ToolchainModule],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolchainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
