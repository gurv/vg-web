import { Component, Input, OnInit } from '@angular/core';

@Component({
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent implements OnInit {
  @Input() userAgent: string;

  constructor() {}

  ngOnInit() {
    this.userAgent = window.navigator.userAgent;
  }
}
