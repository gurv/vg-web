import { TestBed } from '@angular/core/testing';
import { CookieService } from 'ngx-cookie-service';
import { ConfigurationService } from 'projects/commons/src/lib/config/services/configuration/configuration.service';
import { configurationServiceMock } from 'projects/commons/src/lib/config/services/configuration/configuration.service.spec';
import { CoreTestModule } from 'projects/commons/src/lib/core/core.module.spec';
import { cookiesServiceSpy } from 'projects/commons/src/lib/mock/cookies.mock.spec';
import { SecurityService } from 'projects/commons/src/lib/security/services/security/security.service';
import { securityServiceSpy } from 'projects/commons/src/lib/security/services/security/security.service.spec';
import { WindowService } from 'projects/commons/src/lib/tools/services/window/window.service';
import { windowServiceSpy } from 'projects/commons/src/lib/tools/services/window/window.service.spec';
import { testStorageDirectoryNode } from 'projects/storage/src/lib/entities/storage-node.spec';
import { StorageConfigurationService } from '../storage-configuration/storage-configuration.service';
import { storageConfigurationServiceSpy } from '../storage-configuration/storage-configuration.service.spec';
import { StorageStaticService } from './storage-static.service';
import { of } from 'rxjs';
import SpyObj = jasmine.SpyObj;

export const storageStaticServiceSpy = () => {
  // eslint-disable-next-line jasmine/no-unsafe-spy
  const spy = jasmine.createSpyObj('StorageStaticService', ['openStaticPage']);
  return spy;
};

describe('StorageStaticService', () => {
  let service: StorageStaticService;
  let window: SpyObj<WindowService>;
  let cookies: SpyObj<CookieService>;
  let securityService: SpyObj<SecurityService>;
  let storageConfiguration: SpyObj<StorageConfigurationService>;
  let configuration: ConfigurationService;

  beforeEach(() => {
    window = windowServiceSpy();
    cookies = cookiesServiceSpy();
    securityService = securityServiceSpy();
    storageConfiguration = storageConfigurationServiceSpy();
    configuration = configurationServiceMock();

    TestBed.configureTestingModule({
      imports: [CoreTestModule],
      providers: [
        { provide: WindowService, useValue: window },
        { provide: CookieService, useValue: cookies },
        { provide: SecurityService, useValue: securityService },
        { provide: StorageConfigurationService, useValue: storageConfiguration },
        { provide: ConfigurationService, useValue: configuration },
        StorageStaticService,
      ],
    });
    service = TestBed.inject(StorageStaticService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open static page', () => {
    (securityService as any).token = of('token');
    window.open.and.callFake((url) =>
      // eslint-disable-next-line jasmine/new-line-before-expect
      url.subscribe((value) => expect(value).toEqual('backendApiUrl/files/static/path')),
    );
    service.openStaticPage('path');

    // eslint-disable-next-line jasmine/prefer-toHaveBeenCalledWith
    expect(window.open).toHaveBeenCalled();
    expect(cookies.delete).toHaveBeenCalledWith('JWT');
    expect(cookies.set as any).toHaveBeenCalledWith('JWT', 'token', null, '/', null, false, 'Lax');
  });

  it('should open download link', () => {
    const node = testStorageDirectoryNode();
    (securityService as any).token = of('token');
    window.open.and.callFake((url) =>
      // eslint-disable-next-line jasmine/new-line-before-expect
      url.subscribe((value) => expect(value).toEqual('backendApiUrl/files/static/' + node.path)),
    );
    service.openDownloadLink(node);

    // eslint-disable-next-line jasmine/prefer-toHaveBeenCalledWith
    expect(window.open).toHaveBeenCalled();
    expect(cookies.delete).toHaveBeenCalledWith('JWT');
    expect(cookies.set as any).toHaveBeenCalledWith('JWT', 'token', null, '/', null, false, 'Lax');
    expect(storageConfiguration.storageApiUrl).toHaveBeenCalledWith('/static/' + node.path);
  });

  it('should open download link no node', () => {
    (securityService as any).token = of('token');
    window.open.and.callFake((url) =>
      // eslint-disable-next-line jasmine/new-line-before-expect
      url.subscribe((value) => expect(value).toEqual('backendApiUrl/files/static/')),
    );
    service.openDownloadLink();

    // eslint-disable-next-line jasmine/prefer-toHaveBeenCalledWith
    expect(window.open).toHaveBeenCalled();
    expect(cookies.delete).toHaveBeenCalledWith('JWT');
    expect(cookies.set as any).toHaveBeenCalledWith('JWT', 'token', null, '/', null, false, 'Lax');
    expect(storageConfiguration.storageApiUrl).toHaveBeenCalledWith('/static/');
  });
});
