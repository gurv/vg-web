import { Portal } from '@angular/cdk/portal';
import { Tab } from 'projects/commons/src/lib/tabs/entities/tab';
import { SplitPane } from 'projects/commons/src/lib/split/entities/split-pane';

export class TabsConfiguration {
  constructor(
    public tabs: Tab[],
    public index: number,
    public defaultSize: number,
    public minSize: number = 0,
  ) {}

  get empty(): boolean {
    return this.tabs.length === 0;
  }

  getInitSize(other: TabsConfiguration): number {
    return this.index === -1 ? 0 : other.index === -1 ? 100 : this.defaultSize;
  }

  toSplitPane(portal: Portal<any>, other: TabsConfiguration): SplitPane {
    return new SplitPane(portal, this.defaultSize, this.minSize, this.getInitSize(other));
  }
}

export const EMPTY_TABS_CONFIG = new TabsConfiguration([], -1, 0, 0);
