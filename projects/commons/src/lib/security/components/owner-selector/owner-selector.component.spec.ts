import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { Owner } from 'projects/commons/src/lib/security/entities/owner';
import { testPublicOwner } from 'projects/commons/src/lib/security/entities/owner.spec';
import { OwnerSelectorComponent } from './owner-selector.component';
import { OwnerSelectorModule } from './owner-selector.module';

describe('OwnerSelectorComponent', () => {
  let component: OwnerSelectorComponent;
  let fixture: ComponentFixture<OwnerSelectorComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [OwnerSelectorModule],
      })
        .overrideTemplate(OwnerSelectorComponent, '')
        .compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerSelectorComponent);
    component = fixture.componentInstance;
    component.formGroup = new FormGroup({});
    component._owner = testPublicOwner();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return public owner', () => {
    expect(component.owner).toEqual(testPublicOwner());
  });

  it('should return application owner', () => {
    component.type.setValue('APPLICATION');
    component.typeSelected('APPLICATION');
    component.applicationId.setValue('applicationId');

    expect(component.owner).toEqual(new Owner('', '', 'applicationId', 'APPLICATION'));
  });

  it('should return user owner', () => {
    component.type.setValue('USER');
    component.typeSelected('USER');
    component.applicationId.setValue('applicationId');
    component.userId.setValue('userId');

    expect(component.owner).toEqual(new Owner('userId', '', 'applicationId', 'USER'));
  });
});
