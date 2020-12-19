import { NgModule } from '@angular/core';
import { OwnerToStringPipe } from './owner-to-string.pipe';

@NgModule({
  declarations: [OwnerToStringPipe],
  exports: [OwnerToStringPipe],
})
export class OwnerToStringModule {}
