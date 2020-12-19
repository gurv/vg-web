import { Pipe, PipeTransform } from '@angular/core';
import { PathToNamePipe } from 'projects/commons/src/lib/tools/pipes/path-to-name/path-to-name.pipe';
import { StorageNode } from '../../entities/storage-node';

@Pipe({
  name: 'storageNodeToName',
})
export class StorageNodeToNamePipe implements PipeTransform {
  constructor(private pathToNamePipe: PathToNamePipe) {}

  transform(node: StorageNode, args?: any): string {
    return this.pathToNamePipe.transform(node.path);
  }
}
