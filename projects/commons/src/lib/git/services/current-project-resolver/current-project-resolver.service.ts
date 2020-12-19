import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { CurrentProjectService } from '../current-project/current-project.service';
import { Project } from 'projects/commons/src/lib/project/entities/project';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrentProjectResolverService implements Resolve<Project> {
  constructor(private currentProjectService: CurrentProjectService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Project> {
    return this.currentProjectService.getProject();
  }
}
