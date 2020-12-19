import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ConfigurationService } from 'projects/commons/src/lib/config/services/configuration/configuration.service';
import { configurationServiceSpy } from 'projects/commons/src/lib/config/services/configuration/configuration.service.spec';
import { SSEConfigurationService } from './sse-configuration.service';
import SpyObj = jasmine.SpyObj;

export const sseConfigurationServiceSpy = () => {
  // eslint-disable-next-line jasmine/no-unsafe-spy
  const spy = jasmine.createSpyObj('SSEConfigurationService', ['sseApiUrl', 'sseChannels']);
  spy.sseApiUrl.and.callFake((path = '') => `backendApiUrl/sse${path}`);
  spy.sseChannels.and.returnValue(['STORAGE', 'RUNTIME']);
  return spy;
};

describe('SSEConfigurationService', () => {
  let service: SSEConfigurationService;
  let configuration: SpyObj<ConfigurationService>;

  beforeEach(() => {
    configuration = configurationServiceSpy();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ConfigurationService,
        {
          provide: ConfigurationService,
          useValue: configuration,
        },
      ],
    });
    service = TestBed.inject(SSEConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return sseApiUrl', () => {
    configuration.url.and.returnValue('url');

    expect(service.sseApiUrl('/path')).toBe('url');
    expect(configuration.url).toHaveBeenCalledWith('backendApiUrl', '/sse/path');
  });

  it('should return sseApiUrl no param', () => {
    configuration.url.and.returnValue('url');

    expect(service.sseApiUrl()).toBe('url');
    expect(configuration.url).toHaveBeenCalledWith('backendApiUrl', '/sse');
  });

  it('should return channels no param', () => {
    configuration.value.and.returnValue(['CHANNEL']);

    expect(service.sseChannels()).toEqual(['CHANNEL']);
    expect(configuration.value).toHaveBeenCalledWith('sseChannels');
  });
});
