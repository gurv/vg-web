import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
// import { environment as env } from '@env'; // TODO
import { ToolchainElement } from 'projects/commons/src/lib/about/entities/toolchain-element';

@Component({
  selector: 'lib-toolchain',
  templateUrl: './toolchain.component.html',
})
export class ToolchainComponent implements OnInit {
  displayedColumns = ['name', 'version'];
  dataSource = new MatTableDataSource<ToolchainElement>(
    // Object.keys(env.versions).map((value) => new ToolchainElement(value, env.versions[value])),
    Object.keys(['app']).map((value) => new ToolchainElement(value, '1.0.0')),
  );

  ngOnInit() {}
}
