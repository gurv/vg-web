import { NgModule } from '@angular/core';
import { NodeEventToNodePipe } from './node-event-to-node.pipe';

@NgModule({
  declarations: [NodeEventToNodePipe],
  exports: [NodeEventToNodePipe],
})
export class NodeEventToNodeModule {}
