import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector } from '@angular/core';
import {
  HighlightBackdropComponent, HIGHLIGHT_DURATION_DATA,
  HIGHLIGHT_RECT_DATA
} from 'projects/commons/src/lib/help/components/highlight-backdrop/highlight-backdrop.component';

@Injectable({
  providedIn: 'root',
})
export class HighlightService {
  document = document;
  overlayRef: OverlayRef;

  constructor(private injector: Injector, private overlay: Overlay) {
    this.overlayRef = this.overlay.create({
      width: '100%',
      height: '100%',
    });
  }

  highlight(selector: string, duration = 800) {
    duration = Math.max(duration, 300);
    const element: HTMLElement = this.document.querySelector(selector);
    if (!element) {
      return;
    }
    const rect = element.getBoundingClientRect();
    const portal = new ComponentPortal(
      HighlightBackdropComponent,
      null,
      Injector.create({
        providers: [
          { provide: HIGHLIGHT_RECT_DATA, useValue: rect },
          { provide: HIGHLIGHT_DURATION_DATA, useValue: duration },
        ],
        parent: this.injector,
      }),
    );
    this.overlayRef.attach(portal);
    setTimeout(() => {
      this.overlayRef.detach();
    }, duration);
  }
}
