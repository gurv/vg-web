import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

import { OperationService } from '../../services/operation.service';

@Component({
  selector: 'app-operation-page',
  templateUrl: './operation-page.component.html',
  styleUrls: ['./operation-page.component.scss'],
  providers: [OperationService]
})
export class OperationPageComponent implements OnInit, OnDestroy {
  @Input() count: number;
  @Input() newCount: number;
  @Input() workingCount: number;
  @Input() processingStarted: boolean;
  @Input() on: boolean;

  alive = false;
  private readonly interval: number = 3000;

  constructor(private operationService: OperationService) {}

  ngOnInit() {
    this.getData();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  getData(): void {
    timer(0, this.interval)
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => {
        this.operationService.countAll().subscribe((result) => {
          this.count = result;
        });
        this.operationService.countByState(0).subscribe((result) => {
          this.newCount = result;
        });
        this.operationService.countByState(1).subscribe((result) => {
          this.workingCount = result;
        });
        this.operationService.isProcessingStarted().subscribe((result) => {
          this.processingStarted = result;
        });
      });
  }

  onChangeProcessingState() {
    if (this.processingStarted) {
      this.operationService.startProcessing().subscribe();
    } else {
      this.operationService.stopProcessing().subscribe();
    }
  }

  createOperationBatch() {
    this.operationService.createOperationBatch().subscribe();
  }

  onAlive() {
    this.alive = !this.alive;
    if (this.alive) {
      this.getData();
    }
  }
}
