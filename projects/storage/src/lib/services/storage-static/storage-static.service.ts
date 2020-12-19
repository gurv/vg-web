import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SecurityService } from 'projects/commons/src/lib/security/services/security/security.service';
import { WindowService } from 'projects/commons/src/lib/tools/services/window/window.service';
import { StorageNode } from 'projects/storage/src/lib/entities/storage-node';
import { StorageConfigurationService } from '../storage-configuration/storage-configuration.service';
import { map } from 'rxjs/operators';

@Injectable()
export class StorageStaticService {
  constructor(
    private window: WindowService,
    private cookies: CookieService,
    private security: SecurityService,
    private storageConfiguration: StorageConfigurationService,
  ) { }

  public openStaticPage(path: string) {
    this.openUrl(this.storageConfiguration.storageApiUrl(`/static/${path}`));
  }

  public openDownloadLink(node?: StorageNode) {
    const path = node ? node.path : '';
    this.openUrl(this.storageConfiguration.storageApiUrl(`/static/${path}`));
  }

  private openUrl(path: string) {
    this.window.open(
      this.security.token.pipe(
        map((token) => {
          this.cookies.delete('JWT');
          this.cookies.set('JWT', token, null, '/', null, false, 'Lax');
          return path;
        }),
      ),
    );
  }
}
