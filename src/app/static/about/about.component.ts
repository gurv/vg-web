import { Component, Input, OnInit } from '@angular/core';

@Component({
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  @Input() userAgent: string;

  constructor() {}

  ngOnInit() {
    this.userAgent = window.navigator.userAgent;
  }
}
