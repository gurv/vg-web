import { OwnerType } from './owner-type';
import { VgRole } from './vg-role';

export class Owner {
  constructor(
    public userId = '',
    public projectId = '',
    public applicationId = '',
    public type: OwnerType = 'PUBLIC',
    public roles: VgRole[] = [],
  ) {}
}
