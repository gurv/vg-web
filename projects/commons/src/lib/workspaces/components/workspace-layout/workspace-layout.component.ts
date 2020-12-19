import { Portal } from '@angular/cdk/portal';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SplitPanesComponent } from 'projects/commons/src/lib/split/components/split-panes/split-panes.component';
import { SplitPane } from 'projects/commons/src/lib/split/entities/split-pane';
import { SideSplitComponent } from 'projects/commons/src/lib/workspaces/components/side-split/side-split.component';
import { SideConfiguration } from 'projects/commons/src/lib/workspaces/entities/side-configuration';

@Component({
  selector: 'lib-workspace-layout',
  templateUrl: './workspace-layout.component.html',
})
export class WorkspaceLayoutComponent implements OnInit {
  // Split portals
  @ViewChild('horizontalSplitPortal', { static: true }) horizontalSplitPortal: Portal<any>;

  // Splits
  @ViewChild('verticalSplit', { static: true }) verticalSplit: SplitPanesComponent;
  @ViewChild('horizontalSplit') horizontalSplit: SplitPanesComponent;

  // Side Splits
  @ViewChild('leftSideSplit') leftSideSplit: SideSplitComponent;
  @ViewChild('rightSideSplit') rightSideSplit: SideSplitComponent;
  @ViewChild('bottomSideSplit') bottomSideSplit: SideSplitComponent;

  @ViewChild('leftSideSplitPortal', { static: true }) leftSideSplitPortal: Portal<any>;
  @ViewChild('rightSideSplitPortal', { static: true }) rightSideSplitPortal: Portal<any>;
  @ViewChild('bottomSideSplitPortal', { static: true }) bottomSideSplitPortal: Portal<any>;

  @Input() id: string;
  @Input() center: Portal<any>;
  @Input() centerMinWidth?: number;
  @Input() centerMinHeight?: number;
  @Input() bottom: SideConfiguration;
  @Input() left: SideConfiguration;
  @Input() right: SideConfiguration;

  verticalSplits: SplitPane[] = [];
  horizontalSplits: SplitPane[] = [];
  rightTabsIndex = 1;

  constructor() { }

  ngOnInit() {
    this.centerMinWidth = this.centerMinWidth || 30;
    this.centerMinHeight = this.centerMinHeight || 30;

    let centerDefaultWidth = 100;
    let centerInitWidth = 100;
    if (!this.left.empty) {
      this.horizontalSplits.push(this.left.toSplitPane(this.leftSideSplitPortal));
      centerDefaultWidth -= this.left.defaultSize;
      centerInitWidth -= this.left.initSize;
      this.rightTabsIndex = 2;
    }
    if (!this.right.empty) {
      centerDefaultWidth -= this.right.defaultSize;
      centerInitWidth -= this.right.initSize;
    }
    this.horizontalSplits.push(
      new SplitPane(this.center, centerDefaultWidth, this.centerMinHeight, centerInitWidth),
    );
    if (!this.right.empty) {
      this.horizontalSplits.push(this.right.toSplitPane(this.rightSideSplitPortal));
    }

    this.verticalSplits.push(
      new SplitPane(
        this.horizontalSplitPortal,
        100 - this.bottom.defaultSize,
        this.centerMinHeight,
        100 - this.bottom.initSize,
      ),
    );

    if (!this.bottom.empty) {
      this.verticalSplits.push(this.bottom.toSplitPane(this.bottomSideSplitPortal));
    }
  }

  bottomPaneExpanded() {
    this.verticalSplit.show(1);
  }

  bottomPaneCollapsed() {
    this.verticalSplit.hide(1);
  }

  bottomPaneHidden() {
    this.bottomSideSplit.closeTabs();
  }

  leftPaneExpanded() {
    this.horizontalSplit.show(0);
  }

  leftPaneCollapsed() {
    this.horizontalSplit.hide(0);
  }

  rightPaneExpanded() {
    this.horizontalSplit.show(this.rightTabsIndex);
  }

  rightPaneCollapsed() {
    this.horizontalSplit.hide(this.rightTabsIndex);
  }

  leftRightPaneHidden($event: [number, SplitPane]) {
    const index = $event[0];
    if (index === 0) {
      this.leftSideSplit.closeTabs();
    } else if (index === this.rightTabsIndex) {
      this.rightSideSplit.closeTabs();
    }
  }
}
