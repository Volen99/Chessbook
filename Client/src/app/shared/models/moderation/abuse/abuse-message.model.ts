import {IUser} from "../../../../core/interfaces/common/users";

export interface AbuseMessage {
  id: number;
  message: string;
  byModerator: boolean;
  createdAt: Date | string;

  account: IUser; // AccountSummary
}
