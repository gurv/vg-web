import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { StorageService } from 'projects/storage/src/lib/services/storage/storage.service';
import { storageServiceSpy } from 'projects/storage/src/lib/services/storage/storage.service.spec';
import { EditNodeButtonComponent } from './edit-node-button.component';
import { EditNodeButtonModule } from './edit-node-button.module';

describe('EditNodeButtonComponent', () => {
  let component: EditNodeButtonComponent;
  let fixture: ComponentFixture<EditNodeButtonComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [EditNodeButtonModule],
        providers: [{ provide: StorageService, useValue: storageServiceSpy() }],
      })
        .overrideTemplate(EditNodeButtonComponent, '')
        .compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNodeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
