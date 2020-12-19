import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GitFileStatus } from 'projects/commons/src/lib/git/entities/git-file-status';

@Component({
  selector: 'lib-git-file-status-table',
  templateUrl: './git-file-status-table.component.html',
  styleUrls: ['./git-file-status-table.component.scss'],
})
export class GitFileStatusTableComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public readonly displayedColumns: string[] = ['path', 'xy'];
  dataSource: MatTableDataSource<GitFileStatus> = new MatTableDataSource([]);
  @Input()
  set fileStatuses(statuses: GitFileStatus[]) {
    this.dataSource.data = statuses;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }
}
