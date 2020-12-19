import { Pipe, PipeTransform } from '@angular/core';
import { StorageNode } from '../../entities/storage-node';

@Pipe({
  name: 'storageNodeToPredicate',
})
export class StorageNodeToPredicatePipe implements PipeTransform {
  transform(node: StorageNode, args?: any): (current: StorageNode) => boolean {
    const childrenPath = node.path + '/';
    return (current: StorageNode) =>
      current.path === node.path ||
      (current.path.startsWith(childrenPath) && current.depth > node.depth);
  }
}
