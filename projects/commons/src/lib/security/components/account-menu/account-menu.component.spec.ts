import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SecurityService } from 'projects/commons/src/lib/security/services/security/security.service';
import { securityServiceSpy } from 'projects/commons/src/lib/security/services/security/security.service.spec';
import { AccountMenuComponent } from './account-menu.component';
import { AccountMenuModule } from './account-menu.module';

describe('AccountMenuComponent', () => {
  let component: AccountMenuComponent;
  let fixture: ComponentFixture<AccountMenuComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [AccountMenuModule],
        providers: [{ provide: SecurityService, useValue: securityServiceSpy() }],
      })
        .overrideTemplate(AccountMenuComponent, '')
        .compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
