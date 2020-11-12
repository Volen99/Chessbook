import {Injectable} from "@angular/core";

import {IUserIdentifier} from "./Interfaces/IUserIdentifier";
import Type from "typescript-dotnet-commonjs/System/Types";

@Injectable({
  providedIn: 'root',
})
export class UserIdentifier implements IUserIdentifier {
  constructor(userIdOrScreenName?: number | string) {
    if (Type.isNumber(userIdOrScreenName)) {
      this.id = userIdOrScreenName;
      this.idStr = userIdOrScreenName.toString(/*CultureInfo.InvariantCulture*/);
    } else if (Type.isString(userIdOrScreenName)) {
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

        // public static implicit operator UserIdentifier (userId: number) {
        //     return new UserIdentifier(userId);
        // }
        //
        // public static implicit operator UserIdentifier (username: string) {
        //     return new UserIdentifier(username);
        // }
    }


// public UserIdentifier()
// {
// }
//
// public UserIdentifier(long userId) : this()
// {
//   Id = userId;
//   IdStr = userId.ToString(CultureInfo.InvariantCulture);
// }
//
// public UserIdentifier(string userScreenName) : this()
// {
//   ScreenName = userScreenName;
// }
