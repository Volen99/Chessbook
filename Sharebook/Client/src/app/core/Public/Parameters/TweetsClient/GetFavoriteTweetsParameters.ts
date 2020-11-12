import {IMinMaxQueryParameters, MinMaxQueryParameters} from "../MaxAndMinBaseQueryParameters";
import {ITweetModeParameter} from "../ITweetModeParameter";
import {IUserIdentifier} from "../../Models/Interfaces/IUserIdentifier";
import {UserIdentifier} from "../../Models/UserIdentifier";
import {SharebookLimits} from "../../Settings/SharebookLimits";
import {TweetMode} from '../../Settings/SharebookSettings';
import Type from "typescript-dotnet-commonjs/System/Types";

// For more information visit : https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-favorites-list
export interface IGetUserFavoriteTweetsParameters extends IMinMaxQueryParameters, ITweetModeParameter {
  // The user from whom you want to get the favorite tweets
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

      super.pageSize = SharebookLimits.DEFAULTS.TWEETS_GET_FAVORITE_TWEETS_MAX_SIZE;

      let userCurrent: IUserIdentifier;
      if (Type.isString(usernameOrIdOrUserOrParameters) || Type.isNumber(usernameOrIdOrUserOrParameters)) {
        userCurrent = new UserIdentifier(usernameOrIdOrUserOrParameters);
      } else {
        userCurrent = usernameOrIdOrUserOrParameters;
      }

      this.user = userCurrent;
    }
  }

  public user: IUserIdentifier;
  public includeEntities?: boolean;
  public tweetMode?: TweetMode;

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
// public GetUserFavoriteTweetsParameters(IUserIdentifier user)
// {
//   PageSize = TwitterLimits.DEFAULTS.TWEETS_GET_FAVORITE_TWEETS_MAX_SIZE;
//   User = user;
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
