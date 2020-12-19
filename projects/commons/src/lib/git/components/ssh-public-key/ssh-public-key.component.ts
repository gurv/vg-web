import { Component } from '@angular/core';
import { GitUserService } from 'projects/commons/src/lib/git/services/git-user/git-user.service';
import { CLIPBOARD_ICON } from 'projects/commons/src/lib/icon/entities/icons';

@Component({
  selector: 'lib-ssh-public-key',
  templateUrl: './ssh-public-key.component.html',
  styleUrls: ['./ssh-public-key.component.scss'],
})
export class SshPublicKeyComponent {
  readonly copyToClipboardIcon = CLIPBOARD_ICON;

  publicKey: string;
  panelOpenState = false;

  constructor(gitUserService: GitUserService) {
    gitUserService.publicKey().subscribe((value) => (this.publicKey = value));
  }
}
