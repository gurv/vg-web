import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WaitDialogProgress } from 'projects/commons/src/lib/dialog/wait-dialog-progress';
import { WaitDialogComponent } from './wait-dialog.component';
import { WaitDialogModule } from './wait-dialog.module';

describe('WaitDialogComponent', () => {
  let component: WaitDialogComponent;
  let fixture: ComponentFixture<WaitDialogComponent>;
  let progress: WaitDialogProgress;

  beforeEach(
    waitForAsync(() => {
      progress = {
        title: 'title',
        progress: 50,
      };
      TestBed.configureTestingModule({
        imports: [WaitDialogModule],
        providers: [{ provide: MAT_DIALOG_DATA, useValue: progress }],
      })
        .overrideTemplate(WaitDialogComponent, '')
        .compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get progress', () => {
    expect(component.progress).toEqual(progress);
  });

  it('should set progress', () => {
    const progressBis: WaitDialogProgress = {
      title: 't2',
      progress: 42,
    };
    component.progress = progressBis;

    expect(component.progress).toEqual(progressBis);
  });
});
