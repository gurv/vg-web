import { IconFa } from './icon-fa';
import { Icon } from './icon';

export class IconFaAddon implements Icon {
  public readonly '@type' = 'IconFaAddon';

  constructor(public readonly icon: IconFa, public readonly addon: IconFa) {}
}
