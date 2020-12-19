import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import * as _ from 'lodash';
import { ErrorInterceptor } from 'projects/commons/src/lib/config/services/error-interceptor/error-interceptor.service';
import { EventBusService } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service';
import { GitLogEvent } from 'projects/commons/src/lib/git/entities/git-log-event';
import { GitStatus } from 'projects/commons/src/lib/git/entities/git-status';
import { GitStatusEvent } from 'projects/commons/src/lib/git/entities/git-status-event';
import { BehaviorSubject, Observable, ReplaySubject, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { GitConfigurationService } from '../git-configuration/git-configuration.service';

@Injectable()
export class GitCommandService implements OnDestroy {
  public readonly statusSubject: BehaviorSubject<GitStatus>;
  public readonly logsSubject: ReplaySubject<string>;
  private subscriptions: Subscription[] = [];

  constructor(
    private http: HttpClient,
    private gitConfigurationService: GitConfigurationService,
    private eventBus: EventBusService,
  ) {
    this.statusSubject = new BehaviorSubject(null);
    this.logsSubject = new ReplaySubject<string>(10);

    this.subscriptions.push(
      this.eventBus
        .of<GitStatusEvent>(GitStatusEvent.CHANNEL)
        .pipe(map((event) => event.status))
        .subscribe((data) => this.statusSubject.next(data)),
    );
    this.subscriptions.push(
      this.eventBus
        .of<GitLogEvent>(GitLogEvent.CHANNEL)
        .pipe(map((event) => event.text))
        .subscribe((data) => this.logsSubject.next(data)),
    );
  }

  ngOnDestroy() {
    _.invokeMap(this.subscriptions, 'unsubscribe');
  }

  public execute(command: string): Observable<void> {
    const headers = new HttpHeaders().set(ErrorInterceptor.DISABLE_NOTIFICATION_HEADER, 'true');
    return this.http.post<void>(this.gitConfigurationService.commandApiUrl('/execute'), command, {
      headers,
    });
  }

  public status(): Observable<GitStatus> {
    return this.http
      .get<GitStatus>(this.gitConfigurationService.commandApiUrl('/status'))
      .pipe(tap((status) => this.statusSubject.next(status)));
  }
}
