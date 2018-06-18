import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationComponent } from './operation.component';
import { SharedModule } from "@app/shared";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [OperationComponent],
  declarations: [OperationComponent]
})
export class OperationModule { }
