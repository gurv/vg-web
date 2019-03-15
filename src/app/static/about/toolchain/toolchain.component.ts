import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { environment as env } from '../../../../environments/environment';
import { ToolchainElement } from './toolchain-element';

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
