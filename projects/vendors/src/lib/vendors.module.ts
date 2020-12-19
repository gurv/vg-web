import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';

const vendorsModules = [FormsModule, ReactiveFormsModule, MaterialModule, FlexLayoutModule];

@NgModule({
  imports: [...vendorsModules],
  exports: [...vendorsModules],
})
export class VendorsModule {}
