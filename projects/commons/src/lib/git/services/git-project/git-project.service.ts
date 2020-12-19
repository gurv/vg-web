import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventBusService } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service';
import { GitConfiguration } from 'projects/commons/src/lib/git/entities/git-configuration';
import { GitStatusEvent } from 'projects/commons/src/lib/git/entities/git-status-event';
import { ReloadEventSourceEvent } from 'projects/commons/src/lib/sse/entities/reload-event-source-event';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { GitConfigurationService } from '../git-configuration/git-configuration.service';

@Injectable({
  providedIn: 'root',
})
export class GitProjectService {
  public readonly configurationSubject: BehaviorSubject<GitConfiguration>;

  constructor(
    private http: HttpClient,
    private gitConfigurationService: GitConfigurationService,
    private eventBus: EventBusService,
  ) {
    this.configurationSubject = new BehaviorSubject(null);
  }

  public connect(repositoryUrl: string): Observable<GitConfiguration> {
    return this.http
      .post<GitConfiguration>(this.gitConfigurationService.projectApiUrl('/connect'), null, {
        params: {
          repositoryUrl,
        },
      })
      .pipe(
        tap((configuration) => {
          this.configurationSubject.next(configuration);
          this.eventBus.publish(new ReloadEventSourceEvent());
        }),
      );
  }

  public configuration(): Observable<GitConfiguration> {
    return of({ repositoryUrl: '' });
    // return this.http.get<GitConfiguration>(this.gitConfigurationService.projectApiUrl('/configuration'))
    //   .pipe(tap(configuration => this.configurationSubject.next(configuration)));
  }

  public disconnect(): Observable<void> {
    return this.http.delete<void>(this.gitConfigurationService.projectApiUrl('/disconnect')).pipe(
      finalize(() => {
        this.configurationSubject.next(null);
        this.eventBus.publish(new ReloadEventSourceEvent());
        this.eventBus.publish(
          new GitStatusEvent({
            branch: {
              oid: '',
              head: '',
              behind: 0,
              ahead: 0,
              upstream: '',
            },
            changed: [],
            renamedCopied: [],
            unmerged: [],
            untracked: [],
            ignored: [],
          }),
        );
      }),
    );
  }

  public isConnected(): boolean {
    const config = this.configurationSubject.getValue();
    return !!config && !!config.repositoryUrl;
  }
}
