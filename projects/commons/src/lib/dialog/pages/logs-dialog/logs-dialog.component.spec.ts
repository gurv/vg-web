import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LogsDialogComponent } from './logs-dialog.component';
import { LogsDialogModule } from './logs-dialog.module';
import { dialogRefSpy } from 'projects/commons/src/lib/mock/material.mock.spec';

describe('LogsDialogComponent', () => {
  let component: LogsDialogComponent;
  let fixture: ComponentFixture<LogsDialogComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [LogsDialogModule],
        providers: [
          { provide: MAT_DIALOG_DATA, useValue: { title: 'name', logs: 'logs' } },
          { provide: MatDialogRef, useValue: dialogRefSpy() },
        ],
      })
        .overrideTemplate(LogsDialogComponent, '')
        .compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LogsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
