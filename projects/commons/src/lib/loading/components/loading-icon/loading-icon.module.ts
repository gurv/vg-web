import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerModule } from 'projects/commons/src/lib/spinner/components/spinner/spinner.module';
import { LoadingIconComponent } from './loading-icon.component';

@NgModule({
  imports: [CommonModule, SpinnerModule],
  declarations: [LoadingIconComponent],
  exports: [LoadingIconComponent],
})
export class LoadingIconModule {}
