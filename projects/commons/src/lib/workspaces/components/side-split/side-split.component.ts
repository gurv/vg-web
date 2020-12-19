import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Portal } from '@angular/cdk/portal';
import { SplitPanesComponent } from 'projects/commons/src/lib/split/components/split-panes/split-panes.component';
import { SplitDirection } from 'projects/commons/src/lib/split/entities/split-direction';
import { SplitPane } from 'projects/commons/src/lib/split/entities/split-pane';
import { TabsContentComponent } from 'projects/commons/src/lib/tabs/components/tabs-content/tabs-content.component';
import { TabsSide } from 'projects/commons/src/lib/tabs/entities/tabs-side';
import { TabsPosition } from 'projects/commons/src/lib/tabs/entities/tabs-position';
import { Tab } from 'projects/commons/src/lib/tabs/entities/tab';
import { SideConfiguration } from 'projects/commons/src/lib/workspaces/entities/side-configuration';
import { TabsConfiguration } from 'projects/commons/src/lib/workspaces/entities/tabs-configuration';

@Component({
  selector: 'lib-side-split',
  templateUrl: './side-split.component.html',
})
export class SideSplitComponent implements OnInit {
  @ViewChild('startTabsPortal', { static: true }) startTabsPortal: Portal<any>;
  @ViewChild('endTabsPortal', { static: true }) endTabsPortal: Portal<any>;

  @ViewChild('startTabsContent') startTabsContent: TabsContentComponent;
  @ViewChild('endTabsContent') endTabsContent: TabsContentComponent;

  @ViewChild('split', { static: true }) split: SplitPanesComponent;

  @Input() id: string;
  @Input() side: TabsSide;
  @Input() config: SideConfiguration;

  @Output() collapse = new EventEmitter<void>();
  @Output() expand = new EventEmitter<void>();

  start: TabsConfiguration;
  end: TabsConfiguration;
  direction: SplitDirection;
  startTabsIndex = -1;
  endTabsIndex = -1;
  splits: SplitPane[] = [];

  constructor() {}

  ngOnInit() {
    const sideHandlers = {};
    sideHandlers[TabsSide.TOP] = () => (this.direction = 'horizontal');
    sideHandlers[TabsSide.RIGHT] = () => (this.direction = 'vertical');
    sideHandlers[TabsSide.BOTTOM] = () => (this.direction = 'horizontal');
    sideHandlers[TabsSide.LEFT] = () => (this.direction = 'vertical');
    sideHandlers[this.side]();

    this.start = this.config.start;
    this.end = this.config.end;

    if (!this.start.empty) {
      this.startTabsIndex = 0;
      this.splits.push(this.start.toSplitPane(this.startTabsPortal, this.end));
    }

    if (!this.end.empty) {
      this.endTabsIndex = this.startTabsIndex + 1;
      this.splits.push(this.end.toSplitPane(this.endTabsPortal, this.start));
    }
  }

  tabUnselected(position: TabsPosition) {
    if (position === TabsPosition.START) {
      this.split.hide(this.startTabsIndex);
    } else {
      this.split.hide(this.endTabsIndex);
    }
    if (!this.startTabsSelected && !this.endTabsSelected) {
      this.collapse.emit();
    }
  }

  tabSelected(position: TabsPosition, $event: [number, Tab]) {
    if (position === TabsPosition.START) {
      this.split.show(this.startTabsIndex);
      if (!this.endTabsSelected) {
        this.split.hide(this.endTabsIndex);
      }
    } else {
      this.split.show(this.endTabsIndex);
      if (!this.startTabsSelected) {
        this.split.hide(this.startTabsIndex);
      }
    }
    this.expand.emit();
  }

  paneHidden($event: [number, SplitPane]) {
    if ($event[0] === this.startTabsIndex) {
      this.startTabsContent.unselectTab();
    } else if ($event[0] === this.endTabsIndex) {
      this.endTabsContent.unselectTab();
    }
  }

  paneShown($event: [number, SplitPane]) {
    // Nothing to do
  }

  closeTabs() {
    if (this.startTabsContent) {
      this.startTabsContent.unselectTab();
    }
    if (this.endTabsContent) {
      this.endTabsContent.unselectTab();
    }
  }

  get startTabsSelected(): boolean {
    return this.startTabsContent && this.startTabsContent.hasSelectedTab();
  }

  get endTabsSelected(): boolean {
    return this.endTabsContent && this.endTabsContent.hasSelectedTab();
  }
}
