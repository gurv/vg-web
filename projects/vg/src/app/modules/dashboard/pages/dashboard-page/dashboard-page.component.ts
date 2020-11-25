import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-page',
  styleUrls: ['./dashboard-page.component.scss'],
  templateUrl: './dashboard-page.component.html'
})
export class DashboardPageComponent implements OnInit {
  ngOnInit() {
    console.log('Инициализация компоненты `DashboardPage`');
  }
}
