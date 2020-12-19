import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { faBroom } from '@fortawesome/free-solid-svg-icons/faBroom';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons/faFileAlt';
import { EditorDialogService } from 'projects/commons/src/lib/dialog/services/editor-dialog/editor-dialog.service';
import { IconFa } from 'projects/commons/src/lib/icon/entities/icon-fa';
import { ErrorNotification } from 'projects/commons/src/lib/notification/entities/error-notification';
import { Notification } from 'projects/commons/src/lib/notification/entities/notification';
import { NotificationService } from 'projects/commons/src/lib/notification/services/notification/notification.service';
import { Observable } from 'rxjs';

library.add(faEye, faQuestionCircle, faFileAlt, faBroom);

class NotificationsDataSource implements DataSource<Notification> {
  constructor(public notificationsService: NotificationService) { }

  connect(collectionViewer: CollectionViewer): Observable<Notification[]> {
    return this.notificationsService.notificationsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void { }
}

@Component({
  selector: 'lib-notifications-table',
  templateUrl: './notifications-table.component.html',
  styleUrls: ['./notifications-table.component.scss'],
})
export class NotificationsTableComponent {
  readonly highlightIcon = new IconFa(faEye);
  readonly traceIcon = new IconFa(faFileAlt);
  readonly clearIcon = new IconFa(faBroom);
  readonly openHelpIcon = new IconFa(faQuestionCircle);
  readonly displayedColumns: string[] = ['level', 'message', 'highlight', 'help'];

  dataSource: NotificationsDataSource;

  constructor(
    public notificationsService: NotificationService,
    private dialogs: EditorDialogService,
  ) {
    this.dataSource = new NotificationsDataSource(notificationsService);
  }

  openTrace(notification: ErrorNotification) {
    this.dialogs.logs(notification.message, notification.trace);
  }
}
