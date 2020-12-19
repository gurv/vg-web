import { GitBranchStatus } from './git-branch-status';
import { GitFileStatus } from './git-file-status';
import { GitRenamedCopiedStatus } from './git-renamed-copied-status';

export interface GitStatus {
  branch: GitBranchStatus;
  changed: GitFileStatus[];
  renamedCopied: GitRenamedCopiedStatus[];
  unmerged: GitFileStatus[];
  untracked: string[];
  ignored: string[];
}
