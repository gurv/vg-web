import { Component } from '@angular/core';

interface IRoute {
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
  myRoutes: IRoute[] = [
    {
      title: 'Пример. Операции',
      route: 'operation',
      icon: 'home'
    }
  ];
  showHelpMenu = false;
}
