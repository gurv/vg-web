import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { OperationRoutingModule } from './operation-routing.module';
import { COMPONENTS } from './';

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    SharedModule,
    OperationRoutingModule
  ]
})
export class OperationModule {}
