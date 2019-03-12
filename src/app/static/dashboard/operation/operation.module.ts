import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared';
import { OperationComponent } from './operation.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  exports: [OperationComponent],
  declarations: [OperationComponent]
})
export class OperationModule {}
