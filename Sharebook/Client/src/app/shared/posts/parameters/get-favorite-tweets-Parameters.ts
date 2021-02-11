import {IMinMaxQueryParameters, MinMaxQueryParameters} from "../../models/query/min-max-query-parameters";
import {IUserIdentifier} from "../../models/users/user-identifier";
import {SharebookLimits} from "../../../helpers/sharebook-limits";
import {UserIdentifier} from "../../../core/models/UserIdentifier";

// For more information visit : https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-favorites-list
export interface IGetUserFavoriteTweetsParameters extends IMinMaxQueryParameters {
  // The users from whom you want to get the favorite tweets
  user: IUserIdentifier;

  // Include the tweet entities
  includeEntities?: boolean;
}

export class GetUserFavoriteTweetsParameters extends MinMaxQueryParameters implements IGetUserFavoriteTweetsParameters {
  constructor(usernameOrIdOrUserOrParameters: | string | number | IUserIdentifier | IGetUserFavoriteTweetsParameters) {
    if (GetUserFavoriteTweetsParameters.isIGetUserFavoriteTweetsParameters(usernameOrIdOrUserOrParameters)) {
      super(usernameOrIdOrUserOrParameters);

      this.user = usernameOrIdOrUserOrParameters.user;
      this.includeEntities = usernameOrIdOrUserOrParameters.includeEntities;
    } else {
      super();

      super.pageSize = SharebookLimits.TWEETS_GET_FAVORITE_TWEETS_MAX_SIZE;

      let userCurrent: IUserIdentifier;
      if (typeof usernameOrIdOrUserOrParameters === 'string' || typeof usernameOrIdOrUserOrParameters === 'number') {
        userCurrent = new UserIdentifier(usernameOrIdOrUserOrParameters);
      } else {
        userCurrent = usernameOrIdOrUserOrParameters;
      }

      this.user = userCurrent;
    }
  }

  public user: IUserIdentifier;
  public includeEntities?: boolean;

  private static isIGetUserFavoriteTweetsParameters(usernameOrIdOrUserOrParameters: | string | number | IUserIdentifier | IGetUserFavoriteTweetsParameters):
    usernameOrIdOrUserOrParameters is IGetUserFavoriteTweetsParameters {
    return (usernameOrIdOrUserOrParameters as IGetUserFavoriteTweetsParameters).user !== undefined;
  }
}


// public GetUserFavoriteTweetsParameters(string username) : this(new UserIdentifier(username))
// {
// }
//
// public GetUserFavoriteTweetsParameters(long userId) : this(new UserIdentifier(userId))
// {
// }
//
// public GetUserFavoriteTweetsParameters(IUserIdentifier users)
// {
//   PageSize = TwitterLimits.DEFAULTS.TWEETS_GET_FAVORITE_TWEETS_MAX_SIZE;
//   User = users;
// }
//
// public GetUserFavoriteTweetsParameters(IGetUserFavoriteTweetsParameters source) : base(source)
// {
//   if (source == null)
//   {
//     PageSize = TwitterLimits.DEFAULTS.TWEETS_GET_FAVORITE_TWEETS_MAX_SIZE;
//     return;
//   }
//
//   User = source.User;
//   IncludeEntities = source.IncludeEntities;
// }
