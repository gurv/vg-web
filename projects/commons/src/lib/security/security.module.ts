import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SecurityInterceptor } from './services/security-interceptor/security-interceptor.service';
import { AccountMenuModule } from './components/account-menu/account-menu.module';
import { OwnerSelectorModule } from './components/owner-selector/owner-selector.module';
import { OwnerToStringModule } from './pipes/owner-to-string/owner-to-string.module';

@NgModule({
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: SecurityInterceptor, multi: true }],
  imports: [CommonModule, AccountMenuModule, OwnerSelectorModule, OwnerToStringModule],
  exports: [AccountMenuModule, OwnerSelectorModule, OwnerToStringModule],
})
export class SecurityModule {}
