import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { GitCommandComponent } from './git-command.component';

@NgModule({
  imports: [CommonModule, VendorsModule],
  declarations: [GitCommandComponent],
  exports: [GitCommandComponent],
})
export class GitCommandModule {}
