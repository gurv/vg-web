import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CoreTestModule } from 'projects/commons/src/lib/core/core.module.spec';
import { testGitConfiguration } from 'projects/commons/src/lib/git/entities/git-configuration.spec';
import { BehaviorSubject } from 'rxjs';
import { GitConfigurationService } from '../git-configuration/git-configuration.service';
import { gitConfigurationServiceSpy } from '../git-configuration/git-configuration.service.spec';
import { GitProjectService } from './git-project.service';

export const gitProjectServiceSpy = () => {
  // eslint-disable-next-line jasmine/no-unsafe-spy
  const spy = jasmine.createSpyObj('GitProjectService', [
    'connect',
    'configuration',
    'disconnect',
    'isConnected',
  ]);
  spy.configurationSubject = new BehaviorSubject(testGitConfiguration());
  return spy;
};

describe('GitProjectService', () => {
  let service: GitProjectService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreTestModule],
      providers: [
        { provide: GitConfigurationService, useValue: gitConfigurationServiceSpy() },
        GitProjectService,
      ],
    });
    service = TestBed.inject(GitProjectService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should connect', () => {
    expect(service.isConnected()).toBeFalse();
    const config = testGitConfiguration();
    service.connect(config.repositoryUrl).subscribe(
      // eslint-disable-next-line jasmine/new-line-before-expect
      (data) => expect(data).toBe(config),
      () => fail('connect failed'),
    );
    const request = httpTestingController.expectOne(
      'projectApiUrl/project/connect?repositoryUrl=repositoryUrl',
    );

    expect(request.request.method).toBe('POST');

    request.flush(config);

    expect(service.configurationSubject.getValue()).toBe(config);
    expect(service.isConnected()).toBeTrue();
  });

  // TODO
  // it('should return configuration', () => {
  //   const config = testGitConfiguration();
  //   service.configuration().subscribe(
  //     // eslint-disable-next-line jasmine/new-line-before-expect
  //     (data) => expect(data).toBe(config),
  //     () => fail('connect failed'),
  //   );
  //   const request = httpTestingController.expectOne('projectApiUrl/project/configuration');

  //   expect(request.request.method).toBe('GET');

  //   request.flush(config);

  //   expect(service.configurationSubject.getValue()).toBe(config);
  // });

  it('should disconnect', () => {
    service.configurationSubject.next(testGitConfiguration());
    service.disconnect().subscribe();
    const request = httpTestingController.expectOne('projectApiUrl/project/disconnect');

    expect(request.request.method).toBe('DELETE');

    request.flush('');

    expect(service.configurationSubject.getValue()).toBeNull();
  });
});
