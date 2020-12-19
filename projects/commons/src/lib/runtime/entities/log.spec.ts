import { Log } from 'projects/commons/src/lib/runtime/entities/log';

export const testLog: () => Log = () => ({
  applicationId: 'applicationId',
  id: 'id',
  type: 'CONTAINER',
  text: 'text',
  status: 'RUNNING',
});
