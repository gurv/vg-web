import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CodeDiffComponent } from './code-diff.component';
import { CodeDiffModule } from './code-diff.module';

describe('CodeDiffComponent', () => {
  let component: CodeDiffComponent;
  let fixture: ComponentFixture<CodeDiffComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [CodeDiffModule],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeDiffComponent);
    component = fixture.componentInstance;
    component.left = 'toto';
    component.right = 'tata';
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should resize fail', () => {
    fixture.detectChanges();
    spyOn(component.mergeView, 'rightOriginal').and.returnValue({} as any);
    spyOn(component.mergeView, 'editor').and.returnValue({} as any);
    component.resize();
  });
});
