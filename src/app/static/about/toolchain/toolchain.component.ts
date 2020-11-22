import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { environment as env } from '@env';
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
