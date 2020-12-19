import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { InspectDialogComponent } from './inspect-dialog.component';
import { HelpAnchorModule } from 'projects/commons/src/lib/help/components/help-anchor/help-anchor.module';
import { CodeEditorModule } from 'projects/editor/src/lib/components/code-editor/code-editor.module';

@NgModule({
  imports: [CommonModule, VendorsModule, HelpAnchorModule, CodeEditorModule],
  declarations: [InspectDialogComponent],
  exports: [InspectDialogComponent],
})
export class InspectDialogModule {}
