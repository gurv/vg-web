import { EventBusService } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service';
import { eventBusSpy } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service.spec';
import { GuiToolsService } from 'projects/commons/src/lib/tools/services/gui-tools/gui-tools.service';
import { guiToolsServiceSpy } from 'projects/commons/src/lib/tools/services/gui-tools/gui-tools.service.spec';
import { CopyToClipboardDirective } from './copy-to-clipboard.directive';
import SpyObj = jasmine.SpyObj;

describe('CopyToClipboardDirective', () => {
  let directive: CopyToClipboardDirective;
  let guiTools: SpyObj<GuiToolsService>;
  let events: SpyObj<EventBusService>;

  beforeEach(() => {
    guiTools = guiToolsServiceSpy();
    events = eventBusSpy();
    directive = new CopyToClipboardDirective(guiTools, events);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should copy to clipboard', () => {
    directive.onClick();

    // eslint-disable-next-line jasmine/prefer-toHaveBeenCalledWith
    expect(guiTools.copyToClipboard).toHaveBeenCalled();
    // eslint-disable-next-line jasmine/prefer-toHaveBeenCalledWith
    expect(events.publish).toHaveBeenCalled();
  });
});
