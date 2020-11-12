import {inject, Inject, Injectable, InjectionToken} from "@angular/core";

import {ITweetsClientParametersValidator} from "./TweetsClientParametersValidator";
import {IUserQueryValidator, IUserQueryValidatorToken, UserQueryValidator} from "./UserQueryValidator";
import {TweetsParameters} from "./parameters-types";
import {IDestroyTweetParameters} from "../../../Public/Parameters/TweetsClient/DestroyTweetParameters";
import {IGetRetweetsParameters} from "../../../Public/Parameters/TweetsClient/GetRetweetsParameters";
import {IPublishRetweetParameters} from "../../../Public/Parameters/TweetsClient/PublishRetweetParameters";
import {IDestroyRetweetParameters} from "../../../Public/Parameters/TweetsClient/DestroyRetweetParameters";
import {IFavoriteTweetParameters} from "../../../Public/Parameters/TweetsClient/FavoriteTweetParameters";
import {IUnfavoriteTweetParameters} from "../../../Public/Parameters/TweetsClient/UnFavoriteTweetParameters";
import {IGetOEmbedTweetParameters} from "../../../Public/Parameters/TweetsClient/GetOEmbedTweetParameters";
import {ITweetIdentifier} from "../../../Public/Models/Interfaces/ITweetIdentifier";
import {IGetTweetsParameters} from "../../../Public/Parameters/TweetsClient/GetTweetsParameters";
import {IPublishTweetParameters} from "../../../Public/Parameters/TweetsClient/PublishTweetParameters";
import {IGetUserFavoriteTweetsParameters} from "../../../Public/Parameters/TweetsClient/GetFavoriteTweetsParameters";
import ArgumentNullException from "typescript-dotnet-commonjs/System/Exceptions/ArgumentNullException";
import ArgumentException from "typescript-dotnet-commonjs/System/Exceptions/ArgumentException";

export interface ITweetsClientRequiredParametersValidator extends ITweetsClientParametersValidator {
}

export const ITweetsClientRequiredParametersValidatorToken = new InjectionToken<ITweetsClientRequiredParametersValidator>('ITweetsClientRequiredParametersValidator', {
  providedIn: 'root',
  factory: () => new TweetsClientRequiredParametersValidator(inject(UserQueryValidator)),
});

type ParametersForThrowIfTweetBad = IDestroyTweetParameters
  | IGetRetweetsParameters
  | IPublishRetweetParameters
  | IDestroyRetweetParameters
  | IFavoriteTweetParameters
  | IUnfavoriteTweetParameters
  | IGetOEmbedTweetParameters;

@Injectable({
  providedIn: 'root',
})
export class TweetsClientRequiredParametersValidator implements ITweetsClientRequiredParametersValidator {
  private readonly _userQueryValidator: IUserQueryValidator;

  constructor(@Inject(IUserQueryValidatorToken) userQueryValidator: IUserQueryValidator) {
    this._userQueryValidator = userQueryValidator;
  }

  public validate(parameters: TweetsParameters): void {
    if (parameters == null) {
      throw new ArgumentNullException(`nameof(parameters)`);
    }

    if (this.isParametersForThrowIfTweetBad(parameters)) {
      this.throwIfTweetCannotBeUsed(parameters.tweet, `${`nameof(parameters.tweet)`}`);
    } else if (this.isIGetTweetsParameters(parameters)) {
      if (parameters.tweets == null) {
        throw new ArgumentNullException('ArgumentNull_Generic');
      }

      if (parameters.tweets.length === 0) {
        throw new ArgumentException("You need at least 1 tweet id", `${`nameof(parameters.tweets)`}`);
      }

      let validTweetIdentifiers = parameters.tweets.filter(x => x?.id != null || !!x?.idStr);

      if (!(validTweetIdentifiers.length > 0)) {
        throw new ArgumentException("There are no valid tweet identifiers", `${`nameof(parameters.tweets)`}`);
      }
    } else if (this.isIPublishTweetParameters(parameters)) {
      if (parameters.inReplyToTweet != null) {
        this.throwIfTweetCannotBeUsed(parameters.inReplyToTweet);
      }

      if (parameters.quotedTweet != null) {
        this.throwIfTweetCannotBeUsed(parameters.quotedTweet);
      }

      if (parameters.medias.some(x => !x.hasBeenUploaded)) {
        throw new ArgumentException("Some media were not uploaded", `${`nameof(parameters.medias)`}`);
      }
    } else if (this.isIGetUserFavoriteTweetsParameters(parameters)) {
      this._userQueryValidator.throwIfUserCannotBeIdentified(parameters.user, `${`nameof(parameters.user)`}`);
    }
  }

  public throwIfTweetCannotBeUsed(tweet: ITweetIdentifier, parameterName?: string): void {
    if (!parameterName) {
      parameterName = `${`nameof(tweet)`}.${`nameof(tweet.id)`}`;
    }

    if (tweet == null) {
      throw new ArgumentNullException(`${`nameof(tweet)`}`);
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
    return (parameters as IGetTweetsParameters).includeCardUri !== undefined;
  }

  private isIPublishTweetParameters(parameters: TweetsParameters): parameters is IPublishTweetParameters {
    return (parameters as IPublishTweetParameters).medias !== undefined;
  }

  private isIGetUserFavoriteTweetsParameters(parameters: TweetsParameters): parameters is IGetUserFavoriteTweetsParameters {
    return (parameters as IGetUserFavoriteTweetsParameters).includeEntities !== undefined;
  }
}
