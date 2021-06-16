import {IUser} from "../../../core/interfaces/common/users";

export interface IAccountBlock {
  byAccount: IUser;
  blockedAccount: IUser;
  createdAt: Date | string;
}
