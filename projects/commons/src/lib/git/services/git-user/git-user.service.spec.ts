import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CoreTestModule } from 'projects/commons/src/lib/core/core.module.spec';
import { GitUserService } from './git-user.service';
import { GitConfigurationService } from '../git-configuration/git-configuration.service';
import { gitConfigurationServiceSpy } from '../git-configuration/git-configuration.service.spec';
import { BehaviorSubject } from 'rxjs';

export const gitUserServiceSpy = () => {
  // eslint-disable-next-line jasmine/no-unsafe-spy
  const spy = jasmine.createSpyObj('GitUserService', ['publicKey']);
  spy.publicKeySubject = new BehaviorSubject('');
  return spy;
};

describe('GitUserService', () => {
  let service: GitUserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreTestModule],
      providers: [
        { provide: GitConfigurationService, useValue: gitConfigurationServiceSpy() },
        GitUserService,
      ],
    });
    service = TestBed.inject(GitUserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return public key', () => {
    const publicKey = 'test';
    service.publicKey().subscribe(
      // eslint-disable-next-line jasmine/new-line-before-expect
      (data) => expect(data).toBe(publicKey),
      () => fail('publicKey failed'),
    );
    const request = httpTestingController.expectOne('userApiUrl/user/publicKey');

    expect(request.request.method).toBe('GET');
    request.flush(publicKey);
  });
});
