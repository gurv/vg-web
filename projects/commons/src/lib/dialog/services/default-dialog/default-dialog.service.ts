import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogSize } from 'projects/commons/src/lib/dialog/entities/dialog-size';
import { ConfirmDialogComponent } from 'projects/commons/src/lib/dialog/pages/confirm-dialog/confirm-dialog.component';
import { DeleteDialogComponent } from 'projects/commons/src/lib/dialog/pages/delete-dialog/delete-dialog.component';
import { WaitDialogComponent } from 'projects/commons/src/lib/dialog/pages/wait-dialog/wait-dialog.component';
import { WaitDialogProgress } from 'projects/commons/src/lib/dialog/wait-dialog-progress';
import { HelpPageId } from 'projects/commons/src/lib/help/entities/help-page-id';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DialogService } from '../dialog.service';

@Injectable({
  providedIn: 'root',
})
export class DefaultDialogService extends DialogService {
  constructor(dialog: MatDialog) {
    super(dialog);
  }

  public delete(
    name: string,
    items: string[],
    force = false,
    helpPageId?: HelpPageId,
  ): Observable<void> {
    if (force) {
      return of(null);
    }
    return this.open(DeleteDialogComponent, DialogSize.SIZE_MD, {
      name,
      items,
      helpPageId,
    });
  }

  public confirm(title: string, message: string, force = false): Observable<void> {
    if (force) {
      return of(null);
    }
    return this.open(ConfirmDialogComponent, DialogSize.SIZE_MD, {
      title,
      message,
    });
  }

  public wait(progress: WaitDialogProgress): MatDialogRef<WaitDialogComponent, void> {
    return this.dialog.open(WaitDialogComponent, {
      panelClass: DialogSize.SIZE_MD,
      data: progress,
      disableClose: true,
    });
  }

  public waitFor<T>(operation: Observable<T>, title = 'Please wait...'): Observable<T> {
    const dialogRef = this.wait({ title, progress: -1 });
    return operation.pipe(tap((x) => dialogRef.close()));
  }
}
