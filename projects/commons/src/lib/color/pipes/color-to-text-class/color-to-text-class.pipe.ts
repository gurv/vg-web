import { Pipe, PipeTransform } from '@angular/core';
import { Color } from 'projects/commons/src/lib/color/entities/color';

@Pipe({
  name: 'colorToTextClass',
  pure: true,
})
export class ColorToTextClassPipe implements PipeTransform {
  transform(value: Color): any {
    return `text-${value}`;
  }
}
