import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MenuNodeButtonComponent } from './menu-node-button.component';
import { MenuNodeButtonModule } from './menu-node-button.module';
import { StorageTreeControlService } from 'projects/storage/src/lib/services/storage-tree-control/storage-tree-control.service';
import { storageTreeControlServiceSpy } from 'projects/storage/src/lib/services/storage-tree-control/storage-tree-control.service.spec';

describe('MenuNodeButtonComponent', () => {
  let component: MenuNodeButtonComponent;
  let fixture: ComponentFixture<MenuNodeButtonComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [MenuNodeButtonModule],
        providers: [
          { provide: StorageTreeControlService, useValue: storageTreeControlServiceSpy() },
        ],
      })
        .overrideTemplate(MenuNodeButtonComponent, '')
        .compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuNodeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
