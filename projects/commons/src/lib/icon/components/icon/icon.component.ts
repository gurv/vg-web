import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Icon } from 'projects/commons/src/lib/icon/entities/icon';

@Component({
  selector: 'lib-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class IconComponent {
  @Input() icon: Icon;
  @Input() state?: string;
}
