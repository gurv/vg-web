import { GitLog } from './git-log';
import { testUserOwner } from 'projects/commons/src/lib/security/entities/owner.spec';

export const testGitLog: () => GitLog = () => ({ owner: testUserOwner(), text: 'text' });
