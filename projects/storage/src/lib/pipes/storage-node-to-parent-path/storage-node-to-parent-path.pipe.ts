import { Pipe, PipeTransform } from '@angular/core';
import { PathToParentPathPipe } from 'projects/commons/src/lib/tools/pipes/path-to-parent-path/path-to-parent-path.pipe';
import { StorageNode } from '../../entities/storage-node';

@Pipe({
  name: 'storageNodeToParentPath',
})
export class StorageNodeToParentPathPipe implements PipeTransform {
  constructor(private pathToParentPathPipe: PathToParentPathPipe) {}

  transform(node: StorageNode, args?: any): string {
    return this.pathToParentPathPipe.transform(node.path);
  }
}
