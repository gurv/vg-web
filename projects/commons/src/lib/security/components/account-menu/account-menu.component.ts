import { Component } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { IconFa } from 'projects/commons/src/lib/icon/entities/icon-fa';
import { MENU_ICON } from 'projects/commons/src/lib/icon/entities/icons';
import { SecurityService } from 'projects/commons/src/lib/security/services/security/security.service';

library.add(faSignOutAlt, faUser);

@Component({
  selector: 'lib-account-menu',
  templateUrl: './account-menu.component.html',
})
export class AccountMenuComponent {
  readonly menuIcon = MENU_ICON;
  readonly accountIcon = new IconFa(faUser);
  readonly logoutIcon = new IconFa(faSignOutAlt);

  constructor(public security: SecurityService) { }
}
