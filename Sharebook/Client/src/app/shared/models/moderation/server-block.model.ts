import { Account } from '../../../shared/models/actors/account.model';

export interface ServerBlock {
  byAccount: Account;
  blockedServer: {
    host: string,
  };
  createdAt: Date | string;
}
