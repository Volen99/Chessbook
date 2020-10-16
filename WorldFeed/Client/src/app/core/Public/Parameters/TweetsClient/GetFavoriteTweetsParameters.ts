import {IMinMaxQueryParameters, MinMaxQueryParameters} from "../MaxAndMinBaseQueryParameters";
import {ITweetModeParameter} from "../ITweetModeParameter";
import {IUserIdentifier} from "../../Models/Interfaces/IUserIdentifier";
import {UserIdentifier} from "../../Models/UserIdentifier";
import {TwitterLimits} from "../../Settings/TwitterLimits";
import {TweetMode} from '../../Settings/TweetinviSettings';
import Type from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Types";

// For more information visit : https://dev.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-favorites-list
export interface IGetUserFavoriteTweetsParameters extends IMinMaxQueryParameters, ITweetModeParameter {
  // The user from whom you want to get the favorite tweets
  User: IUserIdentifier;

  // Include the tweet entities
  IncludeEntities?: boolean;
}

export class GetUserFavoriteTweetsParameters extends MinMaxQueryParameters implements IGetUserFavoriteTweetsParameters {
  constructor(usernameOrIdOrUserOrParameters: | string | number | IUserIdentifier | IGetUserFavoriteTweetsParameters) {
    if (GetUserFavoriteTweetsParameters.isIGetUserFavoriteTweetsParameters(usernameOrIdOrUserOrParameters)) {
      super(usernameOrIdOrUserOrParameters);

      this.User = usernameOrIdOrUserOrParameters.User;
      this.IncludeEntities = usernameOrIdOrUserOrParameters.IncludeEntities;
    } else {
      super();

      super.PageSize = TwitterLimits.DEFAULTS.TWEETS_GET_FAVORITE_TWEETS_MAX_SIZE;

      let userCurrent: IUserIdentifier;
      if (Type.isString(usernameOrIdOrUserOrParameters) || Type.isNumber(usernameOrIdOrUserOrParameters)) {
        userCurrent = new UserIdentifier(usernameOrIdOrUserOrParameters);
      } else {
        userCurrent = usernameOrIdOrUserOrParameters;
      }

      this.User = userCurrent;
    }
  }

  public User: IUserIdentifier;
  public IncludeEntities?: boolean;
  public TweetMode?: TweetMode;

  private static isIGetUserFavoriteTweetsParameters(usernameOrIdOrUserOrParameters: | string | number | IUserIdentifier | IGetUserFavoriteTweetsParameters):
    usernameOrIdOrUserOrParameters is IGetUserFavoriteTweetsParameters {
    return (usernameOrIdOrUserOrParameters as IGetUserFavoriteTweetsParameters).User !== undefined;
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
