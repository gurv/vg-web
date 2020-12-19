import { Directive, HostListener, Input } from '@angular/core';
import { EventBusService } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service';
import { BaseNotification } from 'projects/commons/src/lib/notification/entities/base-notification';
import { NotificationEvent } from 'projects/commons/src/lib/notification/entities/notification-event';
import { NotificationLevel } from 'projects/commons/src/lib/notification/entities/notification-level';
import { GuiToolsService } from 'projects/commons/src/lib/tools/services/gui-tools/gui-tools.service';

@Directive({
  selector: '[libCopyToClipboard]',
})
export class CopyToClipboardDirective {
  @Input('libCopyToClipboard') text: string;

  constructor(private guiTools: GuiToolsService, private events: EventBusService) { }

  @HostListener('click') onClick() {
    this.guiTools.copyToClipboard(this.text);
    this.events.publish(
      new NotificationEvent(
        new BaseNotification(`Text copied to clipboard.`, NotificationLevel.INFO),
      ),
    );
  }
}
