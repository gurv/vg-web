import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DialogSize } from 'projects/commons/src/lib/dialog/entities/dialog-size';
import { DefaultDialogService } from 'projects/commons/src/lib/dialog/services/default-dialog/default-dialog.service';
import { EventBusService } from 'projects/commons/src/lib/event/services/event-bus/event-bus.service';
import { StorageNode } from 'projects/storage/src/lib/entities/storage-node';
import { DeleteFilesEvent } from 'projects/storage/src/lib/entities/delete-files-event';
import { NewFileEvent } from 'projects/storage/src/lib/entities/new-file-event';
import { OpenNodeEvent } from 'projects/storage/src/lib/entities/open-node-event';
import { StorageConfigurationService } from '../storage-configuration/storage-configuration.service';
import { DeleteFilesDialogComponent } from 'projects/storage/src/lib/components/delete-files-dialog/delete-files-dialog.component';
import { FileNameDialogComponent } from 'projects/storage/src/lib/components/file-name-dialog/file-name-dialog.component';
import { FileUploadDialogComponent } from 'projects/storage/src/lib/components/file-upload-dialog/file-upload-dialog.component';
import { NodeEventToNodePipe } from 'projects/storage/src/lib/pipes/node-event-to-node/node-event-to-node.pipe';
import { StorageNodeToNamePipe } from 'projects/storage/src/lib/pipes/storage-node-to-name/storage-node-to-name.pipe';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable()
export class StorageService {
  constructor(
    private configuration: StorageConfigurationService,
    private eventBus: EventBusService,
    private dialogs: DefaultDialogService,
    private http: HttpClient,
    private toNode: NodeEventToNodePipe,
    private toName: StorageNodeToNamePipe,
  ) { }

  public edit(node: StorageNode) {
    this.eventBus.publish(new OpenNodeEvent(node));
  }

  public rename(node: StorageNode, parentDirectory: StorageNode) {
    const oldName = this.toName.transform(node);
    const directoryPath = parentDirectory.path;
    this.dialogs
      .open(FileNameDialogComponent, DialogSize.SIZE_SM, { title: 'Rename File', name: oldName })
      .pipe(
        mergeMap((newName: string) =>
          this.http.post<StorageNode>(
            this.configuration.storageApiUrl('/rename'),
            {},
            {
              params: {
                directoryPath,
                oldName,
                newName,
              },
            },
          ),
        ),
      )
      .subscribe();
  }

  public deleteFiles(nodes: StorageNode[], force = false) {
    if (force) {
      this.deleteFilesApi(nodes);
    } else {
      this.dialogs
        .open(DeleteFilesDialogComponent, DialogSize.SIZE_LG, { nodes })
        .subscribe(() => this.deleteFilesApi(nodes));
    }
  }

  public addFile(parent: StorageNode) {
    this._add(parent, 'New File', '/set/content', 'New file');
  }

  public addDirectory(parent: StorageNode) {
    this._add(parent, 'New Directory', '/set/directory', null);
  }

  public upload(parent: StorageNode) {
    const path = parent.path;
    const endpoint = this.configuration.storageApiUrl(`/set/file?path=${path}`);
    this.dialogs
      .open(FileUploadDialogComponent, DialogSize.SIZE_MD, {
        endpoint,
        multiple: true,
        accept: '*',
        title: 'Upload Files',
      })
      .subscribe();
  }

  public downloadLink(node?: StorageNode): string {
    const path = node ? node.path : '';
    return this.configuration.storageApiUrl(`/get/file?path=${path}`);
  }

  public get(path: string): Observable<StorageNode> {
    return this.http.get<StorageNode>(this.configuration.storageApiUrl('/get'), {
      params: {
        path,
      },
    });
  }

  public getContent(node: StorageNode): Observable<string> {
    return this.http.get(this.configuration.storageApiUrl('/get/content'), {
      responseType: 'text',
      params: {
        path: node.path,
      },
    });
  }

  public getJSON<T>(node: StorageNode): Observable<T> {
    return this.http.get<T>(this.configuration.storageApiUrl('/get/content'), {
      params: {
        path: node.path,
      },
    });
  }

  public listJSON<T>(nodes: StorageNode[]): Observable<T[]> {
    return this.http.post<T[]>(
      this.configuration.storageApiUrl('/list/json'),
      _.map(nodes, 'path'),
    );
  }

  public deleteFile(path: string): Observable<boolean[]> {
    return this.http.post<boolean[]>(this.configuration.storageApiUrl('/delete'), [path]);
  }

  public find(
    rootPath: string,
    matcher: string = null,
    maxDepth: number = null,
  ): Observable<StorageNode[]> {
    const params: any = { rootPath };
    if (matcher) {
      params.matcher = matcher;
    }
    if (maxDepth) {
      params.maxDepth = maxDepth.toString();
    }
    return this.http.get<StorageNode[]>(this.configuration.storageApiUrl('/find'), { params });
  }

  public filterExisting(nodes: StorageNode[]): Observable<StorageNode[]> {
    return this.http.post<StorageNode[]>(
      this.configuration.storageApiUrl('/filter/existing'),
      nodes,
    );
  }

  private deleteFilesApi(nodes: StorageNode[]) {
    return this.http
      .post<boolean[]>(this.configuration.storageApiUrl('/delete'), _.map(nodes, 'path'))
      .subscribe((results: boolean[]) => {
        this.eventBus.publish(new DeleteFilesEvent(results));
      });
  }

  private _add(parent: StorageNode, title: string, path: string, content?: string) {
    this.dialogs
      .open(FileNameDialogComponent, DialogSize.SIZE_SM, {
        title,
        name: '',
        helpPageId: 'ADMIN_CREATE_FILE',
      })
      .pipe(
        mergeMap((name: string) =>
          this.http.post<StorageNode>(this.configuration.storageApiUrl(path), content, {
            params: {
              path: parent.path ? `${parent.path}/${name}` : name,
            },
          }),
        ),
      )
      .subscribe((node: StorageNode) => {
        this.eventBus.publish(new NewFileEvent(node));
      });
  }
}
