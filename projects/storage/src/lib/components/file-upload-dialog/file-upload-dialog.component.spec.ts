import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadDialogComponent } from './file-upload-dialog.component';
import { FileUploadDialogModule } from './file-upload-dialog.module';
import { dialogRefSpy } from 'projects/commons/src/lib/mock/material.mock.spec';
import { FileUploadService } from 'projects/storage/src/lib/services/file-upload/file-upload.service';
import { fileUploadServiceSpy } from 'projects/storage/src/lib/services/file-upload/file-upload.service.spec';

describe('FileUploadDialogComponent', () => {
  let component: FileUploadDialogComponent;
  let fixture: ComponentFixture<FileUploadDialogComponent>;
  let uploadService: FileUploadService;
  let dialogRef: MatDialogRef<FileUploadDialogComponent>;
  let fileInput;

  beforeEach(
    waitForAsync(() => {
      uploadService = fileUploadServiceSpy();
      dialogRef = dialogRefSpy();
      fileInput = {
        nativeElement: {
          files: {
            0: { name: 'file-0' },
            1: { name: 'file-1' },
            length: 2,
            item: 'somehing',
          },
          click: jasmine.createSpy('click'),
        },
      };

      TestBed.configureTestingModule({
        imports: [FileUploadDialogModule],
        providers: [
          { provide: MAT_DIALOG_DATA, useValue: { endpoint: 'endpoint' } },
          { provide: MatDialogRef, useValue: dialogRef },
          { provide: FileUploadService, useValue: uploadService },
        ],
      })
        .overrideProvider(FileUploadService, { useValue: uploadService })
        .overrideTemplate(FileUploadDialogComponent, '')
        .compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadDialogComponent);
    component = fixture.componentInstance;
    component._fileInput = fileInput;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should addFiles click on hidden files input', () => {
    component.addFiles();

    // eslint-disable-next-line jasmine/prefer-toHaveBeenCalledWith
    expect(fileInput.nativeElement.click).toHaveBeenCalled();
  });

  it('should upload on files added', () => {
    component.onFilesAdded();

    expect(uploadService.upload).toHaveBeenCalledWith(
      [fileInput.nativeElement.files[0], fileInput.nativeElement.files[1]],
      'endpoint',
    );

    // eslint-disable-next-line jasmine/prefer-toHaveBeenCalledWith
    expect(dialogRef.close).toHaveBeenCalled();
  });
});
