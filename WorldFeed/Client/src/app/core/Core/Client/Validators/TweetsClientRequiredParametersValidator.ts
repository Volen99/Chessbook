import {ITweetsClientParametersValidator} from "./TweetsClientParametersValidator";
import {IUserQueryValidator} from "./UserQueryValidator";
import {TweetsParameters} from "./parameters-types";
import ArgumentNullException from 'src/app/c#-objects/TypeScript.NET-Core/packages/Core/source/Exceptions/ArgumentNullException';
import {IDestroyTweetParameters} from "../../../Public/Parameters/TweetsClient/DestroyTweetParameters";
import {IGetRetweetsParameters} from "../../../Public/Parameters/TweetsClient/GetRetweetsParameters";
import {IPublishRetweetParameters} from "../../../Public/Parameters/TweetsClient/PublishRetweetParameters";
import {IDestroyRetweetParameters} from "../../../Public/Parameters/TweetsClient/DestroyRetweetParameters";
import {IFavoriteTweetParameters} from "../../../Public/Parameters/TweetsClient/FavoriteTweetParameters";
import {IUnfavoriteTweetParameters} from "../../../Public/Parameters/TweetsClient/UnFavoriteTweetParameters";
import {IGetOEmbedTweetParameters} from "../../../Public/Parameters/TweetsClient/GetOEmbedTweetParameters";
import {ITweetIdentifier} from "../../../Public/Models/Interfaces/ITweetIdentifier";
import {IGetTweetsParameters} from "../../../Public/Parameters/TweetsClient/GetTweetsParameters";
import ArgumentException from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Exceptions/ArgumentException";
import {IPublishTweetParameters} from "../../../Public/Parameters/TweetsClient/PublishTweetParameters";
import {IGetUserFavoriteTweetsParameters} from "../../../Public/Parameters/TweetsClient/GetFavoriteTweetsParameters";

export interface ITweetsClientRequiredParametersValidator extends ITweetsClientParametersValidator {
}

type ParametersForThrowIfTweetBad = IDestroyTweetParameters
  | IGetRetweetsParameters
  | IPublishRetweetParameters
  | IDestroyRetweetParameters
  | IFavoriteTweetParameters
  | IUnfavoriteTweetParameters
  | IGetOEmbedTweetParameters;

export class TweetsClientRequiredParametersValidator implements ITweetsClientRequiredParametersValidator {
  private readonly _userQueryValidator: IUserQueryValidator;

  constructor(userQueryValidator: IUserQueryValidator) {
    this._userQueryValidator = userQueryValidator;
  }

  public validate(parameters: TweetsParameters): void {
    if (parameters == null) {
      throw new ArgumentNullException(nameof(parameters));
    }

    if (this.isParametersForThrowIfTweetBad(parameters)) {
      this.throwIfTweetCannotBeUsed(parameters.Tweet, `${nameof(parameters.Tweet)}`);
    } else if (this.isIGetTweetsParameters(parameters)) {
      if (parameters.Tweets == null) {
        throw new ArgumentNullException('ArgumentNull_Generic');
      }

      if (parameters.Tweets.length === 0) {
        throw new ArgumentException("You need at least 1 tweet id", `${nameof(parameters.Tweets)}`);
      }

      let validTweetIdentifiers = parameters.Tweets.filter(x => x?.id != null || !!x?.idStr);

      if (!(validTweetIdentifiers.length > 0)) {
        throw new ArgumentException("There are no valid tweet identifiers", `${nameof(parameters.Tweets)}`);
      }
    } else if (this.isIPublishTweetParameters(parameters)) {
      if (parameters.InReplyToTweet != null) {
        this.throwIfTweetCannotBeUsed(parameters.InReplyToTweet);
      }

      if (parameters.QuotedTweet != null) {
        this.throwIfTweetCannotBeUsed(parameters.QuotedTweet);
      }

      if (parameters.Medias.some(x => !x.hasBeenUploaded)) {
        throw new ArgumentException("Some media were not uploaded", `${nameof(parameters.Medias)}`);
      }
    } else if (this.isIGetUserFavoriteTweetsParameters(parameters)) {
      this._userQueryValidator.throwIfUserCannotBeIdentified(parameters.User, `${nameof(parameters.User)}`);
    }
  }

  public throwIfTweetCannotBeUsed(tweet: ITweetIdentifier, parameterName?: string): void {
    if (!parameterName) {
      parameterName = `${nameof(tweet)}.${nameof(tweet.id)}`;
    }

    if (tweet == null) {
      throw new ArgumentNullException(`${nameof(tweet)}`);
    }

    if (!this.isValidTweetIdentifier(tweet)) {
      throw new ArgumentException(parameterName);
    }
  }

  private isValidTweetIdentifier(tweetIdentifier: ITweetIdentifier): boolean {
    return tweetIdentifier != null && tweetIdentifier.id > 0;
  }

  private isParametersForThrowIfTweetBad(parameters: TweetsParameters): parameters is ParametersForThrowIfTweetBad {
    return (parameters as ParametersForThrowIfTweetBad).customQueryParameters !== undefined;
  }

  private isIGetTweetsParameters(parameters: TweetsParameters): parameters is IGetTweetsParameters {
    return (parameters as IGetTweetsParameters).IncludeCardUri !== undefined;
  }

  private isIPublishTweetParameters(parameters: TweetsParameters): parameters is IPublishTweetParameters {
    return (parameters as IPublishTweetParameters).Medias !== undefined;
  }

  private isIGetUserFavoriteTweetsParameters(parameters: TweetsParameters): parameters is IGetUserFavoriteTweetsParameters {
    return (parameters as IGetUserFavoriteTweetsParameters).IncludeEntities !== undefined;
  }
}
