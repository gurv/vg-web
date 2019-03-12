import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared';
import { ToolchainComponent } from './toolchain.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  exports: [ToolchainComponent],
  declarations: [ToolchainComponent]
})
export class ToolchainModule {}
