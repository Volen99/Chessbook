import {IUserQueryParameterGenerator} from "../../core/Core/QueryGenerators/IUserQueryParameterGenerator";
import {IUserIdentifier} from "../../core/Public/Models/Interfaces/IUserIdentifier";
import StringBuilder from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Text/StringBuilder";
import ArgumentException from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Exceptions/ArgumentException";
import ArgumentNullException from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Exceptions/ArgumentNullException";

export class UserQueryParameterGenerator implements IUserQueryParameterGenerator
    {
        private GenerateUserIdParameter(userId: number, parameterName: string = "user_id"): string {
            if (userId <= 0)
            {
                return null;
            }

            return `${parameterName}=${userId.ToString(CultureInfo.InvariantCulture)}`;
        }

        private  GenerateUserIdParameter(userId: string, parameterName: string = "user_id"): string
        {
            if (userId == null)
            {
                return null;
            }

            return `${parameterName}=${userId}`;
        }

        public  GenerateScreenNameParameter(screenName: string, parameterName: string = "screen_name"): string
        {
            return `${parameterName}=${screenName}`;
        }

        public  generateIdOrScreenNameParameter(user: IUserIdentifier, idParameterName: string = "user_id",
                                                screenNameParameterName: string  = "screen_name"): string
        {
            if (user == null)
            {
                return null;
            }

            if (user.id > 0)
            {
                return GenerateUserIdParameter(user.id, idParameterName);
            }

            if (!user.idStr.IsNullOrEmpty())
            {
                return GenerateUserIdParameter(user.idStr, idParameterName);
            }

            return GenerateScreenNameParameter(user.screenName, screenNameParameterName);
        }

        public  appendUser(query: StringBuilder, user: IUserIdentifier): void
        {
            query.addFormattedParameterToQuery(GenerateIdOrScreenNameParameter(user));
        }

        public  appendUsers(query: StringBuilder, users: Array<IUserIdentifier>): void
        {
            query.addFormattedParameterToQuery(GenerateListOfUserIdentifiersParameter(users));
        }

        private  GenerateCollectionParameter(screenNames: string[]): string
        {
            return string.Join(",", screenNames.Where(x => x != null));
        }

        public  generateListOfUserIdentifiersParameter(usersIdentifiers: Array<IUserIdentifier>): string
        {
            if (usersIdentifiers == null)
            {
                throw new ArgumentNullException(nameof(usersIdentifiers));
            }

            var usersList = usersIdentifiers.ToArray();

            if (usersList.Any(user => user.Id <= 0 && string.IsNullOrEmpty(user.IdStr) && string.IsNullOrEmpty(user.ScreenName)))
            {
                throw new ArgumentException("At least 1 valid user identifier is required.");
            }

            var userIds = new Array<string>();
            var usernames = new Array<string>();

            usersList.ForEach(user =>
            {
                if (user.Id > 0)
                {
                    userIds.Add(user.Id.ToString(CultureInfo.InvariantCulture));
                }
                else if (!string.IsNullOrEmpty(user.IdStr))
                {
                    userIds.Add(user.IdStr);
                }
                else if (user.ScreenName != null)
                {
                    usernames.Add(user.ScreenName);
                }
            });

            let parameterBuilder = new StringBuilder();

            if (userIds.length === 0 && usernames.length === 0)
            {
                return null;
            }

            parameterBuilder.addParameterToQuery("user_id", this.GenerateCollectionParameter(userIds));
            parameterBuilder.addParameterToQuery("screen_name", this.GenerateCollectionParameter(usernames));

            return parameterBuilder.toString();
        }
    }
}
