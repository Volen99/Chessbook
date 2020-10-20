import {IUserQueryParameterGenerator} from "../../core/Core/QueryGenerators/IUserQueryParameterGenerator";
import {IUserIdentifier} from "../../core/Public/Models/Interfaces/IUserIdentifier";
import StringBuilder from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Text/StringBuilder";
import ArgumentException from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Exceptions/ArgumentException";
import ArgumentNullException from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Exceptions/ArgumentNullException";
import Type from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Types";

export class UserQueryParameterGenerator implements IUserQueryParameterGenerator {
  private generateUserIdParameter(userIdAsNumberOrString: number | string, parameterName: string = "user_id"): string {
    if (Type.isNumber(userIdAsNumberOrString)) {
      if (userIdAsNumberOrString <= 0) {
        return null;
      }

      return `${parameterName}=${userIdAsNumberOrString.toString(CultureInfo.InvariantCulture)}`;
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
                                         screenNameParameterName: string = "screen_name"): string {
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
    query.addFormattedParameterToQuery(this.generateIdOrScreenNameParameter(user));
  }

  public appendUsers(query: StringBuilder, users: Array<IUserIdentifier>): void {
    query.addFormattedParameterToQuery(this.generateListOfUserIdentifiersParameter(users));
  }

        private  GenerateCollectionParameter(screenNames: string[]): string
        {
            return screenNames.filter(x => x != null).join(', '); // string.Join(",", screenNames.Where(x => x != null));
        }

        public  generateListOfUserIdentifiersParameter(usersIdentifiers: Array<IUserIdentifier>): string {
          if (usersIdentifiers == null) {
            throw new ArgumentNullException(nameof(usersIdentifiers));
          }

            let usersList = usersIdentifiers; // .ToArray();

            if (usersList.some(user => user.id <= 0 && !(user.idStr) && !(user.screenName))) {
                throw new ArgumentException("At least 1 valid user identifier is required.");
            }

            let userIds = new Array<string>();
            let usernames = new Array<string>();

            usersList.ForEach(user => {
              if (user.Id > 0) {
                userIds.push(user.Id.ToString(CultureInfo.InvariantCulture));
              } else if (user.IdStr) {
                userIds.push(user.IdStr);
              } else if (user.ScreenName != null) {
                usernames.push(user.ScreenName);
              }
            });

            let parameterBuilder = new StringBuilder();

            if (userIds.length === 0 && usernames.length === 0) {
                return null;
            }

            parameterBuilder.addParameterToQuery("user_id", this.GenerateCollectionParameter(userIds));
            parameterBuilder.addParameterToQuery("screen_name", this.GenerateCollectionParameter(usernames));

            return parameterBuilder.toString();
        }
    }
}
