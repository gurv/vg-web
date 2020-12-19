import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { RepositoryUrlInputComponent } from './repository-url-input.component';

@NgModule({
  imports: [CommonModule, VendorsModule],
  declarations: [RepositoryUrlInputComponent],
  exports: [RepositoryUrlInputComponent],
})
export class RepositoryUrlInputModule {}
