import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ControlMessagesComponent } from './control-messages.component';

describe('ControlMessagesComponent', () => {
  let component: ControlMessagesComponent;
  let fixture: ComponentFixture<ControlMessagesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ControlMessagesComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TODO TypeError: Cannot read property 'errors' of undefined
  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
