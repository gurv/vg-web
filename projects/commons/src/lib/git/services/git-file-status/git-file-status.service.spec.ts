import { TestBed } from '@angular/core/testing';
import { EventBusService } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service';
import { GitFileStatusEvent } from 'projects/commons/src/lib/git/entities/git-file-status-event';
import { GitStatusEvent } from 'projects/commons/src/lib/git/entities/git-status-event';
import { testGitStatus } from 'projects/commons/src/lib/git/entities/git-status.spec';
import { GitFileStatusService } from './git-file-status.service';

describe('GitFileStatusService', () => {
  let service: GitFileStatusService;
  let eventBus: EventBusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GitFileStatusService);
    eventBus = TestBed.inject(EventBusService);
  });

  afterEach(() => {
    service.ngOnDestroy();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle status event', () => {
    const events = [];
    eventBus
      .of<GitFileStatusEvent>(GitFileStatusEvent.CHANNEL)
      .subscribe((value) => events.push(value));
    eventBus.publish(new GitStatusEvent(testGitStatus()));

    expect(events.length).toBe(5);
    expect(service.getEvent('path')).toBeDefined();

    eventBus.publish(new GitStatusEvent(testGitStatus()));

    expect(events.length).toBe(15);
  });
});
