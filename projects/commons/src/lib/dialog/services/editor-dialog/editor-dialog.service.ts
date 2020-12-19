import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogSize } from 'projects/commons/src/lib/dialog/entities/dialog-size';
import { InspectDialogComponent } from 'projects/commons/src/lib/dialog/pages/inspect-dialog/inspect-dialog.component';
import { LogsDialogComponent } from 'projects/commons/src/lib/dialog/pages/logs-dialog/logs-dialog.component';
import { HelpPageId } from 'projects/commons/src/lib/help/entities/help-page-id';
import { DialogService } from '../dialog.service';

@Injectable({
  providedIn: 'root',
})
export class EditorDialogService extends DialogService {
  constructor(dialog: MatDialog) {
    super(dialog);
  }

  public inspect(
    name: string,
    object: string,
    helpPageId?: HelpPageId,
  ): MatDialogRef<InspectDialogComponent, void> {
    return this.dialog.open(InspectDialogComponent, {
      panelClass: DialogSize.SIZE_LG,
      data: {
        object,
        name,
        helpPageId,
      },
    });
  }

  public logs(title: string, logs: string): MatDialogRef<LogsDialogComponent, void> {
    return this.dialog.open(LogsDialogComponent, {
      panelClass: DialogSize.SIZE_FULL,
      data: {
        title,
        logs,
      },
    });
  }
}
