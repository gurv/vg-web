import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { IconComponent } from '../icon/icon.component';
import { IconDynamicComponent } from './icon-dynamic.component';

@NgModule({
  imports: [CommonModule, VendorsModule],
  declarations: [IconComponent, IconDynamicComponent],
  exports: [IconDynamicComponent],
})
export class IconDynamicModule {}
