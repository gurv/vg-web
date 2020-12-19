import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from 'projects/commons/src/lib/icon/components/icon/icon.module';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { ToggleButtonComponent } from './toggle-button.component';

@NgModule({
  imports: [CommonModule, VendorsModule, IconModule],
  declarations: [ToggleButtonComponent],
  exports: [ToggleButtonComponent],
})
export class ToggleButtonModule {}
