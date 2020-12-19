import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { Overlay } from '@angular/cdk/overlay';
import { HighlightService } from './highlight.service';
import { HighlightModule } from '../../directives/highlight/highlight.module';
import { HighlightOverModule } from '../../directives/highlight-over/highlight-over.module';

// eslint-disable-next-line jasmine/no-unsafe-spy
export const highlightServiceSpy = () => jasmine.createSpyObj('HighlightService', ['highlight']);

describe('HighlightService', () => {
  let overlay;
  let overlayRef;
  let document;
  let element;
  const rect = { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };

  beforeEach(() => {
    overlay = jasmine.createSpyObj('overlay', ['create']);
    overlayRef = jasmine.createSpyObj('overlayRef', ['attach', 'detach']);
    document = jasmine.createSpyObj('document', ['querySelector']);
    element = jasmine.createSpyObj('element', ['getBoundingClientRect']);
    overlay.create.and.returnValue(overlayRef);
    document.querySelector.and.returnValue(element);
    element.getBoundingClientRect.and.returnValue(rect);
    TestBed.configureTestingModule({
      imports: [HighlightModule, HighlightOverModule],
      providers: [{ provide: Overlay, useValue: overlay }],
    });
  });

  it('should be created', inject([HighlightService], (service: HighlightService) => {
    expect(service).toBeTruthy();
    expect(service.overlayRef).toBe(overlayRef);
  }));

  it('should highlight default duration', fakeAsync(() => {
    const highlightService = TestBed.inject(HighlightService);
    highlightService.document = document;
    highlightService.highlight('someShit');

    // eslint-disable-next-line jasmine/prefer-toHaveBeenCalledWith
    expect(overlayRef.attach).toHaveBeenCalled();
    expect(overlayRef.detach).not.toHaveBeenCalled();

    tick(801);

    expect(overlayRef.detach).toHaveBeenCalledWith();
  }));

  it('should highlight custom duration', fakeAsync(() => {
    const highlightService = TestBed.inject(HighlightService);
    highlightService.document = document;
    highlightService.highlight('someShit', 200);

    // eslint-disable-next-line jasmine/prefer-toHaveBeenCalledWith
    expect(overlayRef.attach).toHaveBeenCalled();
    expect(overlayRef.detach).not.toHaveBeenCalled();

    tick(201);

    expect(overlayRef.detach).not.toHaveBeenCalled();

    tick(100); // min 300 ms

    // eslint-disable-next-line jasmine/prefer-toHaveBeenCalledWith
    expect(overlayRef.detach).toHaveBeenCalled();
  }));

  it('should not highlight', () => {
    const highlightService = TestBed.inject(HighlightService);
    highlightService.document = document;
    document.querySelector.and.returnValue(null);
    highlightService.highlight('someShit', 200);

    expect(overlayRef.attach).not.toHaveBeenCalled();
  });
});
