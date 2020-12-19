import { Pipe, PipeTransform } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCss3 } from '@fortawesome/free-brands-svg-icons/faCss3';
import { faHtml5 } from '@fortawesome/free-brands-svg-icons/faHtml5';
import { faJs } from '@fortawesome/free-brands-svg-icons/faJs';
import { faMarkdown } from '@fortawesome/free-brands-svg-icons/faMarkdown';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { faCode } from '@fortawesome/free-solid-svg-icons/faCode';
import { faFile } from '@fortawesome/free-solid-svg-icons/faFile';
import { faFileCsv } from '@fortawesome/free-solid-svg-icons/faFileCsv';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons/faFileExcel';
import { faFileImage } from '@fortawesome/free-solid-svg-icons/faFileImage';
import { faFilePowerpoint } from '@fortawesome/free-solid-svg-icons/faFilePowerpoint';
import { faFileWord } from '@fortawesome/free-solid-svg-icons/faFileWord';
import { faFolder } from '@fortawesome/free-solid-svg-icons/faFolder';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons/faFolderOpen';
import { Icon } from 'projects/commons/src/lib/icon/entities/icon';
import { IconDynamic } from 'projects/commons/src/lib/icon/entities/icon-dynamic';
import { IconFa } from 'projects/commons/src/lib/icon/entities/icon-fa';
import { StorageNode } from '../../entities/storage-node';
import { StorageNodeToExtPipe } from '../storage-node-to-ext/storage-node-to-ext.pipe';

library.add(
  faFolder,
  faFolderOpen,
  faCss3,
  faHtml5,
  faCode,
  faJs,
  faMarkdown,
  faFile,
  faFileWord,
  faFilePowerpoint,
  faFilePdf,
  faFileImage,
  faFileExcel,
  faFileCsv,
);

@Pipe({
  name: 'storageNodeToIcon',
})
export class StorageNodeToIconPipe implements PipeTransform {
  static readonly DEFAULT_FILE_ICON = new IconFa(faFile);

  static readonly DEFAULT_DIRECTORY_ICON = new IconDynamic(new IconFa(faFolder), {
    expanded: new IconFa(faFolderOpen),
  });

  static readonly ICONS = {
    'css': new IconFa(faCss3),
    'html': new IconFa(faHtml5),
    'xml': new IconFa(faCode),
    'js': new IconFa(faJs),
    'javascript': new IconFa(faJs),
    'md': new IconFa(faMarkdown),
    'markdown': new IconFa(faMarkdown),
    'doc': new IconFa(faFileWord),
    'docx': new IconFa(faFileWord),
    'ppt': new IconFa(faFilePowerpoint),
    'pptx': new IconFa(faFilePowerpoint),
    'xls': new IconFa(faFileExcel),
    'xlsx': new IconFa(faFileExcel),
    'pdf': new IconFa(faFilePdf),
    'png': new IconFa(faFileImage),
    'jpg': new IconFa(faFileImage),
    'jpeg': new IconFa(faFileImage),
    'gif': new IconFa(faFileImage),
    'csv': new IconFa(faFileCsv),
    'scala': new IconFa(faCode),
  };

  constructor(private toExt: StorageNodeToExtPipe) {}

  transform(node: StorageNode, args?: any): Icon {
    if (node.type === 'DIRECTORY') {
      return StorageNodeToIconPipe.DEFAULT_DIRECTORY_ICON;
    }
    const icon = StorageNodeToIconPipe.ICONS[this.toExt.transform(node)];
    return icon ? icon : StorageNodeToIconPipe.DEFAULT_FILE_ICON;
  }
}
