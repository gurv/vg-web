import { Pipe, PipeTransform } from '@angular/core';
import { NodeEvent } from 'projects/storage/src/lib/entities/node-event';

@Pipe({
  name: 'nodeEventToNode',
})
export class NodeEventToNodePipe implements PipeTransform {
  transform(value: NodeEvent, args?: any): any {
    return value.node;
  }
}
