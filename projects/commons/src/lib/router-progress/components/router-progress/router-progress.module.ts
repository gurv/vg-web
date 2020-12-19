import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterProgressComponent } from './router-progress.component';

@NgModule({
  imports: [CommonModule, MatProgressBarModule],
  declarations: [RouterProgressComponent],
  exports: [RouterProgressComponent],
})
export class RouterProgressModule {}
