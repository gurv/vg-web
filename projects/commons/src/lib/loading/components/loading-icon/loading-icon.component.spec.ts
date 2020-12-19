import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { LoadingIconComponent } from './loading-icon.component';
import { LoadingIconModule } from './loading-icon.module';

@Component({
  selector: 'lib-test',
  template: `
    <lib-loading-icon [loading]="false">
      <span>Not Loading!</span>
    </lib-loading-icon>
  `,
})
class TestComponent {}

describe('LoadingIconComponent', () => {
  let component: LoadingIconComponent;
  let fixture: ComponentFixture<LoadingIconComponent>;
  let notLoadingComponent: TestComponent;
  let notLoadingFixture: ComponentFixture<TestComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [LoadingIconModule],
        declarations: [TestComponent],
      }).compileComponents();
    }),
  );

  it('should not be loading', () => {
    notLoadingFixture = TestBed.createComponent(TestComponent);
    notLoadingComponent = notLoadingFixture.componentInstance;
    notLoadingFixture.detectChanges();

    expect(notLoadingFixture.debugElement.query(By.css('span')).nativeElement.innerHTML).toBe(
      'Not Loading!',
    );
  });

  it('should be loading', () => {
    fixture = TestBed.createComponent(LoadingIconComponent);
    component = fixture.componentInstance;
    component.loading = true;
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.loading-spinner')).nativeElement).toBeDefined();
  });
});
