import { NgModule } from '@angular/core';
import { ConnectProjectDirective } from './connect-project.directive';

@NgModule({
  declarations: [ConnectProjectDirective],
  exports: [ConnectProjectDirective],
})
export class ConnectProjectModule {}
