// eslint-disable-next-line jasmine/no-unsafe-spy
export const eventSpy = () => jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);

// eslint-disable-next-line jasmine/no-unsafe-spy
export const eventEmitterSpy = () => jasmine.createSpyObj('EventEmitter', ['emit', 'subscribe']);
