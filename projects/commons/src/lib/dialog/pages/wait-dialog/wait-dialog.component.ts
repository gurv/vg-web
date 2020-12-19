import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WaitDialogProgress } from 'projects/commons/src/lib/dialog/wait-dialog-progress';

@Component({
  selector: 'lib-wait-dialog',
  templateUrl: './wait-dialog.component.html',
})
export class WaitDialogComponent {
  private _progress: WaitDialogProgress;

  constructor(@Inject(MAT_DIALOG_DATA) progress: WaitDialogProgress) {
    this.progress = progress;
  }

  set progress(progress: WaitDialogProgress) {
    this._progress = progress;
  }

  get progress(): WaitDialogProgress {
    return this._progress;
  }
}
