import { Portal } from '@angular/cdk/portal';
import { Icon } from 'projects/commons/src/lib/icon/entities/icon';
import { HelpPageId } from 'projects/commons/src/lib/help/entities/help-page-id';

export class Tab {
  constructor(
    public portal: Portal<any>,
    public label: string,
    public icon: Icon,
    public helpPageId: HelpPageId = null,
    public keepContent: boolean = true,
    public selectOn: string[] = [],
    public headerComponentRef?: any,
  ) {}
}
