import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ColorToTextClassModule } from 'projects/commons/src/lib/color/pipes/color-to-text-class/color-to-text-class.module';
import { IconFaAddonComponent } from './icon-fa-addon.component';

@NgModule({
  imports: [CommonModule, VendorsModule, FontAwesomeModule, ColorToTextClassModule],
  declarations: [IconFaAddonComponent],
  exports: [IconFaAddonComponent],
})
export class IconFaAddonModule {}
