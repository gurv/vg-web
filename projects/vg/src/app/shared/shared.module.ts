import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import { MaterialModule } from './material.module';

import { ControlMessagesComponent } from './components/control-messages/control-messages.component';

@NgModule({
  declarations: [
    ControlMessagesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
//    Ng2GoogleChartsModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
//    Ng2GoogleChartsModule,

    MaterialModule,

    ControlMessagesComponent
  ]
})
export class SharedModule {}
