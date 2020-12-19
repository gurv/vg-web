import { TestBed } from '@angular/core/testing';
import { CurrentProjectResolverService } from 'projects/commons/src/lib/git/services/current-project-resolver/current-project-resolver.service';
import { CurrentProjectService } from 'projects/commons/src/lib/git/services/current-project/current-project.service';
import { currentProjectServiceSpy } from 'projects/commons/src/lib/git/services/current-project/current-project.service.spec';
import { testProject } from 'projects/commons/src/lib/project/entities/project.spec';
import { of } from 'rxjs';

import SpyObj = jasmine.SpyObj;

describe('CurrentProjectResolverService', () => {
  let service: CurrentProjectResolverService;
  let currentProjectService: SpyObj<CurrentProjectService>;

  beforeEach(() => {
    currentProjectService = currentProjectServiceSpy();
    TestBed.configureTestingModule({
      providers: [{ provide: CurrentProjectService, useValue: currentProjectService }],
    });
    service = TestBed.inject(CurrentProjectResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should resolve', () => {
    const project = of(testProject());
    currentProjectService.getProject.and.returnValue(project);

    expect(service.resolve(null, null)).toBe(project);
  });
});
