import { NgModule } from '@angular/core';
import { SSEService } from './services/sse/sse.service';

@NgModule({
  providers: [SSEService],
})
export class SSEModule {}
