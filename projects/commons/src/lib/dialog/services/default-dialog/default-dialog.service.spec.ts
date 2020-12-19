import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { DialogSize } from 'projects/commons/src/lib/dialog/entities/dialog-size';
import { ConfirmDialogComponent } from 'projects/commons/src/lib/dialog/pages/confirm-dialog/confirm-dialog.component';
import { DeleteDialogComponent } from 'projects/commons/src/lib/dialog/pages/delete-dialog/delete-dialog.component';
import { WaitDialogComponent } from 'projects/commons/src/lib/dialog/pages/wait-dialog/wait-dialog.component';
import { from } from 'rxjs';
import { DefaultDialogService } from './default-dialog.service';
import SpyObj = jasmine.SpyObj;

export const defaultDialogServiceSpy = () => {
  // eslint-disable-next-line jasmine/no-unsafe-spy
  const spy = jasmine.createSpyObj('DefaultDialogService', [
    'open',
    'delete',
    'confirm',
    'wait',
    'waitFor',
  ]);
  return spy;
};

describe('DefaultDialogService', () => {
  let service: DefaultDialogService;
  let dialog: SpyObj<MatDialog>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: MatDialog, useValue: jasmine.createSpyObj('MatDialog', ['open']) },
        DefaultDialogService,
      ],
    });
    service = TestBed.inject(DefaultDialogService);
    dialog = TestBed.inject(MatDialog) as SpyObj<MatDialog>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should delete', () => {
    const spy = spyOn(service, 'open');
    service.delete('name', ['item'], false, 'TEST');

    expect(spy).toHaveBeenCalledWith(DeleteDialogComponent, DialogSize.SIZE_MD, {
      name: 'name',
      items: ['item'],
      helpPageId: 'TEST',
    });
  });

  it('should delete force', () => {
    const spy = spyOn(service, 'open');

    expect(service.delete('name', ['item'], true, 'TEST')).toBeDefined();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should confirm', () => {
    const spy = spyOn(service, 'open');
    service.confirm('title', 'message');

    expect(spy).toHaveBeenCalledWith(ConfirmDialogComponent, DialogSize.SIZE_MD, {
      title: 'title',
      message: 'message',
    });
  });

  it('should confirm force', () => {
    const spy = spyOn(service, 'open');

    expect(service.confirm('title', 'message', true)).toBeDefined();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should wait', () => {
    service.wait({ title: 'title', progress: 50 });

    expect(dialog.open).toHaveBeenCalledWith(WaitDialogComponent, {
      panelClass: DialogSize.SIZE_MD,
      data: { title: 'title', progress: 50 },
      disableClose: true,
    });
  });

  it('should wait for', () => {
    service.waitFor(from('test'), 'title');

    expect(dialog.open).toHaveBeenCalledWith(WaitDialogComponent, {
      panelClass: DialogSize.SIZE_MD,
      data: { title: 'title', progress: -1 },
      disableClose: true,
    });
  });
});
