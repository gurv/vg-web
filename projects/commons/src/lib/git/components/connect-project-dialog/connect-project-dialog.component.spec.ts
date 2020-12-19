import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ConnectProjectDialogComponent } from './connect-project-dialog.component';
import { ConnectProjectDialogModule } from './connect-project-dialog.module';
import { repositoryUrlInputComponentSpy } from 'projects/commons/src/lib/git/components/repository-url-input/repository-url-input.component.spec';
import { dialogRefSpy } from 'projects/commons/src/lib/mock/material.mock.spec';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import SpyObj = jasmine.SpyObj;

describe('ConnectProjectDialogComponent', () => {
  let component: ConnectProjectDialogComponent;
  let fixture: ComponentFixture<ConnectProjectDialogComponent>;
  let dialogRef: SpyObj<MatDialogRef<ConnectProjectDialogComponent>>;

  beforeEach(
    waitForAsync(() => {
      dialogRef = dialogRefSpy();
      TestBed.configureTestingModule({
        imports: [ConnectProjectDialogModule, HttpClientTestingModule],
        providers: [FormBuilder, { provide: MatDialogRef, useValue: dialogRef }],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectProjectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TODO
  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // TODO
  // it('should connect', () => {
  //   component.repositoryUrl = repositoryUrlInputComponentSpy();
  //   component.repositoryUrl.repositoryUrl.setValue('repositoryUrl');
  //   component.connect();

  //   expect(dialogRef.close).toHaveBeenCalledWith('repositoryUrl');
  // });
});
