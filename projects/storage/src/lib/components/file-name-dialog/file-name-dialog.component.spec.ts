import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FileNameDialogComponent } from './file-name-dialog.component';
import { FileNameDialogModule } from './file-name-dialog.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { dialogRefSpy } from 'projects/commons/src/lib/mock/material.mock.spec';

describe('FileNameDialogComponent', () => {
  let component: FileNameDialogComponent;
  let fixture: ComponentFixture<FileNameDialogComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [FileNameDialogModule],
        providers: [
          { provide: MAT_DIALOG_DATA, useValue: { title: 'title', name: 'name' } },
          { provide: MatDialogRef, useValue: dialogRefSpy() },
        ],
      })
        .overrideTemplate(FileNameDialogComponent, '')
        .compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FileNameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.fileName.value).toBe('name');
  });
});
