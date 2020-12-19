import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { ConfirmDialogModule } from './pages/confirm-dialog/confirm-dialog.module';
import { DeleteDialogModule } from './pages/delete-dialog/delete-dialog.module';
import { InspectDialogModule } from './pages/inspect-dialog/inspect-dialog.module';
import { LogsDialogModule } from './pages/logs-dialog/logs-dialog.module';
import { WaitDialogModule } from './pages/wait-dialog/wait-dialog.module';
import { DefaultDialogService } from './services/default-dialog/default-dialog.service';
import { EditorDialogService } from './services/editor-dialog/editor-dialog.service';
import { InjectDialogService } from './services/inject-dialog/inject-dialog.service';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    VendorsModule,
    ConfirmDialogModule,
    DeleteDialogModule,
    InspectDialogModule,
    LogsDialogModule,
    WaitDialogModule,
  ],
  exports: [
    ConfirmDialogModule,
    DeleteDialogModule,
    InspectDialogModule,
    LogsDialogModule,
    WaitDialogModule,
  ],
  providers: [DefaultDialogService, EditorDialogService, InjectDialogService],
})
export class DialogModule {}
