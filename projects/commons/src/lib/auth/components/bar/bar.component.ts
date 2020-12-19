import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'lib-bar',
  templateUrl: './bar.component.html',
})
export class BarComponent {
  @Output() toggleSidenav = new EventEmitter<void>();
  title = 'vg';
}
