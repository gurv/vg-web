import { IconFa } from './icon-fa';
import { IconDynamic } from './icon-dynamic';
import { IconFaAddon } from './icon-fa-addon';
import { faSync } from '@fortawesome/free-solid-svg-icons/faSync';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons/faTimesCircle';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay';
import { faSquare } from '@fortawesome/free-regular-svg-icons/faSquare';
import { faICursor } from '@fortawesome/free-solid-svg-icons/faICursor';
import { faBug } from '@fortawesome/free-solid-svg-icons/faBug';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons/faFileAlt';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faStop } from '@fortawesome/free-solid-svg-icons/faStop';
import { faBroom } from '@fortawesome/free-solid-svg-icons/faBroom';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons/faQuestionCircle';
import { faClipboard } from '@fortawesome/free-regular-svg-icons/faClipboard';
import { faFutbol } from '@fortawesome/free-regular-svg-icons/faFutbol';
import { faRubleSign } from '@fortawesome/free-solid-svg-icons/faRubleSign';

library.add(
  faPlus,
  faSync,
  faTimesCircle,
  faTrash,
  faSearch,
  faEllipsisV,
  faPlay,
  faSquare,
  faICursor,
  faBug,
  faFileAlt,
  faStop,
  faBroom,
  faQuestionCircle,
  faFutbol,
  faRubleSign,
);

export const LOADING_ICON = new IconFa(faSync, 'muted', '', true);

export const REFRESH_ICON = new IconDynamic(new IconFa(faSync, 'primary'), {
  loading: LOADING_ICON,
});

export const MENU_ICON = new IconFa(faEllipsisV, 'primary');

export const ADD_ICON = new IconFa(faPlus, 'success');

export const DELETE_ICON = new IconFa(faTrash, 'error');

export const INSPECT_ICON = new IconFa(faSearch);

export const CLOSE_ICON = new IconDynamic(new IconFa(faTimesCircle), {
  selected: new IconFa(faTimesCircle, 'error'),
});

export const PLAY_ICON = new IconFa(faPlay, 'success');

export const STOP_ICON = new IconFa(faStop, 'error');

export const CLEAR_ICON = new IconFa(faBroom);

export const DEBUG_ICON = new IconFa(faBug, 'primary');

export const RENAME_ICON = new IconFaAddon(
  new IconFa(faSquare, 'foreground', 'shrink-3 down-2'),
  new IconFa(faICursor, 'accent', 'right-5 grow-2 down-2'),
);

export const LOGS_ICON = new IconFa(faFileAlt);

export const HELP_ICON = new IconFa(faQuestionCircle, 'accent');

export const CLIPBOARD_ICON = new IconFa(faClipboard, 'accent');
