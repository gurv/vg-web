import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { ContextualMenuComponent } from './contextual-menu.component';

@NgModule({
  imports: [CommonModule, VendorsModule],
  declarations: [ContextualMenuComponent],
  exports: [ContextualMenuComponent],
})
export class ContextualMenuModule {}
