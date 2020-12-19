import { TestBed } from '@angular/core/testing';
import { testGitConfiguration } from 'projects/commons/src/lib/git/entities/git-configuration.spec';
import { of } from 'rxjs';
import { GitConfigurationResolverService } from '../git-configuration-resolver/git-configuration-resolver.service';
import { GitProjectService } from '../git-project/git-project.service';
import { gitProjectServiceSpy } from '../git-project/git-project.service.spec';
import SpyObj = jasmine.SpyObj;

describe('GitConfigurationResolverService', () => {
  let service: GitConfigurationResolverService;
  let gitProjectService: SpyObj<GitProjectService>;

  beforeEach(() => {
    gitProjectService = gitProjectServiceSpy();
    TestBed.configureTestingModule({
      providers: [{ provide: GitProjectService, useValue: gitProjectService }],
    });
    service = TestBed.inject(GitConfigurationResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should resolve', () => {
    const config = of(testGitConfiguration());
    gitProjectService.configuration.and.returnValue(config);

    expect(service.resolve(null, null)).toBe(config);
  });
});
