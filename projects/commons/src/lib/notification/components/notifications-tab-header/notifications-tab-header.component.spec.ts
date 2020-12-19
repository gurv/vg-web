import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CoreTestModule } from 'projects/commons/src/lib/core/core.module.spec';
import { NotificationModule } from 'projects/commons/src/lib/notification/notification.module';
import { NotificationService } from 'projects/commons/src/lib/notification/services/notification/notification.service';
import {
  SIDE_HEADER_DATA,
  TAB_HEADER_DATA
} from 'projects/commons/src/lib/tabs/components/tab-header/tab-header.component';
import { newTestTab } from 'projects/commons/src/lib/tabs/components/tab-header/tab-header.component.spec';
import { TabsSide } from 'projects/commons/src/lib/tabs/entities/tabs-side';
import { TabsService } from 'projects/commons/src/lib/tabs/services/tabs/tabs.service';
import { NotificationsTabHeaderComponent } from './notifications-tab-header.component';

@Component({
  selector: 'lib-test',
  template: 'test',
})
class TestComponent { }

describe('NotificationsTabHeaderComponent', () => {
  let component: NotificationsTabHeaderComponent;
  let fixture: ComponentFixture<NotificationsTabHeaderComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [CoreTestModule, NotificationModule],
        declarations: [TestComponent],
        providers: [
          NotificationService,
          TabsService,
          { provide: TAB_HEADER_DATA, useValue: newTestTab(TestComponent) },
          { provide: SIDE_HEADER_DATA, useValue: TabsSide.TOP },
        ],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsTabHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
