import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-about-page',
  templateUrl: './about-page.component.html',
})
export class AboutPageComponent implements OnInit {
  @Input() userAgent: string;

  constructor() {}

  ngOnInit() {
    this.userAgent = window.navigator.userAgent;
  }
}
