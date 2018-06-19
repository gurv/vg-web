import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { OperationService } from "@app/static/dashboard/operation/operation.service";
import { TimerObservable } from "rxjs/observable/TimerObservable";


@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.scss'],
  providers: [OperationService]
})
export class OperationComponent implements OnInit, OnDestroy {

  @Input() count: number;
  @Input() newCount: number;
  @Input() workingCount: number;
  @Input() processingStarted: boolean;

  private alive: boolean = true;
  private readonly interval: number = 3000;

  constructor(
    private operationService: OperationService
  ) {}

  ngOnInit() {
    this.getData();
  }

  ngOnDestroy(){
    this.alive = false;
  }

  getData(): void {
    TimerObservable.create(0, this.interval)
      .takeWhile(() => this.alive)
      .subscribe(() => {
        this.operationService.countAll()
          .subscribe(
            result => {
              this.count = result;
            }
          );
        this.operationService.countByState(0)
          .subscribe(
            result => {
              this.newCount = result;
            }
          );
        this.operationService.countByState(1)
          .subscribe(
            result => {
              this.workingCount = result;
            }
          );
        this.operationService.isProcessingStarted()
          .subscribe(
            result => {
              this.processingStarted = result;
            }
          )
    })
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

}
