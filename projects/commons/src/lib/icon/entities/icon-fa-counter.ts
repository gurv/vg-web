import { Color } from 'projects/commons/src/lib/color/entities/color';
import { Icon } from './icon';
import { IconFa } from './icon-fa';

export class IconFaCounter implements Icon {
  public readonly '@type' = 'IconFaCounter';

  constructor(
    public readonly icon: IconFa,
    public content: string = '',
    public contentColor: Color = 'primary',
  ) {}
}
