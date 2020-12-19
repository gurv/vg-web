import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { IconModule } from 'projects/commons/src/lib/icon/components/icon/icon.module';
import { MenuNodeButtonComponent } from './menu-node-button.component';

@NgModule({
  imports: [CommonModule, VendorsModule, IconModule],
  declarations: [MenuNodeButtonComponent],
  exports: [MenuNodeButtonComponent],
})
export class MenuNodeButtonModule {}
