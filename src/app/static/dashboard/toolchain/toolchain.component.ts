import { Component, OnInit } from '@angular/core';

import { environment as env } from '@env/environment';
import { MatTableDataSource } from '@angular/material';

class ToolchainElement {
  name: string;
  version: string;

  constructor(name: string, version: string) {
    this.name = name;
    this.version = version;
  }
}

@Component({
  selector: 'app-toolchain',
  templateUrl: './toolchain.component.html',
  styleUrls: ['./toolchain.component.scss']
})
export class ToolchainComponent implements OnInit {
  displayedColumns = ['name', 'version'];
  dataSource = new MatTableDataSource<ToolchainElement>(
    Object.keys(env.versions).map((value) => new ToolchainElement(value, env.versions[value]))
  );

  ngOnInit() {}
}
