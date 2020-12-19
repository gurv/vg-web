import { EventBusService } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service';
import { HelpService } from './services/help/help.service';
import { HelpModule } from './help.module';

describe('HelpModule', () => {
  let helpModule: HelpModule;

  beforeEach(() => {
    helpModule = new HelpModule(new HelpService(new EventBusService()));
  });

  it('should create an instance', () => {
    expect(helpModule).toBeTruthy();
    expect(helpModule.helpService).toBeTruthy();
  });
});
