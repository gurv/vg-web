import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { ProjectMenuComponent } from './project-menu.component';
import { CurrentProjectModule } from '../current-project/current-project.module';

@NgModule({
  imports: [CommonModule, VendorsModule, CurrentProjectModule],
  declarations: [ProjectMenuComponent],
  exports: [ProjectMenuComponent],
})
export class ProjectMenuModule {}
