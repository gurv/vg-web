import { Owner } from 'projects/commons/src/lib/security/entities/owner';

export interface GitLog {
  owner: Owner;
  text: string;
}
