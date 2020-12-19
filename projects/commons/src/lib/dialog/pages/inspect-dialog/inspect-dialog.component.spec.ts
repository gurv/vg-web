import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InspectDialogComponent } from './inspect-dialog.component';
import { InspectDialogModule } from './inspect-dialog.module';
import { dialogRefSpy } from 'projects/commons/src/lib/mock/material.mock.spec';

describe('InspectDialogComponent', () => {
  let component: InspectDialogComponent;
  let fixture: ComponentFixture<InspectDialogComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [InspectDialogModule],
        providers: [
          { provide: MAT_DIALOG_DATA, useValue: { name: 'name', object: {} } },
          { provide: MatDialogRef, useValue: dialogRefSpy() },
        ],
      })
        .overrideTemplate(InspectDialogComponent, '')
        .compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
