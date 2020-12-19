import { Color } from 'projects/commons/src/lib/color/entities/color';
import { Icon } from './icon';

export class IconFa implements Icon {
  public readonly '@type' = 'IconFa';

  constructor(
    public readonly icon: any, // IconDefinition,
    public readonly color: Color = 'foreground',
    public readonly transform: string = '',
    public readonly spin = false,
  ) { }
}
