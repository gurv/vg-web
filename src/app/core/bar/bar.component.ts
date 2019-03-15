import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent {
  title = 'vg';
  @Output() toggleSidenav = new EventEmitter<void>();
}
