import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CoreTestModule } from 'projects/commons/src/lib/core/core.module.spec';
import { EditorDialogService } from 'projects/commons/src/lib/dialog/services/editor-dialog/editor-dialog.service';
import { editorDialogServiceSpy } from 'projects/commons/src/lib/dialog/services/editor-dialog/editor-dialog.service.spec';
import { testErrorNotification } from 'projects/commons/src/lib/notification/entities/error-notification.spec';
import { NotificationService } from 'projects/commons/src/lib/notification/services/notification/notification.service';
import { TabsService } from 'projects/commons/src/lib/tabs/services/tabs/tabs.service';
import { NotificationModule } from '../../notification.module';
import { NotificationsTableComponent } from './notifications-table.component';
import SpyObj = jasmine.SpyObj;

describe('NotificationsTableComponent', () => {
  let component: NotificationsTableComponent;
  let fixture: ComponentFixture<NotificationsTableComponent>;
  let dialogs: SpyObj<EditorDialogService>;

  beforeEach(
    waitForAsync(() => {
      dialogs = editorDialogServiceSpy();
      TestBed.configureTestingModule({
        imports: [CoreTestModule, NotificationModule],
        providers: [
          NotificationService,
          TabsService,
          { provide: EditorDialogService, useValue: dialogs },
        ],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO
  // it('should display table', () => {
  //   TestBed.inject(EventBusService).publish(new NotificationEvent(testNotification()));
  //   fixture.detectChanges();

  //   expect(fixture.nativeElement.querySelectorAll('td').length).toBe(4);
  // });

  it('should datasource disconnect', () => {
    component.dataSource.disconnect(null);

    // eslint-disable-next-line jasmine/expect-single-argument
    expect().nothing();
  });

  it('should display error logsComponents', () => {
    component.openTrace(testErrorNotification());

    // eslint-disable-next-line jasmine/prefer-toHaveBeenCalledWith
    expect(dialogs.logs).toHaveBeenCalled();
  });
});
