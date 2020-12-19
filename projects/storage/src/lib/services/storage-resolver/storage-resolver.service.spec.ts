import { TestBed } from '@angular/core/testing';
import { StorageResolverService } from './storage-resolver.service';
import { testStorageNodes } from 'projects/storage/src/lib/entities/storage-node.spec';
import { HttpTestingController } from '@angular/common/http/testing';
import { CoreTestModule } from 'projects/commons/src/lib/core/core.module.spec';
import { StorageConfigurationService } from '../storage-configuration/storage-configuration.service';
import { storageConfigurationServiceSpy } from '../storage-configuration/storage-configuration.service.spec';

describe('StorageResolverService', () => {
  let service: StorageResolverService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreTestModule],
      providers: [
        { provide: StorageConfigurationService, useValue: storageConfigurationServiceSpy() },
      ],
    });
    service = TestBed.inject(StorageResolverService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should list', () => {
    service.resolve(null, null).subscribe(
      // eslint-disable-next-line jasmine/new-line-before-expect
      (value) => expect(value).toEqual(testStorageNodes()),
      () => fail('list failed'),
    );
    const req = httpTestingController.expectOne('backendApiUrl/files/list');

    expect(req.request.method).toEqual('GET');
    req.flush(testStorageNodes());
  });
});
