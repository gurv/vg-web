import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolchainComponent } from "@app/static/dashboard/toolchain/toolchain.component";
import { SharedModule } from "@app/shared";

@NgModule({
  imports: [CommonModule, SharedModule],
  exports: [ToolchainComponent],
  declarations: [ToolchainComponent]
})
export class ToolchainModule { }
