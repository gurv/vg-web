import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { GitUserService } from 'projects/commons/src/lib/git/services/git-user/git-user.service';
import { gitUserServiceSpy } from 'projects/commons/src/lib/git/services/git-user/git-user.service.spec';
import { of } from 'rxjs';
import { SshPublicKeyComponent } from './ssh-public-key.component';
import { SshPublicKeyModule } from './ssh-public-key.module';
import SpyObj = jasmine.SpyObj;

describe('SshPublicKeyComponent', () => {
  let component: SshPublicKeyComponent;
  let fixture: ComponentFixture<SshPublicKeyComponent>;
  let gitUserService: SpyObj<GitUserService>;

  beforeEach(
    waitForAsync(() => {
      gitUserService = gitUserServiceSpy();
      gitUserService.publicKey.and.returnValue(of('publicKey'));
      TestBed.configureTestingModule({
        imports: [NoopAnimationsModule, SshPublicKeyModule],
        providers: [{ provide: GitUserService, useValue: gitUserService }],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SshPublicKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.publicKey).toBeDefined();
  });
});
