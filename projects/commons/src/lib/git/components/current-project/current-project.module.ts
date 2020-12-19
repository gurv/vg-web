import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { CurrentProjectComponent } from './current-project.component';

@NgModule({
  imports: [CommonModule, VendorsModule],
  declarations: [CurrentProjectComponent],
  exports: [CurrentProjectComponent],
})
export class CurrentProjectModule {}
