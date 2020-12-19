import { WeatherModule } from 'projects/weather/src/lib/weather.module';

describe('WeatherModule', () => {
  let layoutModule: WeatherModule;

  beforeEach(() => {
    layoutModule = new WeatherModule();
  });

  it('should create an instance', () => {
    expect(layoutModule).toBeTruthy();
  });
});
