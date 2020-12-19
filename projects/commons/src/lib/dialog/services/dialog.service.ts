import { TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { DialogSize } from 'projects/commons/src/lib/dialog/entities/dialog-size';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

export abstract class DialogService {
  protected constructor(protected dialog: MatDialog) {}

  public open<T, D = any, R = any>(
    componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
    size: DialogSize = DialogSize.SIZE_SM,
    data?: D,
  ): Observable<R> {
    const dialogRef = this.dialog.open(componentOrTemplateRef, {
      panelClass: size,
      data,
    });
    return dialogRef.afterClosed().pipe(filter((result: R) => result !== undefined));
  }
}
