import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { AgmCoreModule, GoogleMapsAPIWrapper } from "@agm/core";

@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDnwc-bUtWYikIiFN0RrkWC7unt3LpS9hg'
    })
  ],
  providers: [
    GoogleMapsAPIWrapper
  ],
  exports: [MapComponent],
  declarations: [MapComponent]
})
export class MapModule { }
