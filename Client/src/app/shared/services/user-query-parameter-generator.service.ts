import {Injectable} from "@angular/core";
import {HttpParams} from "@angular/common/http";

import {IUserIdentifier} from "../models/users/user-identifier";
import {RestService} from "../../core/rest/rest.service";

@Injectable()
export class UserQueryParameterGeneratorService {

  constructor(private restService: RestService) {
  }

  public generateScreenNameParameter(screenName: string, parameterName: string = "screen_name"): string {
    return `${parameterName}=${screenName}`;
  }

  public generateIdOrScreenNameParameter(user: IUserIdentifier, idParameterName: string = "user_id",
                                         screenNameParameterName: string = "screen_name"): string {   // TODO: the last 2 parameters should be :?
    if (user == null) {
      return null;
    }

    if (user.id > 0) {
      return this.generateUserIdParameter(user.id, idParameterName);
    }

    if (user.idStr) {
      return this.generateUserIdParameter(user.idStr, idParameterName);
    }

    return this.generateScreenNameParameter(user.screenName, screenNameParameterName);
  }

  public appendUser(params: HttpParams, user: IUserIdentifier): void {
    let paramsNew = params;

    this.restService.addFormattedParameterToQuery(paramsNew, this.generateIdOrScreenNameParameter(user));
  }

  public appendUsers(params: HttpParams, users: Array<IUserIdentifier>): void {
    let paramsNew = params;

    this.restService.addFormattedParameterToQuery(paramsNew, this.generateListOfUserIdentifiersParameter(users));
  }

  private generateCollectionParameter(screenNames: string[]): string {
    return screenNames.filter(x => x != null).join(', '); // string.Join(",", screenNames.Where(x => x != null));
  }

  public generateListOfUserIdentifiersParameter(usersIdentifiers: Array<IUserIdentifier>): string {
    if (usersIdentifiers == null) {
      throw new Error(`nameof(usersIdentifiers)`);
    }

    let usersList = usersIdentifiers; // .ToArray();

    if (usersList.some(user => user.id <= 0 && !(user.idStr) && !(user.screenName))) {
      throw new Error("At least 1 valid users identifier is required.");
    }

    let userIds = new Array<string>();
    let usernames = new Array<string>();

    usersList.forEach(user => {
      if (user.id > 0) {
        userIds.push(user.id.toLocaleString());
      } else if (user.idStr) {
        userIds.push(user.idStr);
      } else if (user.screenName != null) {
        usernames.push(user.screenName);
      }
    });

    let parameterBuilder = new HttpParams();

    if (userIds.length === 0 && usernames.length === 0) {
      return null;
    }

    this.restService.addParameterToQuery(parameterBuilder, "user_id", this.generateCollectionParameter(userIds));
    this.restService.addParameterToQuery(parameterBuilder, "screen_name", this.generateCollectionParameter(usernames));

    return parameterBuilder.toString();
  }

  private generateUserIdParameter(userIdAsNumberOrString: number | string, parameterName: string = "user_id"): string {
    if (typeof userIdAsNumberOrString === 'number') {
      if (userIdAsNumberOrString <= 0) {
        return null;
      }

      return `${parameterName}=${userIdAsNumberOrString.toLocaleString()}`;
    } else {
      if (userIdAsNumberOrString == null) {
        return null;
      }

      return `${parameterName}=${userIdAsNumberOrString}`;
    }
  }
}
