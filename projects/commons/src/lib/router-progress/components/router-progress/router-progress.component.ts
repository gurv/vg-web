import { Component } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'lib-router-progress',
  templateUrl: './router-progress.component.html',
  styleUrls: ['./router-progress.component.scss'],
  animations: [
    trigger('myAnimation', [
      transition(':enter', [style({ top: '0px', opacity: 1 })]),
      transition(':leave', [
        style({ top: '0px', opacity: 1 }),
        animate('500ms', style({ top: '-5px', opacity: 0 })),
      ]),
    ]),
  ],
})
export class RouterProgressComponent {
  document = document;
  loading = false;

  constructor(router: Router) {
    router.events.pipe(filter((event) => event instanceof NavigationStart)).subscribe(() => {
      this.loading = true;
    });

    router.events
      .pipe(
        filter(
          (event) =>
            event instanceof NavigationEnd ||
            event instanceof NavigationCancel ||
            event instanceof NavigationError,
        ),
      )
      .subscribe(() => {
        this.loading = false;
        const background = this.document.getElementById('background-logo');
        if (background) {
          background.setAttribute('class', 'fade-out');
          setTimeout(() => {
            background.outerHTML = '';
          }, 200);
        }
      });
  }
}
