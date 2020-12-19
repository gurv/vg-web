import { Component, Input } from '@angular/core';
import { IconFaAddon } from 'projects/commons/src/lib/icon/entities/icon-fa-addon';

@Component({
  selector: 'lib-icon-fa-addon',
  templateUrl: './icon-fa-addon.component.html',
})
export class IconFaAddonComponent {
  @Input() icon: IconFaAddon;
}
