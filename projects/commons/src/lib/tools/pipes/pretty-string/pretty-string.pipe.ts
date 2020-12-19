import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
import { StringToolsService } from 'projects/commons/src/lib/tools/services/string-tools/string-tools.service';

@Pipe({
  name: 'prettyString',
})
export class PrettyStringPipe implements PipeTransform {
  constructor(private stringToolsService: StringToolsService) { }

  transform(value: string, args?: any): string {
    console.log(`!!! ${value}`);
    return _.upperFirst(this.stringToolsService.replaceAll(value.toLowerCase(), '_', ' '));
  }
}
