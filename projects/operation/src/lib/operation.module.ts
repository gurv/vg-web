import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationPageModule } from './pages/operation-page/operation-page.module';

@NgModule({
  imports: [CommonModule, OperationPageModule],
  exports: [OperationPageModule],
})
export class OperationModule {}
