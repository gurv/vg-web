import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { IconComponent } from './icon.component';
import { IconDynamicComponent } from '../icon-dynamic/icon-dynamic.component';
import { IconFaModule } from '../icon-fa/icon-fa.module';
import { IconFaAddonModule } from '../icon-fa-addon/icon-fa-addon.module';
import { IconFaCounterModule } from '../icon-fa-counter/icon-fa-counter.module';

@NgModule({
  imports: [CommonModule, VendorsModule, IconFaModule, IconFaAddonModule, IconFaCounterModule],
  declarations: [IconDynamicComponent, IconComponent],
  exports: [IconComponent],
})
export class IconModule {}
