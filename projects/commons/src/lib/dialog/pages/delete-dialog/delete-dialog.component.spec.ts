import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeleteDialogComponent } from './delete-dialog.component';
import { DeleteDialogModule } from './delete-dialog.module';
import { dialogRefSpy } from 'projects/commons/src/lib/mock/material.mock.spec';

describe('DeleteDialogComponent', () => {
  let component: DeleteDialogComponent;
  let fixture: ComponentFixture<DeleteDialogComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [DeleteDialogModule],
        providers: [
          { provide: MAT_DIALOG_DATA, useValue: { name: 'name', items: ['item'] } },
          { provide: MatDialogRef, useValue: dialogRefSpy() },
        ],
      })
        .overrideTemplate(DeleteDialogComponent, '')
        .compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
