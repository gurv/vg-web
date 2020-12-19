import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CurrentProjectService } from 'projects/commons/src/lib/git/services/current-project/current-project.service';
import { currentProjectServiceSpy } from 'projects/commons/src/lib/git/services/current-project/current-project.service.spec';
import { CurrentProjectComponent } from './current-project.component';
import { CurrentProjectModule } from './current-project.module';

describe('CurrentProjectComponent', () => {
  let component: CurrentProjectComponent;
  let fixture: ComponentFixture<CurrentProjectComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [CurrentProjectModule],
        providers: [{ provide: CurrentProjectService, useValue: currentProjectServiceSpy() }],
      })
        .overrideTemplate(CurrentProjectComponent, '')
        .compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
