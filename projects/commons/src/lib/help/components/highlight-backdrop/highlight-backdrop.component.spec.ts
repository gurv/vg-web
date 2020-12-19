import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import {
  HIGHLIGHT_DURATION_DATA,
  HIGHLIGHT_RECT_DATA,
  HighlightBackdropComponent,
} from './highlight-backdrop.component';
import { HighlightBackdropModule } from './highlight-backdrop.module';
import { CoreTestModule } from 'projects/commons/src/lib/core/core.module.spec';

describe('HighlightBackdropComponent', () => {
  let component: HighlightBackdropComponent;
  let fixture: ComponentFixture<HighlightBackdropComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [CoreTestModule, HighlightBackdropModule],
        providers: [
          {
            provide: HIGHLIGHT_RECT_DATA,
            useValue: { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 },
          },
          { provide: HIGHLIGHT_DURATION_DATA, useValue: 500 },
        ],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlightBackdropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.fadeIn).toBe(true);
  });

  it('should fade out', fakeAsync(() => {
    component.ngOnInit();
    tick(351);

    expect(component.fadeIn).toBe(false);
  }));
});
