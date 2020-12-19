import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'lib-git-path-table',
  templateUrl: './git-path-table.component.html',
  styleUrls: ['./git-path-table.component.scss'],
})
export class GitPathTableComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public readonly displayedColumns: string[] = ['path'];
  dataSource: MatTableDataSource<string> = new MatTableDataSource([]);

  @Input()
  set paths(paths: string[]) {
    this.dataSource.data = paths;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }
}
