import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkspaceComponent } from 'projects/ide/src/app/workspace/workspace/workspace.component';
import { FakeCentralComponent } from 'projects/ide/src/app/workspace/workspace/fake-central/fake-central.component';

const routes: Routes = [
  {
    path: '',
    component: WorkspaceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [FakeCentralComponent],
  exports: [RouterModule],
})
export class WorkspaceRoutingModule {}
