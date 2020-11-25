import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OperationPageComponent } from './pages';

const routes: Routes = [
  {
    path: '',
    component: OperationPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationRoutingModule {}
