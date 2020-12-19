import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { MapComponent } from './map.component';

@NgModule({
  imports: [
    CommonModule,
    VendorsModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyDnwc-bUtWYikIiFN0RrkWC7unt3LpS9hg' }),
  ],
  declarations: [MapComponent],
  exports: [MapComponent],
})
export class MapModule {}
