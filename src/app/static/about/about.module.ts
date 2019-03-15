import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AboutComponent } from './about.component';
import { ToolchainComponent } from './toolchain/toolchain.component';

@NgModule({
  imports: [CommonModule],
  exports: [AboutComponent],
  declarations: [AboutComponent, ToolchainComponent]
})
export class AboutModule {}