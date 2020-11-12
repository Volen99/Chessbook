import {Inject, Injectable} from "@angular/core";

import {BaseRequester} from "../BaseRequester";
import {ITweetsRequester} from "../../../core/Public/Client/Requesters/ITweetsRequester";
import {ITwitterResult} from "../../../core/Core/Web/TwitterResult";
import {IOEmbedTweetDTO} from "../../../core/Public/Models/Interfaces/DTO/IOembedTweetDTO";
import {IGetOEmbedTweetParameters} from "../../../core/Public/Parameters/TweetsClient/GetOEmbedTweetParameters";
import {ITweetDTO} from "../../../core/Public/Models/Interfaces/DTO/ITweetDTO";
import {IUnfavoriteTweetParameters} from "../../../core/Public/Parameters/TweetsClient/UnFavoriteTweetParameters";
import {IFavoriteTweetParameters} from "../../../core/Public/Parameters/TweetsClient/FavoriteTweetParameters";
import {IGetUserFavoriteTweetsParameters} from "../../../core/Public/Parameters/TweetsClient/GetFavoriteTweetsParameters";
import {ITwitterPageIterator} from "../../../core/Core/Iterators/TwitterPageIterator";
import {IGetRetweeterIdsParameters} from "../../../core/Public/Parameters/TweetsClient/GetRetweeterIdsParameters";
import {IIdsCursorQueryResultDTO} from "../../../core/Public/Models/Interfaces/DTO/QueryDTO/IIdsCursorQueryResultDTO";
import {IDestroyRetweetParameters} from "../../../core/Public/Parameters/TweetsClient/DestroyRetweetParameters";
import {IPublishRetweetParameters} from "../../../core/Public/Parameters/TweetsClient/PublishRetweetParameters";
import {IGetRetweetsParameters} from "../../../core/Public/Parameters/TweetsClient/GetRetweetsParameters";
import {IDestroyTweetParameters} from "../../../core/Public/Parameters/TweetsClient/DestroyTweetParameters";
import {IPublishTweetParameters} from "../../../core/Public/Parameters/TweetsClient/PublishTweetParameters";
import {IGetTweetsParameters} from "../../../core/Public/Parameters/TweetsClient/GetTweetsParameters";
import {IGetTweetParameters} from "../../../core/Public/Parameters/TweetsClient/GetTweetParameters";
import {ITweetController, ITweetControllerToken} from "../../../core/Core/Controllers/ITweetController";
import {
  ITweetsClientRequiredParametersValidator,
  ITweetsClientRequiredParametersValidatorToken
} from "../../../core/Core/Client/Validators/TweetsClientRequiredParametersValidator";
import {ITwitterClient, ITwitterClientToken} from "../../../core/Public/ITwitterClient";
import {ITwitterRequest} from "../../../core/Public/Models/Interfaces/ITwitterRequest";
import {ITwitterClientEvents, ITwitterClientEventsToken} from "../../../core/Core/Events/TweetinviGlobalEvents";
import {JsonQueryConverterRepository} from "../../../core/Core/JsonConverters/JsonQueryConverterRepository";

@Injectable({
  providedIn: 'root',
})
export class TweetsRequester extends BaseRequester implements ITweetsRequester {
  private readonly _tweetController: ITweetController;
  private readonly _tweetsClientRequiredParametersValidator: ITweetsClientRequiredParametersValidator;

  constructor(@Inject(ITwitterClientToken) client: ITwitterClient,
              @Inject(ITwitterClientEventsToken) clientEvents: ITwitterClientEvents,
              @Inject(ITweetControllerToken) tweetController: ITweetController,
              @Inject(ITweetsClientRequiredParametersValidatorToken) tweetsClientRequiredParametersValidator: ITweetsClientRequiredParametersValidator) {
    super(client, clientEvents);

    this._tweetController = tweetController;
    this._tweetsClientRequiredParametersValidator = tweetsClientRequiredParametersValidator;
  }

  // Tweets
  public getTweetAsync(parameters: IGetTweetParameters): Promise<ITwitterResult<ITweetDTO>> {
    this._tweetsClientRequiredParametersValidator.validate(parameters);
    return super.executeRequestAsync(request => this._tweetController.getTweetAsync(parameters, request));
  }

  public getTweetsAsync(parameters: IGetTweetsParameters): Promise<ITwitterResult<ITweetDTO[]>> {
    this._tweetsClientRequiredParametersValidator.validate(parameters);
    return super.executeRequestAsync(request => this._tweetController.getTweetsAsync(parameters, request));
  }

  // Tweets - Publish
  public publishTweetAsync(parameters: IPublishTweetParameters): Promise<ITwitterResult<ITweetDTO>> {
    this._tweetsClientRequiredParametersValidator.validate(parameters);
    return super.executeRequestAsync(request => this._tweetController.publishTweetAsync(parameters, request));
  }

  // Tweets - Destroy
  public destroyTweetAsync(parameters: IDestroyTweetParameters): Promise<ITwitterResult<ITweetDTO>> {
    this._tweetsClientRequiredParametersValidator.validate(parameters);
    return super.executeRequestAsync(request => this._tweetController.destroyTweetAsync(parameters, request));
  }

  // Retweets
  public getRetweetsAsync(parameters: IGetRetweetsParameters): Promise<ITwitterResult<ITweetDTO[]>> {
    this._tweetsClientRequiredParametersValidator.validate(parameters);
    return super.executeRequestAsync(request => this._tweetController.getRetweetsAsync(parameters, request));
  }

  // Retweets - Publish
  public gublishRetweetAsync(parameters: IPublishRetweetParameters): Promise<ITwitterResult<ITweetDTO>> {
    this._tweetsClientRequiredParametersValidator.validate(parameters);
    return super.executeRequestAsync(request => this._tweetController.publishRetweetAsync(parameters, request));
  }

  // Retweets - Destroy
  public destroyRetweetAsync(parameters: IDestroyRetweetParameters): Promise<ITwitterResult<ITweetDTO>> {
    this._tweetsClientRequiredParametersValidator.validate(parameters);
    return super.executeRequestAsync(request => this._tweetController.destroyRetweetAsync(parameters, request));
  }

  public getRetweeterIdsIterator(parameters: IGetRetweeterIdsParameters): ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>> {
    this._tweetsClientRequiredParametersValidator.validate(parameters);
    let request: ITwitterRequest = super.TwitterClient.createRequest();
    request.executionContext.converters = JsonQueryConverterRepository.Converters;
    return this._tweetController.getRetweeterIdsIterator(parameters, request);
  }

  public getUserFavoriteTweetsIterator(parameters: IGetUserFavoriteTweetsParameters): ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, number> // long?
  {
    this._tweetsClientRequiredParametersValidator.validate(parameters);
    let request: ITwitterRequest = super.TwitterClient.createRequest();
    return this._tweetController.getFavoriteTweetsIterator(parameters, request);
  }

  public favoriteTweetAsync(parameters: IFavoriteTweetParameters): Promise<ITwitterResult<ITweetDTO>> {
    this._tweetsClientRequiredParametersValidator.validate(parameters);
    return super.executeRequestAsync(request => this._tweetController.favoriteTweetAsync(parameters, request));
  }

  public unfavoriteTweetAsync(parameters: IUnfavoriteTweetParameters): Promise<ITwitterResult<ITweetDTO>> {
    this._tweetsClientRequiredParametersValidator.validate(parameters);
    return super.executeRequestAsync(request => this._tweetController.unfavoriteTweetAsync(parameters, request));
  }

  public getOEmbedTweetAsync(parameters: IGetOEmbedTweetParameters): Promise<ITwitterResult<IOEmbedTweetDTO>> {
    this._tweetsClientRequiredParametersValidator.validate(parameters);
    return super.executeRequestAsync(request => this._tweetController.getOEmbedTweetAsync(parameters, request));
  }
}
