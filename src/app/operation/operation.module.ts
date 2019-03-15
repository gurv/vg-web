import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { OperationComponent } from './operation.component';
import { OperationRoutingModule } from './operation-routing.module';

@NgModule({
  imports: [CommonModule, SharedModule, OperationRoutingModule],
  exports: [OperationComponent],
  declarations: [OperationComponent]
})
export class OperationModule {}
