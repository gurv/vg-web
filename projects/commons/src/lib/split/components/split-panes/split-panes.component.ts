import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import * as _ from 'lodash';
import { EventBusService } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service';
import { SplitConfiguration } from 'projects/commons/src/lib/split/entities/split-configuration';
import { SplitDirection } from 'projects/commons/src/lib/split/entities/split-direction';
import { SplitDirectionService } from 'projects/commons/src/lib/split/entities/split-direction-service';
import { SplitDrag } from 'projects/commons/src/lib/split/entities/split-drag';
import { SplitPane } from 'projects/commons/src/lib/split/entities/split-pane';
import { SplitPanesDragStart } from 'projects/commons/src/lib/split/entities/split-panes-drag-start';
import { SplitPanesDragStop } from 'projects/commons/src/lib/split/entities/split-panes-drag-stop';
import { SplitDirectionHorizontalService } from 'projects/commons/src/lib/split/services/split-direction-horizontal/split-direction-horizontal.service';
import { SplitDirectionVerticalService } from 'projects/commons/src/lib/split/services/split-direction-vertical/split-direction-vertical.service';
import { LocalStorageService } from 'projects/commons/src/lib/tools/services/local-storage/local-storage.service';
import { WindowService } from 'projects/commons/src/lib/tools/services/window/window.service';
import { SplitPaneDirective } from 'projects/commons/src/lib/split/directives/split-pane/split-pane.directive';

@Component({
  selector: 'lib-split-panes',
  templateUrl: './split-panes.component.html',
  styleUrls: ['./split-panes.component.scss'],
  providers: [SplitDirectionVerticalService, SplitDirectionHorizontalService],
})
export class SplitPanesComponent implements OnInit {
  private static readonly HIDE_THRESHOLD = 10;

  @Input() id: string;
  @Input() panes: SplitPane[];
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('direction') directionId: SplitDirection;
  @Output() paneHidden = new EventEmitter<[number, SplitPane]>();
  @Output() paneShown = new EventEmitter<[number, SplitPane]>();
  @ViewChildren(SplitPaneDirective, { read: ElementRef }) divs: QueryList<ElementRef>;

  direction: SplitDirectionService;
  configurations: SplitConfiguration[];
  drag: SplitDrag;

  private readonly directionServices: { [key in SplitDirection]: SplitDirectionService };

  constructor(
    horizontal: SplitDirectionHorizontalService,
    vertical: SplitDirectionVerticalService,
    private storage: LocalStorageService,
    private eventBus: EventBusService,
    private window: WindowService,
  ) {
    this.directionServices = {
      vertical,
      horizontal,
    };
  }

  ngOnInit() {
    console.assert(
      _.sumBy(this.panes, 'defaultSize') === 100,
      `${this.id}: Sum of sizes must be 100!`,
    );
    console.assert(
      _.sumBy(this.panes, 'minSize') <= 100,
      `${this.id}: Sum of min sizes must be < 100!`,
    );
    this.direction = this.directionServices[this.directionId];
    this.configurations = this.storage.getItem(
      this.id,
      _.map(this.panes, (pane) => ({
        visibleSize: pane.initSize,
        defaultSize: pane.defaultSize,
        minSize: pane.minSize,
      })),
    );
  }

  cursorDragged($event: MouseEvent) {
    if (!this.drag) {
      return;
    }
    const pixelPosition = this.direction.eventToSize($event);
    const beforePixelSize = this.drag.beforePixelSize - this.drag.pixelPosition + pixelPosition;
    const afterPixelSize = this.drag.afterPixelSize + this.drag.pixelPosition - pixelPosition;
    const beforePercentSize =
      (beforePixelSize * this.drag.beforePercentSize) / this.drag.beforePixelSize;
    const afterPercentSize =
      (afterPixelSize * this.drag.afterPercentSize) / this.drag.afterPixelSize;
    if (
      beforePercentSize >= this.configurations[this.drag.beforeIndex].minSize &&
      afterPercentSize >= this.configurations[this.drag.afterIndex].minSize
    ) {
      this.configurations[this.drag.beforeIndex].visibleSize = beforePercentSize;
      this.configurations[this.drag.afterIndex].visibleSize = afterPercentSize;
    }
  }

  cursorPressed(index: number, $event: MouseEvent) {
    $event.preventDefault();
    const beforeIndex = index;
    const afterIndex = this._getNextVisibleIndex(index);
    this.drag = new SplitDrag(
      this.direction.eventToSize($event),
      beforeIndex,
      afterIndex,
      this.configurations[index].visibleSize,
      this.configurations[afterIndex].visibleSize,
      this.direction.divToSize(
        this.divs.find((item, i: number) => i === beforeIndex).nativeElement,
      ),
      this.direction.divToSize(this.divs.find((item, i: number) => i === afterIndex).nativeElement),
    );
    this.eventBus.publish(new SplitPanesDragStart());
  }

  stopDrag() {
    if (!this.drag) {
      return;
    }
    this.divs.forEach((item, i: number) => {
      if (this.direction.divToSize(item.nativeElement) < SplitPanesComponent.HIDE_THRESHOLD) {
        this.hide(i);
      }
    });
    this.drag = undefined;
    this._saveConfigurations();
    this.eventBus.publish(new SplitPanesDragStop());
  }

  hide(index: number) {
    const configuration = this.configurations[index];
    if (!configuration || !configuration.visibleSize) {
      return;
    }
    const visibleSize = configuration.visibleSize;
    configuration.visibleSize = 0;
    this._updateClosestConfiguration(index, visibleSize);
    this._normalizeVisibleSizes();
    this.paneHidden.emit([index, this.panes[index]]);
    this._saveConfigurations();
  }

  show(index: number) {
    const configuration = this.configurations[index];
    if (!configuration || configuration.visibleSize) {
      return;
    }
    configuration.visibleSize = configuration.defaultSize;
    this._updateClosestConfiguration(index, -configuration.visibleSize);
    this._normalizeVisibleSizes();
    this.paneShown.emit([index, this.panes[index]]);
    this._saveConfigurations();
  }

  _getNextVisibleIndex(index: number): number {
    for (let i = index + 1; i < this.configurations.length; i++) {
      if (this.configurations[i].visibleSize) {
        return i;
      }
    }
    return -1;
  }

  _updateClosestConfiguration(currentIndex: number, visibleSizeDelta: number) {
    const closestIndex = this._getClosestIndex(currentIndex);
    if (closestIndex !== -1) {
      const closestConfiguration = this.configurations[closestIndex];
      closestConfiguration.visibleSize += visibleSizeDelta;
    }
  }

  _getClosestIndex(index: number): number {
    const nextIndex = this._getNextVisibleIndex(index);
    if (nextIndex !== -1) {
      return nextIndex;
    }
    for (let i = index - 1; i >= 0; i--) {
      if (this.configurations[i].visibleSize) {
        return i;
      }
    }
    return -1;
  }

  _normalizeVisibleSizes() {
    if (this._isNormal()) {
      return;
    }

    _.forEach(this.configurations, (conf) => {
      if (conf.visibleSize) {
        conf.visibleSize = conf.defaultSize;
      }
    });

    const totalVisibleSize = _.sumBy(this.configurations, 'visibleSize');
    _.forEach(this.configurations, (conf) => {
      if (conf.visibleSize) {
        conf.visibleSize = (conf.visibleSize / totalVisibleSize) * 100;
      }
    });
  }

  _isNormal() {
    return (
      Math.abs(_.sumBy(this.configurations, 'visibleSize') - 100) < 0.5 &&
      _.findIndex(this.configurations, (config) => config.visibleSize < config.minSize) === -1
    );
  }

  _saveConfigurations() {
    this.storage.setItem(this.id, this.configurations);
    this.window.resize();
  }
}
