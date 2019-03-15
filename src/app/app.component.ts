import { Component } from '@angular/core';

interface ROUTE {
  title?: string;
  route?: string;
  icon?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  myRoutes: ROUTE[] = [
    {
      title: 'Пример. Операции',
      route: 'operation',
      icon: 'home'
    }
  ];
  showHelpMenu: boolean = false;
}
