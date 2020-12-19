import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HelpPageId } from 'projects/commons/src/lib/help/entities/help-page-id';

export interface DeleteDialogData {
  name: string;
  items: string[];
  helpPageId?: HelpPageId;
}

@Component({
  selector: 'lib-delete-dialog',
  templateUrl: './delete-dialog.component.html',
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteDialogData,
  ) {}
}
