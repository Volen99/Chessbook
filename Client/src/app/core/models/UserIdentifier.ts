import {IUserIdentifier} from "../../shared/models/users/user-identifier";

export class UserIdentifier implements IUserIdentifier {
  constructor(userIdOrScreenName?: number | string) {
    if (typeof userIdOrScreenName === 'number') {
      this.id = userIdOrScreenName;
      this.idStr = userIdOrScreenName.toLocaleString();
    } else if (typeof userIdOrScreenName === 'string') {
      this.screenName = userIdOrScreenName;
    }
  }

  public id: number;
  public idStr: string;
  public screenName: string;

  public toString(): string {
    if (this.screenName) {
      return this.screenName;
    }

    if (this.idStr) {
      return this.idStr;
    }

    return this.id.toString();
  }

}
