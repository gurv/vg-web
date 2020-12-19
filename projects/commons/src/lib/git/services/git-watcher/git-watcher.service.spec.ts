import { TestBed } from '@angular/core/testing';
import { CoreTestModule } from 'projects/commons/src/lib/core/core.module.spec';
import { EventBusService } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service';
import { GitLogEvent } from 'projects/commons/src/lib/git/entities/git-log-event';
import { testGitLog } from 'projects/commons/src/lib/git/entities/git-log.spec';
import { GitRefreshStorageEvent } from 'projects/commons/src/lib/git/entities/git-refresh-storage-event';
import { GitStatusEvent } from 'projects/commons/src/lib/git/entities/git-status-event';
import { testGitStatus } from 'projects/commons/src/lib/git/entities/git-status.spec';
import { testUserOwner } from 'projects/commons/src/lib/security/entities/owner.spec';
import { SSEEvent } from 'projects/commons/src/lib/sse/entities/sse-event';
import { GitWatcherService } from './git-watcher.service';

describe('GitWatcherService', () => {
  let service: GitWatcherService;
  let eventBus: EventBusService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreTestModule],
      providers: [EventBusService, GitWatcherService],
    });
    eventBus = TestBed.inject(EventBusService);
    service = TestBed.inject(GitWatcherService);
  });

  afterEach(() => {
    service.ngOnDestroy();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle git log event', () => {
    const spy = spyOn(eventBus, 'publish').and.callThrough();
    eventBus.publish(new SSEEvent({ type: 'GIT_LOG', value: testGitLog() }));

    expect(spy).toHaveBeenCalledWith(new GitLogEvent(testGitLog().text));
  });

  it('should handle git status event', () => {
    const spy = spyOn(eventBus, 'publish').and.callThrough();
    eventBus.publish(new SSEEvent({ type: 'GIT_STATUS', value: testGitStatus() }));

    expect(spy).toHaveBeenCalledWith(new GitStatusEvent(testGitStatus()));
  });

  it('should handle git refresh event', () => {
    const spy = spyOn(eventBus, 'publish').and.callThrough();
    eventBus.publish(new SSEEvent({ type: 'GIT_REFRESH', value: { owner: testUserOwner() } }));

    expect(spy).toHaveBeenCalledWith(new GitRefreshStorageEvent());
  });
});
