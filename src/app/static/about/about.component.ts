import { Component, Input, OnInit } from '@angular/core';
// FIXME не разобрался почему это не работает. См. коммент в about.module.ts
// import { ToolchainComponent } from './toolchain/toolchain.component'

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
