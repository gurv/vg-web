import { SelectionModel } from '@angular/cdk/collections';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatTableDataSource } from '@angular/material/table';
import { GuiToolsService } from 'projects/commons/src/lib/tools/services/gui-tools/gui-tools.service';
import { guiToolsServiceSpy } from 'projects/commons/src/lib/tools/services/gui-tools/gui-tools.service.spec';
import { StorageNode } from 'projects/storage/src/lib/entities/storage-node';
import { TableOverlaySelectionComponent } from './table-overlay-selection.component';
import { TableOverlaySelectionModule } from './table-overlay-selection.module';

describe('TableOverlaySelectionComponent', () => {
  let component: TableOverlaySelectionComponent<any>;
  let fixture: ComponentFixture<TableOverlaySelectionComponent<any>>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [TableOverlaySelectionModule],
        providers: [{ provide: GuiToolsService, useValue: guiToolsServiceSpy() }],
      }).compileComponents();
      fixture = TestBed.createComponent(TableOverlaySelectionComponent);
      component = fixture.componentInstance;
      component.selection = new SelectionModel<StorageNode>();
    }),
  );

  beforeEach(() => {
    component.ngOnInit();
    component.dataSource = new MatTableDataSource([]);
    const datas: () => any[] = () => [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }];
    component.dataSource.data = datas();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should be up selection', () => {
    component.selection.select(component.dataSource.data[3]);

    expect(component.upSelection()).toBe(true);
    expect(component.selection.selected).toEqual([component.dataSource.data[2]]);
  });

  it('should be not up selection', () => {
    component.selection.select(component.dataSource.data[0]);

    expect(component.upSelection()).toBe(false);
  });

  it('should be down selection', () => {
    component.selection.select(component.dataSource.data[1]);

    expect(component.downSelection()).toBe(true);
    expect(component.selection.selected).toEqual([component.dataSource.data[2]]);
  });

  it('should be not down selection', () => {
    component.selection.select(component.dataSource.data[3]);

    expect(component.downSelection()).toBe(false);
  });

  it('should _deleteSelectionEmit', () => {
    const spy = spyOn(component.deleteSelection, 'emit');
    component._deleteSelectionEmit({ ctrlKey: true } as any);

    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should _enterSelectionEmit', () => {
    const spy = spyOn(component.enterSelection, 'emit');
    component._enterSelectionEmit();

    // eslint-disable-next-line jasmine/prefer-toHaveBeenCalledWith
    expect(spy).toHaveBeenCalled();
  });
});
