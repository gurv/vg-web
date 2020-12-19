import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { SecurityService } from './services/security/security.service';
import { SecurityConfigurationService } from './services/security-configuration/security-configuration.service';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class SecurityGuard implements CanActivate, CanLoad {
  constructor(
    private security: SecurityService,
    private securityConfig: SecurityConfigurationService,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.can();
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.can();
  }

  private can(): Observable<boolean> {
    return this.security.init().pipe(
      mergeMap((authenticated) => {
        if (!authenticated) {
          return this.security.login().pipe(map(() => false));
        } else if (!_.intersection(this.securityConfig.expectedRole, this.security.roles).length) {
          return this.security.logout().pipe(map(() => false));
        }
        return of(true);
      }),
    );
  }
}
