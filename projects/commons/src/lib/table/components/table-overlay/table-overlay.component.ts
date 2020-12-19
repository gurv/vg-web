import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'lib-table-overlay',
  templateUrl: './table-overlay.component.html',
  styleUrls: ['./table-overlay.component.scss'],
})
export class TableOverlayComponent implements OnInit {
  @Input() loading: boolean;
  @Input() dataSource: MatTableDataSource<any>;
  @Input() noDataLabel: string;
  @Input() id: string;

  ngOnInit(): void {
    this.noDataLabel = this.noDataLabel || 'Нет данных';
  }
}
