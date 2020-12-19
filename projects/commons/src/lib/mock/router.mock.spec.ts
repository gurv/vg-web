// eslint-disable-next-line jasmine/no-unsafe-spy
export const routerSpy = () => jasmine.createSpyObj('Router', ['navigate']);

// eslint-disable-next-line jasmine/no-unsafe-spy
export const activatedRouteSpy = () => jasmine.createSpyObj('ActivatedRoute', ['']);
