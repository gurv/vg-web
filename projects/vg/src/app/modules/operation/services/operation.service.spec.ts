import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { OperationService } from './operation.service';

describe('OperationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OperationService]
    });
  });

  it('should be created', inject([OperationService], (service: OperationService) => {
    expect(service).toBeTruthy();
  }));
});
