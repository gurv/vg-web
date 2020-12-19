import { ComponentType } from '@angular/cdk/portal';
import { InjectionToken } from '@angular/core';
import { HelpPageId } from 'projects/commons/src/lib/help/entities/help-page-id';
import { StorageNodeEditor } from './storage-node-editor';

export interface EditorMatcher {
  regexp: RegExp | string;
  editor: ComponentType<StorageNodeEditor>;
  helpPageId: HelpPageId;
}

export const STORAGE_EDITORS_MAPPING = new InjectionToken<EditorMatcher[]>('StorageEditorsMapping');
export const STORAGE_DEFAULT_EDITOR = new InjectionToken<ComponentType<StorageNodeEditor>>(
  'StorageDefaultEditor',
);
