import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { StorageNode } from 'projects/storage/src/lib/entities/storage-node';
import { StorageConfigurationService } from '../storage-configuration/storage-configuration.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageResolverService implements Resolve<StorageNode[]> {
  constructor(private configuration: StorageConfigurationService, private http: HttpClient) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<StorageNode[]> {
    return this.http.get<StorageNode[]>(this.configuration.storageApiUrl('/list'));
  }
}
