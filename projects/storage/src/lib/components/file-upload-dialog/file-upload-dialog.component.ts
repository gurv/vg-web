import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadService } from 'projects/storage/src/lib/services/file-upload/file-upload.service';
import { IconFa } from 'projects/commons/src/lib/icon/entities/icon-fa';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { forkJoin, Observable } from 'rxjs';
import * as _ from 'lodash';

library.add(faFileUpload);

export interface FileUploadDialogData {
  endpoint: string;
  multiple: boolean;
  accept: string;
  title: string;
}

@Component({
  selector: 'lib-file-upload-dialog',
  templateUrl: './file-upload-dialog.component.html',
  providers: [FileUploadService]
})
export class FileUploadDialogComponent {
  @ViewChild('file', { static: true }) _fileInput: ElementRef;

  readonly uploadIcon = new IconFa(faFileUpload);

  public files: File[] = [];
  public uploading = false;
  public progress: Observable<number>[];

  constructor(
    private dialogRef: MatDialogRef<FileUploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FileUploadDialogData,
    private uploadService: FileUploadService,
  ) {}

  onFilesAdded() {
    const files = this._fileInput.nativeElement.files;
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < files.length; i++) {
      this.files.push(files[i]);
    }
    this.uploading = true;
    this.dialogRef.disableClose = true;
    this.progress = this.uploadService.upload(this.files, this.data.endpoint);
    forkJoin(this.progress).subscribe(() => {
      this.dialogRef.close(_.map(files, 'name'));
    });
  }

  addFiles() {
    this._fileInput.nativeElement.click();
  }
}
