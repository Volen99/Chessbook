import {IGetOEmbedTweetParameters} from "../../../Public/Parameters/TweetsClient/GetOEmbedTweetParameters";
import {IUnfavoriteTweetParameters} from "../../../Public/Parameters/TweetsClient/UnFavoriteTweetParameters";
import {IFavoriteTweetParameters} from "../../../Public/Parameters/TweetsClient/FavoriteTweetParameters";
import {IGetRetweeterIdsParameters} from "../../../Public/Parameters/TweetsClient/GetRetweeterIdsParameters";
import {IDestroyRetweetParameters} from "../../../Public/Parameters/TweetsClient/DestroyRetweetParameters";
import {IPublishRetweetParameters} from "../../../Public/Parameters/TweetsClient/PublishRetweetParameters";
import {IGetRetweetsParameters} from "../../../Public/Parameters/TweetsClient/GetRetweetsParameters";
import {IGetUserFavoriteTweetsParameters} from "../../../Public/Parameters/TweetsClient/GetFavoriteTweetsParameters";
import {IDestroyTweetParameters} from "../../../Public/Parameters/TweetsClient/DestroyTweetParameters";
import {IPublishTweetParameters} from "../../../Public/Parameters/TweetsClient/PublishTweetParameters";
import {IGetTweetsParameters} from "../../../Public/Parameters/TweetsClient/GetTweetsParameters";
import {IGetTweetParameters} from "../../../Public/Parameters/TweetsClient/GetTweetParameters";
import {ITweetsClientRequiredParametersValidator} from "./TweetsClientRequiredParametersValidator";
import {ITwitterClient} from "../../../Public/ITwitterClient";
import {TwitterLimits} from 'src/app/core/Public/Settings/TwitterLimits';
import {TweetsParameters} from "./parameters-types";
import {TwitterArgumentLimitException} from 'src/app/core/Public/Exceptions/TwitterArgumentLimitException';
import {InjectionToken} from "@angular/core";

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

export const ITweetsClientParametersValidatorToken = new InjectionToken<ITweetsClientParametersValidator>('ITweetsClientParametersValidator', {
  providedIn: 'root',
  factory: () => new TweetsClientParametersValidator(),
});

export class TweetsClientParametersValidator implements ITweetsClientParametersValidator {
  private readonly _tweetsClientRequiredParametersValidator: ITweetsClientRequiredParametersValidator;
  private readonly _client: ITwitterClient;

  constructor(client: ITwitterClient, tweetsClientRequiredParametersValidator: ITweetsClientRequiredParametersValidator) {
    this._client = client;
    this._tweetsClientRequiredParametersValidator = tweetsClientRequiredParametersValidator;
  }

  private get Limits(): TwitterLimits {
    return this._client.config.limits;
  }

  public validate(parameters: TweetsParameters): void {
    this._tweetsClientRequiredParametersValidator.validate(parameters);

    if (this.isIGetTweetsParameters(parameters)) {
      let maxPageSize = this.Limits.TWEETS_GET_TWEETS_REQUEST_MAX_SIZE;
      if (parameters.tweets.length > maxPageSize) {
        throw new TwitterArgumentLimitException(`${nameof(parameters.tweets)}`, maxPageSize, nameof(this.Limits.TWEETS_GET_TWEETS_REQUEST_MAX_SIZE), "items");
      }
    } else if (this.isIGetUserFavoriteTweetsParameters(parameters)) {
      this._tweetsClientRequiredParametersValidator.validate(parameters);

      let maxPageSize = this.Limits.TWEETS_GET_FAVORITE_TWEETS_MAX_SIZE;
      if (parameters.pageSize > maxPageSize) {
        throw new TwitterArgumentLimitException(`${nameof(parameters.pageSize)}`, maxPageSize, nameof(this.Limits.TWEETS_GET_FAVORITE_TWEETS_MAX_SIZE), "page size");
      }
    } else if (this.isIGetRetweetsParameters(parameters)) {
      let maxPageSize = this.Limits.TWEETS_GET_RETWEETS_MAX_SIZE;
      if (parameters.pageSize > maxPageSize) {
        throw new TwitterArgumentLimitException(`${nameof(parameters.pageSize)}`, maxPageSize, nameof(this.Limits.TWEETS_GET_RETWEETS_MAX_SIZE), "page size");
      }
    } else if (this.isIGetRetweeterIdsParameters(parameters)) {
      let maxPageSize = this.Limits.TWEETS_GET_RETWEETER_IDS_MAX_PAGE_SIZE;
      if (parameters.pageSize > maxPageSize) {
        throw new TwitterArgumentLimitException(`${nameof(parameters.pageSize)}`, maxPageSize, nameof(this.Limits.TWEETS_GET_RETWEETER_IDS_MAX_PAGE_SIZE), "page size");
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
