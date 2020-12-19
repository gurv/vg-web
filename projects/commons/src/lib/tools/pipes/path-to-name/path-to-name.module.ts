import { NgModule } from '@angular/core';
import { PathToNamePipe } from './path-to-name.pipe';

@NgModule({
  declarations: [PathToNamePipe],
  exports: [PathToNamePipe],
})
export class PathToNameModule {}
