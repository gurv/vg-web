import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CoreTestModule } from 'projects/commons/src/lib/core/core.module.spec';
import { EventBusService } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service';
import { GitLogEvent } from 'projects/commons/src/lib/git/entities/git-log-event';
import { GitStatusEvent } from 'projects/commons/src/lib/git/entities/git-status-event';
import { testGitStatus } from 'projects/commons/src/lib/git/entities/git-status.spec';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { GitConfigurationService } from '../git-configuration/git-configuration.service';
import { gitConfigurationServiceSpy } from '../git-configuration/git-configuration.service.spec';
import { GitCommandService } from './git-command.service';

export const gitCommandServiceSpy = () => {
  // eslint-disable-next-line jasmine/no-unsafe-spy
  const spy = jasmine.createSpyObj('GitCommandService', ['execute', 'status']);
  spy.statusSubject = new BehaviorSubject(null);
  spy.logsSubject = new ReplaySubject<string>(10);
  return spy;
};

describe('GitCommandService', () => {
  let service: GitCommandService;
  let httpTestingController: HttpTestingController;
  let eventBus: EventBusService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreTestModule],
      providers: [
        { provide: GitConfigurationService, useValue: gitConfigurationServiceSpy() },
        EventBusService,
        GitCommandService,
      ],
    });
    eventBus = TestBed.inject(EventBusService);
    service = TestBed.inject(GitCommandService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
    service.ngOnDestroy();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should execute', () => {
    const command = 'git pull';
    service.execute(command).subscribe();
    const request = httpTestingController.expectOne('commandApiUrl/command/execute');

    expect(request.request.method).toBe('POST');
    request.flush(null);
  });

  it('should get status', () => {
    const status = testGitStatus();
    service.status().subscribe();
    const request = httpTestingController.expectOne('commandApiUrl/command/status');

    expect(request.request.method).toBe('GET');

    request.flush(status);

    expect(service.statusSubject.getValue()).toBe(status);
  });

  it('should update status', () => {
    const status = testGitStatus();
    eventBus.publish(new GitStatusEvent(status));

    expect(service.statusSubject.getValue()).toBe(status);
  });

  it('should update log', () => {
    const logs = [];
    service.logsSubject.subscribe((value) => logs.push(value));
    eventBus.publish(new GitLogEvent('text'));

    expect(logs).toEqual(['text']);
  });
});
