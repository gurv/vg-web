import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CurrentProjectService } from './current-project.service';
import { ConfigurationService } from 'projects/commons/src/lib/config/services/configuration/configuration.service';
import { configurationServiceSpy } from 'projects/commons/src/lib/config/services/configuration/configuration.service.spec';
import { CoreTestModule } from 'projects/commons/src/lib/core/core.module.spec';
import { Project } from 'projects/commons/src/lib/project/entities/project';
import { testProject } from 'projects/commons/src/lib/project/entities/project.spec';
import { BehaviorSubject } from 'rxjs';

export const currentProjectServiceSpy = () => {
  // eslint-disable-next-line jasmine/no-unsafe-spy
  const spy = jasmine.createSpyObj('CurrentProjectService', ['getProject']);
  spy.currentProject = new BehaviorSubject<Project>(null);
  return spy;
};

describe('CurrentProjectService', () => {
  let service: CurrentProjectService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreTestModule],
      providers: [
        { provide: ConfigurationService, useValue: configurationServiceSpy() },
        CurrentProjectService,
      ],
    });
    service = TestBed.inject(CurrentProjectService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get', () => {
    const project = testProject();
    service.getProject().subscribe(
      // eslint-disable-next-line jasmine/new-line-before-expect
      (data) => expect(data).toBe(project),
      () => fail('get failed'),
    );
    const request = httpTestingController.expectOne('projectApiUrl/project');

    expect(request.request.method).toBe('GET');
    request.flush(project);

    expect(service.currentProject.value).toBe(project);
  });
});
