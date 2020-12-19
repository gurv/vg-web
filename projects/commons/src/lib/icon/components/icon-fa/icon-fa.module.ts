import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ColorToTextClassModule } from 'projects/commons/src/lib/color/pipes/color-to-text-class/color-to-text-class.module';
import { IconFaComponent } from './icon-fa.component';

@NgModule({
  imports: [CommonModule, VendorsModule, FontAwesomeModule, ColorToTextClassModule],
  declarations: [IconFaComponent],
  exports: [IconFaComponent],
})
export class IconFaModule {}
