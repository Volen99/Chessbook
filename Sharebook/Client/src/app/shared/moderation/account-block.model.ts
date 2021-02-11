import { IAccountBlock as AccountBlockServer } from "../models/moderation/account-block.model";
import {User} from "../shared-main/user/user.model";

export class AccountBlock implements AccountBlockServer {
  byAccount: User;
  blockedAccount: User;
  createdAt: Date | string;

  constructor(block: AccountBlockServer) {
    this.byAccount = new User(block.byAccount);
    this.blockedAccount = new User(block.blockedAccount);
    this.createdAt = block.createdAt;
  }
}
