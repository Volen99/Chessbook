import {Injectable} from "@angular/core";

import {IUserQueryParameterGenerator} from "../../core/Core/QueryGenerators/IUserQueryParameterGenerator";
import {IUserIdentifier} from "../../core/Public/Models/Interfaces/IUserIdentifier";
import Type from "typescript-dotnet-commonjs/System/Types";
import StringBuilder from "typescript-dotnet-commonjs/System/Text/StringBuilder";
import ArgumentNullException from "typescript-dotnet-commonjs/System/Exceptions/ArgumentNullException";
import ArgumentException from "typescript-dotnet-commonjs/System/Exceptions/ArgumentException";
import {StringBuilderExtensions} from "../../core/Core/Extensions/stringBuilder-extensions";

@Injectable({
  providedIn: 'root',
})
export class UserQueryParameterGenerator implements IUserQueryParameterGenerator {
  private generateUserIdParameter(userIdAsNumberOrString: number | string, parameterName: string = "user_id"): string {
    if (Type.isNumber(userIdAsNumberOrString)) {
      if (userIdAsNumberOrString <= 0) {
        return null;
      }

      return `${parameterName}=${userIdAsNumberOrString.toString(/*CultureInfo.InvariantCulture*/)}`;
    } else {
      if (userIdAsNumberOrString == null) {
        return null;
      }

      return `${parameterName}=${userIdAsNumberOrString}`;
    }
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

  public appendUser(query: StringBuilder, user: IUserIdentifier): void {
    StringBuilderExtensions.addFormattedParameterToQuery(query, this.generateIdOrScreenNameParameter(user));
  }

  public appendUsers(query: StringBuilder, users: Array<IUserIdentifier>): void {
    StringBuilderExtensions.addFormattedParameterToQuery(query, this.generateListOfUserIdentifiersParameter(users));
  }

  private GenerateCollectionParameter(screenNames: string[]): string {
    return screenNames.filter(x => x != null).join(', '); // string.Join(",", screenNames.Where(x => x != null));
  }

  public generateListOfUserIdentifiersParameter(usersIdentifiers: Array<IUserIdentifier>): string {
    if (usersIdentifiers == null) {
      throw new ArgumentNullException(`nameof(usersIdentifiers)`);
    }

    let usersList = usersIdentifiers; // .ToArray();

    if (usersList.some(user => user.id <= 0 && !(user.idStr) && !(user.screenName))) {
      throw new ArgumentException("At least 1 valid user identifier is required.");
    }

    let userIds = new Array<string>();
    let usernames = new Array<string>();

    usersList.forEach(user => {
      if (user.id > 0) {
        userIds.push(user.id.toString(/*CultureInfo.InvariantCulture*/));
      } else if (user.idStr) {
        userIds.push(user.idStr);
      } else if (user.screenName != null) {
        usernames.push(user.screenName);
      }
    });

    let parameterBuilder = new StringBuilder();

    if (userIds.length === 0 && usernames.length === 0) {
      return null;
    }

    StringBuilderExtensions.addParameterToQuery(parameterBuilder, "user_id", this.GenerateCollectionParameter(userIds));
    StringBuilderExtensions.addParameterToQuery(parameterBuilder, "screen_name", this.GenerateCollectionParameter(usernames));

    return parameterBuilder.toString();
  }
}
