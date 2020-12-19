import { LogType } from './log-type';
import { LogStatus } from './log-status';

export interface Log {
  applicationId: string;
  id: string;
  type: LogType;
  text: string;
  status: LogStatus;
}
