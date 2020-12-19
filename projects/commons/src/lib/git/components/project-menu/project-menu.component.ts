import { Component } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGitAlt } from '@fortawesome/free-brands-svg-icons/faGitAlt';
import { faUnlink } from '@fortawesome/free-solid-svg-icons/faUnlink';
import { GitProjectService } from 'projects/commons/src/lib/git/services/git-project/git-project.service';
import { IconFa } from 'projects/commons/src/lib/icon/entities/icon-fa';
import { MENU_ICON } from 'projects/commons/src/lib/icon/entities/icons';

library.add(faGitAlt, faUnlink);

@Component({
  selector: 'lib-project-menu',
  templateUrl: './project-menu.component.html',
})
export class ProjectMenuComponent {
  readonly menuIcon = MENU_ICON;
  readonly connectIcon = new IconFa(faGitAlt, 'accent');
  readonly disconnectIcon = new IconFa(faUnlink, 'error');

  constructor(public gitProjectService: GitProjectService) { }
}
