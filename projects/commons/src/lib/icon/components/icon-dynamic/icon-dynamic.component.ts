import { Component, Input, OnInit } from '@angular/core';
import { Icon } from 'projects/commons/src/lib/icon/entities/icon';
import { IconDynamic } from 'projects/commons/src/lib/icon/entities/icon-dynamic';

@Component({
  selector: 'lib-icon-dynamic',
  templateUrl: './icon-dynamic.component.html',
})
export class IconDynamicComponent implements OnInit {
  @Input() icon: IconDynamic;

  current: Icon;
  _state: string;

  @Input() set state(state: string) {
    this._state = state;
    this._updateCurrent(state);
  }

  ngOnInit() {
    this._updateCurrent(this._state);
  }

  _updateCurrent(state: string) {
    this.current = this.icon.stateIcons[state] || this.icon.defaultIcon;
  }
}
