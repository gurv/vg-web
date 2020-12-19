import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ColorToTextClassModule } from 'projects/commons/src/lib/color/pipes/color-to-text-class/color-to-text-class.module';
import { ColorToBackgroundClassModule } from 'projects/commons/src/lib/color/pipes/color-to-background-class/color-to-background-class.module';
import { IconFaCounterComponent } from './icon-fa-counter.component';

@NgModule({
  imports: [
    CommonModule,
    VendorsModule,
    FontAwesomeModule,
    ColorToTextClassModule,
    ColorToBackgroundClassModule,
  ],
  declarations: [IconFaCounterComponent],
  exports: [IconFaCounterComponent],
})
export class IconFaCounterModule {}
