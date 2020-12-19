import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { VendorsModule } from 'projects/vendors/src/lib/vendors.module';
import { RepositoryUrlInputComponent } from './repository-url-input.component';
import { RepositoryUrlInputModule } from './repository-url-input.module';

export const repositoryUrlInputComponentSpy = () => {
  // eslint-disable-next-line jasmine/no-unsafe-spy
  const spy = jasmine.createSpyObj('RepositoryUrlInputComponent', ['']);
  spy.repositoryUrl = new FormControl('', []);
  return spy;
};

describe('RepositoryUrlInputComponent', () => {
  let component: RepositoryUrlInputComponent;
  let fixture: ComponentFixture<RepositoryUrlInputComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [VendorsModule, RepositoryUrlInputModule],
        providers: [],
      })
        .overrideTemplate(RepositoryUrlInputComponent, '')
        .compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoryUrlInputComponent);
    component = fixture.componentInstance;
    component.formGroup = new FormGroup({});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return repository URL', () => {
    expect(component.repositoryUrl.value).toBe('');
  });
});
