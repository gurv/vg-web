import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { cold, getTestScheduler } from 'jasmine-marbles';
import * as _ from 'lodash';
import { EventBusService } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service';
import { eventBusSpy } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service.spec';
import { SelectHelpEvent } from 'projects/commons/src/lib/help/entities/select-help-event';
import { LocalStorageService } from 'projects/commons/src/lib/tools/services/local-storage/local-storage.service';
import { localStorageServiceSpy } from 'projects/commons/src/lib/tools/services/local-storage/local-storage.service.spec';
import { NodeDeletedEvent } from 'projects/storage/src/lib/entities/node-deleted-event';
import { NodePendingSaveEvent } from 'projects/storage/src/lib/entities/node-pending-save-event';
import { OpenNodeEvent } from 'projects/storage/src/lib/entities/open-node-event';
import { SaveNodeEvent } from 'projects/storage/src/lib/entities/save-node-event';
import { SelectNodeEvent } from 'projects/storage/src/lib/entities/select-node-event';
import { STORAGE_ID } from 'projects/storage/src/lib/entities/storage-id';
import { StorageNode } from 'projects/storage/src/lib/entities/storage-node';
import {
  testStorageFileNode,
  testStorageNodes,
} from 'projects/storage/src/lib/entities/storage-node.spec';
import { StorageNodeToPredicatePipe } from 'projects/storage/src/lib/pipes/storage-node-to-predicate/storage-node-to-predicate.pipe';
import { StorageConfigurationService } from 'projects/storage/src/lib/services/storage-configuration/storage-configuration.service';
import { storageConfigurationServiceSpy } from 'projects/storage/src/lib/services/storage-configuration/storage-configuration.service.spec';
import { StorageEditorService } from 'projects/storage/src/lib/services/storage-editor/storage-editor.service';
import { storageEditorServiceSpy } from 'projects/storage/src/lib/services/storage-editor/storage-editor.service.spec';
import { StorageService } from 'projects/storage/src/lib/services/storage/storage.service';
import { storageServiceSpy } from 'projects/storage/src/lib/services/storage/storage.service.spec';
import { StorageEditorComponent } from './storage-editor.component';
import { StorageEditorModule } from './storage-editor.module';
import Spy = jasmine.Spy;
import SpyObj = jasmine.SpyObj;

describe('StorageEditorComponent', () => {
  let component: StorageEditorComponent;
  let fixture: ComponentFixture<StorageEditorComponent>;
  let storage: SpyObj<StorageService>;
  let eventBus: EventBusService;
  let editorService: StorageEditorService;
  let configuration: SpyObj<StorageConfigurationService>;
  let nodes: StorageNode[];

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [StorageEditorModule],
        providers: [
          { provide: STORAGE_ID, useValue: 'test' },
          { provide: LocalStorageService, useValue: localStorageServiceSpy() },
          { provide: StorageService, useValue: storageServiceSpy() },
          { provide: EventBusService, useValue: eventBusSpy() },
          { provide: StorageEditorService, useValue: storageEditorServiceSpy() },
          { provide: StorageConfigurationService, useValue: storageConfigurationServiceSpy() },
          StorageNodeToPredicatePipe,
        ],
      })
        .overrideTemplate(StorageEditorComponent, '')
        .compileComponents();

      nodes = testStorageNodes();
      storage = TestBed.inject(StorageService) as SpyObj<StorageService>;
      storage.filterExisting.and.returnValue(cold('---x|', { x: nodes }));
      eventBus = TestBed.inject(EventBusService);
      editorService = TestBed.inject(StorageEditorService);
      configuration = TestBed.inject(
        StorageConfigurationService,
      ) as SpyObj<StorageConfigurationService>;
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter existing nodes', () => {
    component.nodes.next([]);
    component.selectedIndex.next(42);
    getTestScheduler().flush();

    expect(component.nodes.value).toEqual(nodes);
    expect(component.selectedIndex.value).toBe(nodes.length - 1);
  });

  it('should filter existing nodes and select readme', () => {
    nodes.length = 0;
    component.nodes.next([]);
    component.selectedIndex.next(42);
    getTestScheduler().flush();

    expect(component.nodes.value).toEqual([configuration.readmeNode]);
    expect(component.selectedIndex.value).toBe(0);
  });

  it('should close node', () => {
    component.nodes.next(_.cloneDeep(nodes));
    component.selectedIndex.next(2);
    component.closeNode(4);

    expect(component.nodes.value.length).toBe(nodes.length - 1);
    expect(component.selectedIndex.value).toBe(2);
  });

  it('should close selected node', () => {
    component.nodes.next(_.cloneDeep(nodes));
    component.selectedIndex.next(2);
    component.closeNode(2);

    expect(component.nodes.value.length).toBe(nodes.length - 1);
    expect(component.selectedIndex.value).toBe(2);
  });

  it('should close selected node and update index', () => {
    component.nodes.next(_.cloneDeep(nodes));
    const index = nodes.length - 1;
    component.selectedIndex.next(index);
    component.closeNode(index);

    expect(component.nodes.value.length).toBe(nodes.length - 1);
    expect(component.selectedIndex.value).toBe(index - 1);
  });

  it('should selectIndex', () => {
    component.nodes.next(nodes);
    component.selectedIndex.next(0);
    component.selectIndex(2);

    expect(eventBus.publish).toHaveBeenCalledWith(new SelectNodeEvent(nodes[2]));
    expect(eventBus.publish).toHaveBeenCalledWith(new SelectHelpEvent('TEST'));
  });

  it('should selectIndex -1', () => {
    component.nodes.next(nodes);
    component.selectedIndex.next(0);
    component.selectIndex(-1);

    expect(eventBus.publish).not.toHaveBeenCalled();
  });

  it('should _openNode select tab', () => {
    component.nodes.next(nodes);
    component.selectedIndex.next(0);
    component._openNode(new OpenNodeEvent(nodes[5]));

    expect(component.selectedIndex.value).toBe(5);
  });

  it('should _openNode add tab', () => {
    const node = testStorageFileNode();
    component.nodes.next([]);
    component.selectedIndex.next(-1);
    component._openNode(new OpenNodeEvent(node));

    expect(component.nodes.value).toEqual([node]);
    expect(component.selectedIndex.value).toBe(0);
  });

  it('should return node editor', () => {
    const node = testStorageFileNode();
    const editor: any = { key: 'value' };
    (editorService.getNodeEditor as Spy).and.returnValue(editor);

    expect(component.getNodeEditor(node)).toBe(editor);
    expect(component.getNodeEditor(node)).toBe(editor);
    expect(editorService.getNodeEditor).toHaveBeenCalledTimes(1);
  });

  it('should close deleted node', () => {
    spyOn(component, 'closeNode');
    component.nodes.next(nodes);
    component._closeDeletedNode(new NodeDeletedEvent(nodes[1]));

    expect(component.closeNode).toHaveBeenCalledWith(1);
  });

  it('should not close deleted node', () => {
    spyOn(component, 'closeNode');
    component.nodes.next(nodes);
    component._closeDeletedNode(
      new NodeDeletedEvent({
        path: 'other/file/that/wont/be/found',
        type: 'DIRECTORY',
        depth: 0,
        length: 0,
        lastModified: 0,
      }),
    );

    expect(component.closeNode).not.toHaveBeenCalled();
  });

  it('should save on ctrl + s', () => {
    const binding = component._saveKeyBinding;
    component.nodes.next(nodes);
    component.selectedIndex.next(2);

    expect(binding.binding(null)).toBe(true);
    expect(eventBus.publish).toHaveBeenCalledWith(new SaveNodeEvent(nodes[2]));
  });

  it('should not save on ctrl + s if no nodes', () => {
    const binding = component._saveKeyBinding;
    component.nodes.next([]);
    component.selectedIndex.next(0);

    expect(binding.binding(null)).toBe(true);
    expect(eventBus.publish).not.toHaveBeenCalled();
  });

  it('should handle pending save state', () => {
    const node = testStorageFileNode();

    expect(component.isPendingSave(node)).toBeFalsy();

    component._tagPendingSaveNode(new NodePendingSaveEvent(node, true));

    expect(component.isPendingSave(node)).toBeTruthy();

    component._tagPendingSaveNode(new NodePendingSaveEvent(node, false));

    expect(component.isPendingSave(node)).toBeFalsy();
  });

  it('should close others', () => {
    component.nodes.next(nodes);
    component.selectedIndex.next(1);
    component.closeOthers();

    expect(component.nodes.value.length).toBe(1);
    expect(component.selectedIndex.value).toBe(0);
  });

  it('should close all', () => {
    component.nodes.next(nodes);
    component.selectedIndex.next(1);
    component.closeAll();

    expect(component.nodes.value.length).toBe(0);
    expect(component.selectedIndex.value).toBe(-1);
  });
});
