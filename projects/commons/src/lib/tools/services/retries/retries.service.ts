import { Injectable } from '@angular/core';
import { Retry } from 'projects/commons/src/lib/tools/entities/retry';

@Injectable({
  providedIn: 'root',
})
export class RetriesService {
  get() {
    return new Retry();
  }
}
