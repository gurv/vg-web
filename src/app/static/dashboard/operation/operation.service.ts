/*
 Сервис операций (пример)
 */
import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable()
export class OperationService {

  private baseUrl: string = '//localhost:8080/operation';

  constructor(private http: HttpClient) { }

  countAll(): Observable<any> {
    return this.http.get(this.baseUrl + '/search/countAll');
  }

  countByTimestampLessThanEqual(ts: Date): Observable<any> {
    return this.http.get(this.baseUrl + '/search/countByTimestampLessThanEqual', {
      params : new HttpParams()
        .set('ts', ts.toISOString())
    });
  }

  countByTimestampLessThanEqualAndState(ts: Date, state: number): Observable<any> {
    return this.http.get(this.baseUrl + '/search/countByTimestampLessThanEqualAndState', {
      params : new HttpParams()
        .set('ts', ts.toISOString())
        .set('state', state.toString())
    });
  }

  countByState(state: number): Observable<any> {
    return this.http.get(this.baseUrl + '/search/countByState', {
      params : new HttpParams()
        .set('state', state.toString())
    });
  }

  isProcessingStarted(): Observable<any> {
    return this.http.get('//localhost:8080/operations/isProcessingStarted');
  }

  stopProcessing(): Observable<any> {
    return this.http.get('//localhost:8080/operations/stopProcessing');
  }

  startProcessing(): Observable<any> {
    return this.http.get('//localhost:8080/operations/startProcessing');
  }

  createOperationBatch(batchSize?: number): Observable<any> {
    return this.http.get('//localhost:8080/operations/createOperationBatch');
  }
}
