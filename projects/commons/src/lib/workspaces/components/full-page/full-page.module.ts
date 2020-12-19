import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { IconModule } from 'projects/commons/src/lib/icon/components/icon/icon.module';
import { SpinnerModule } from 'projects/commons/src/lib/spinner/components/spinner/spinner.module';
import { FullPageComponent } from './full-page.component';

@NgModule({
  imports: [CommonModule, VendorsModule, IconModule, SpinnerModule],
  declarations: [FullPageComponent],
  exports: [FullPageComponent],
})
export class FullPageModule {}
