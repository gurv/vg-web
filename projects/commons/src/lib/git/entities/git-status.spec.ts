import { GitStatus } from './git-status';

export const testGitStatus: () => GitStatus = () => ({
  branch: {
    oid: 'oid',
    head: 'head',
    upstream: 'upstream',
    ahead: 42,
    behind: 1337,
  },
  changed: [
    {
      xy: 'xy',
      path: 'path',
    },
  ],
  renamedCopied: [
    {
      xy: 'xy',
      score: 'score',
      path: 'path',
      origPath: 'origPath',
    },
  ],
  unmerged: [
    {
      xy: 'xy',
      path: 'path',
    },
  ],
  untracked: ['untracked'],
  ignored: ['ignored'],
});
