import { configurationServiceMock } from 'projects/commons/src/lib/config/services/configuration/configuration.service.spec';
import { helpServiceSpy } from 'projects/commons/src/lib/help/services/help/help.service.spec';
import { windowServiceSpy } from 'projects/commons/src/lib/tools/services/window/window.service.spec';
import { OpenHelpExtDirective } from './open-help-ext.directive';

describe('OpenHelpExtDirective', () => {
  it('should fire event on click', () => {
    const window = windowServiceSpy();
    const configuration = configurationServiceMock();
    const helpService = helpServiceSpy();
    const directive = new OpenHelpExtDirective(window, configuration, helpService);

    expect(directive).toBeTruthy();

    directive.page = 'HOME';
    directive.open();

    // eslint-disable-next-line jasmine/prefer-toHaveBeenCalledWith
    expect(window.open).toHaveBeenCalled();
  });
});
