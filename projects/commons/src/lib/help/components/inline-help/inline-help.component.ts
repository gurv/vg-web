import { Component, Input } from '@angular/core';
import { HELP_ICON } from 'projects/commons/src/lib/icon/entities/icons';

@Component({
  selector: 'lib-inline-help',
  templateUrl: './inline-help.component.html',
  styleUrls: ['./inline-help.component.scss'],
})
export class InlineHelpComponent {
  @Input() tooltip: string;

  readonly helpIcon = HELP_ICON;
}
