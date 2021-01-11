import {Account} from '../../main/account/account.model';

export interface AccountBlock {
  byAccount: Account;
  blockedAccount: Account;
  createdAt: Date | string;
}
