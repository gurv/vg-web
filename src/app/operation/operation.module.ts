import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { OperationRoutingModule } from './operation-routing.module';
import { OperationComponent } from './operation.component';

@NgModule({
  imports: [CommonModule, SharedModule, OperationRoutingModule],
  exports: [OperationComponent],
  declarations: [OperationComponent]
})
export class OperationModule {}
