import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { GitConfiguration } from 'projects/commons/src/lib/git/entities/git-configuration';
import { Observable } from 'rxjs';
import { GitProjectService } from '../git-project/git-project.service';

@Injectable({
  providedIn: 'root',
})
export class GitConfigurationResolverService implements Resolve<GitConfiguration> {
  constructor(private gitProject: GitProjectService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GitConfiguration> {
    return this.gitProject.configuration();
  }
}
