import { Component, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

interface IRoute {
  title?: string;
  route?: string;
  icon?: string;
}

@Component({
  selector: 'lib-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss'],
})
export class ContentLayoutComponent implements OnInit {
  overlayContainer: OverlayContainer;
  myRoutes: IRoute[] = [
    {
      title: 'Пример. Операции',
      route: 'operation',
      icon: 'home',
    },
  ];
  showHelpMenu = false;

  ngOnInit(): void {
    if (this.overlayContainer) {
      this.overlayContainer.getContainerElement().classList.add();
    }
  }
}
