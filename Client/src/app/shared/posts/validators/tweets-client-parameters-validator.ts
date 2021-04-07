import {inject, Inject, Injectable, InjectionToken} from "@angular/core";
import {IGetTweetParameters} from "../parameters/get-tweet-parameters";
import {IGetTweetsParameters} from "../parameters/get-tweets-parameters";
import {IPublishTweetParameters} from "../parameters/publish-tweet-parameters";
import {IDestroyTweetParameters} from "../parameters/destroy-tweet-parameters";
import {IGetUserFavoriteTweetsParameters} from "../parameters/get-favorite-tweets-Parameters";
import {IGetRetweetsParameters} from "../parameters/get-retweets-parameters";
import {IPublishRetweetParameters} from "../parameters/publish-retweet-parameters";
import {IDestroyRetweetParameters} from "../parameters/destroy-retweet-parameters";
import {IGetRetweeterIdsParameters} from "../parameters/get-retweeter-ids-parameters";
import {IFavoriteTweetParameters} from "../parameters/favorite-tweet-parameters";
import {IUnfavoriteTweetParameters} from "../parameters/unfavorite-tweet-parameters";
import {IGetOEmbedTweetParameters} from "../parameters/get-OEmbed-tweet-parameters";
import {
  ITweetsClientRequiredParametersValidator,
  TweetsParameters
} from "./tweets-client-required-parameters-validator";
import {SharebookLimits} from "../../../helpers/sharebook-limits";



export interface ITweetsClientParametersValidator {
  validate(parameters: IGetTweetParameters): void;

  validate(parameters: IGetTweetsParameters): void;

  validate(parameters: IPublishTweetParameters): void;

  validate(parameters: IDestroyTweetParameters): void;

  validate(parameters: IGetUserFavoriteTweetsParameters): void;

  validate(parameters: IGetRetweetsParameters): void;

  validate(parameters: IPublishRetweetParameters): void;

  validate(parameters: IDestroyRetweetParameters): void;

  validate(parameters: IGetRetweeterIdsParameters): void;

  validate(parameters: IFavoriteTweetParameters): void;

  validate(parameters: IUnfavoriteTweetParameters): void;

  validate(parameters: IGetOEmbedTweetParameters): void;
}

export class TweetsClientParametersValidator implements ITweetsClientParametersValidator {
  private readonly _tweetsClientRequiredParametersValidator: ITweetsClientRequiredParametersValidator;

  constructor(tweetsClientRequiredParametersValidator?: ITweetsClientRequiredParametersValidator) { // ? by mi
    this._tweetsClientRequiredParametersValidator = tweetsClientRequiredParametersValidator;
  }

  // private get Limits(): SharebookLimits {
  //   return this._client.config.limits;
  // }

  public validate(parameters: IGetTweetParameters | IGetTweetsParameters | IPublishTweetParameters
  | IDestroyTweetParameters | IGetUserFavoriteTweetsParameters | IGetRetweetsParameters
  | IPublishRetweetParameters | IDestroyRetweetParameters | IGetRetweeterIdsParameters
  | IFavoriteTweetParameters | IUnfavoriteTweetParameters | IGetOEmbedTweetParameters): void {
    // @ts-ignore
    this._tweetsClientRequiredParametersValidator.validate(parameters);

    if (this.isIGetTweetsParameters(parameters)) {
      let maxPageSize = SharebookLimits.TWEETS_GET_TWEETS_REQUEST_MAX_SIZE;
      if (parameters.tweets.length > maxPageSize) {
        throw new Error("${nameof(parameters.pageSize)} maxPageSize, nameof(this.Limits.TWEETS_GET_FAVORITE_TWEETS_MAX_SIZE), page size");
      }
    } else if (this.isIGetUserFavoriteTweetsParameters(parameters)) {
      this._tweetsClientRequiredParametersValidator.validate(parameters);

      let maxPageSize = SharebookLimits.TWEETS_GET_FAVORITE_TWEETS_MAX_SIZE;
      if (parameters.pageSize > maxPageSize) {
        throw new Error("${nameof(parameters.pageSize)} maxPageSize, nameof(this.Limits.TWEETS_GET_FAVORITE_TWEETS_MAX_SIZE), page size");
      }
    } else if (this.isIGetRetweetsParameters(parameters)) {
      let maxPageSize = SharebookLimits.TWEETS_GET_RETWEETS_MAX_SIZE;
      if (parameters.pageSize > maxPageSize) {
        throw new Error("${nameof(parameters.pageSize)} maxPageSize, nameof(this.Limits.TWEETS_GET_RETWEETS_MAX_SIZE), page size");
      }
    } else if (this.isIGetRetweeterIdsParameters(parameters)) {
      let maxPageSize = SharebookLimits.TWEETS_GET_RETWEETER_IDS_MAX_PAGE_SIZE;
      if (parameters.pageSize > maxPageSize) {
        throw new Error("${nameof(parameters.pageSize)} maxPageSize, nameof(this.Limits.TWEETS_GET_RETWEETER_IDS_MAX_PAGE_SIZE), page size");
      }
    }
  }

  private isIGetTweetsParameters(parameters: TweetsParameters): parameters is IGetTweetsParameters {
    return (parameters as IGetTweetsParameters).tweets !== undefined;
  }

  private isIGetUserFavoriteTweetsParameters(parameters: TweetsParameters): parameters is IGetUserFavoriteTweetsParameters {
    return (parameters as IGetUserFavoriteTweetsParameters).user !== undefined;
  }

  private isIGetRetweetsParameters(parameters: TweetsParameters): parameters is IGetRetweetsParameters {
    return (parameters as IGetRetweetsParameters).pageSize !== undefined;
  }

  private isIGetRetweeterIdsParameters(parameters: TweetsParameters): parameters is IGetRetweeterIdsParameters {
    return (parameters as IGetRetweeterIdsParameters).tweet !== undefined;
  }
}
