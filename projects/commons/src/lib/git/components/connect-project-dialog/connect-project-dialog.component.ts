import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RepositoryUrlInputComponent } from '../repository-url-input/repository-url-input.component';
import { HELP_ICON } from 'projects/commons/src/lib/icon/entities/icons';

@Component({
  selector: 'lib-connect-project-modal',
  templateUrl: './connect-project-dialog.component.html',
})
export class ConnectProjectDialogComponent {
  @ViewChild(RepositoryUrlInputComponent, { static: true })
  repositoryUrl: RepositoryUrlInputComponent;
  readonly helpIcon = HELP_ICON;
  connectForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ConnectProjectDialogComponent>,
    private fb: FormBuilder,
  ) {
    this.connectForm = this.fb.group({});
  }

  public connect(): void {
    this.dialogRef.close(this.repositoryUrl.repositoryUrl.value);
  }
}
