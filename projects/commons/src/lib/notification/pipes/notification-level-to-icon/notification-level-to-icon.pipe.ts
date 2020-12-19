import { Pipe, PipeTransform } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons/faExclamationCircle';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons/faInfoCircle';
import { Icon } from 'projects/commons/src/lib/icon/entities/icon';
import { IconFa } from 'projects/commons/src/lib/icon/entities/icon-fa';
import { NotificationLevel } from 'projects/commons/src/lib/notification/entities/notification-level';

library.add(faExclamationCircle, faExclamationTriangle, faInfoCircle);

@Pipe({
  name: 'notificationLevelToIcon',
})
export class NotificationLevelToIconPipe implements PipeTransform {
  private static readonly LEVEL_ICONS: { [key in NotificationLevel]: Icon } = {
    INFO: new IconFa(faInfoCircle, 'info'),
    WARNING: new IconFa(faExclamationCircle, 'warn'),
    ERROR: new IconFa(faExclamationTriangle, 'error'),
  };

  transform(level: NotificationLevel): Icon {
    return NotificationLevelToIconPipe.LEVEL_ICONS[level];
  }
}
