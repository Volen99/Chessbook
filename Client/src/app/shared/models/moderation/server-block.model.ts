import {IUser} from "../../../core/interfaces/common/users";

export interface ServerBlock {
  byAccount: IUser;
  blockedServer: {
    host: string
  };
  createdAt: Date | string;
}
