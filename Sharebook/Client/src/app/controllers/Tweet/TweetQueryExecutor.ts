import {inject, Inject, InjectionToken} from "@angular/core";

import {ITwitterResult} from "../../core/Core/Web/TwitterResult";
import {ITwitterRequest} from "../../core/Public/Models/Interfaces/ITwitterRequest";
import {ITweetQueryGenerator, ITweetQueryGeneratorToken} from "../../core/Core/QueryGenerators/ITweetQueryGenerator";
import {ITwitterAccessor, ITwitterAccessorToken} from 'src/app/core/Core/Web/ITwitterAccessor';
import {ComputedTweetMode} from "../../core/Core/QueryGenerators/ComputedTweetMode";
import {HttpMethod} from "../../core/Public/Models/Enum/HttpMethod";
import {IGetOEmbedTweetParameters} from "../../core/Public/Parameters/TweetsClient/GetOEmbedTweetParameters";
import {IGetUserFavoriteTweetsParameters} from "../../core/Public/Parameters/TweetsClient/GetFavoriteTweetsParameters";
import {IUnfavoriteTweetParameters} from "../../core/Public/Parameters/TweetsClient/UnFavoriteTweetParameters";
import {IFavoriteTweetParameters} from "../../core/Public/Parameters/TweetsClient/FavoriteTweetParameters";
import {IDestroyTweetParameters} from "../../core/Public/Parameters/TweetsClient/DestroyTweetParameters";
import {IGetRetweeterIdsParameters} from "../../core/Public/Parameters/TweetsClient/GetRetweeterIdsParameters";
import {IGetRetweetsParameters} from "../../core/Public/Parameters/TweetsClient/GetRetweetsParameters";
import {IDestroyRetweetParameters} from "../../core/Public/Parameters/TweetsClient/DestroyRetweetParameters";
import {IPublishRetweetParameters} from "../../core/Public/Parameters/TweetsClient/PublishRetweetParameters";
import {IPublishTweetParameters} from "../../core/Public/Parameters/TweetsClient/PublishTweetParameters";
import {IGetTweetsParameters} from "../../core/Public/Parameters/TweetsClient/GetTweetsParameters";
import {IGetTweetParameters} from "../../core/Public/Parameters/TweetsClient/GetTweetParameters";
import {ITweetDTO} from "../../core/Public/Models/Interfaces/DTO/ITweetDTO";
import {IIdsCursorQueryResultDTO} from "../../core/Public/Models/Interfaces/DTO/QueryDTO/IIdsCursorQueryResultDTO";
import {IOEmbedTweetDTO} from "../../core/Public/Models/Interfaces/DTO/IOembedTweetDTO";
import {TweetQueryGenerator} from "./TweetQueryGenerator";
import {TwitterAccessor} from "../../Tweetinvi.Credentials/TwitterAccessor";

export interface ITweetQueryExecutor {
  getTweetAsync(parameters: IGetTweetParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO>>;

  getTweetsAsync(parameters: IGetTweetsParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO[]>>;

  publishTweetAsync(parameters: IPublishTweetParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO>>;


  // Publish Retweet
  publishRetweetAsync(parameters: IPublishRetweetParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO>>;

  // UnRetweet
  destroyRetweetAsync(parameters: IDestroyRetweetParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO>>;

  // Get Retweets
  getRetweetsAsync(parameters: IGetRetweetsParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO[]>>;

  // Get Retweeters Ids
  getRetweeterIdsAsync(parameters: IGetRetweeterIdsParameters, request: ITwitterRequest): Promise<ITwitterResult<IIdsCursorQueryResultDTO>>;

  // Destroy Tweet
  destroyTweetAsync(parameters: IDestroyTweetParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO>>;

  // Favorite Tweet
  favoriteTweetAsync(parameters: IFavoriteTweetParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO>>;

  unfavoriteTweetAsync(parameters: IUnfavoriteTweetParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO>>;

  getFavoriteTweetsAsync(parameters: IGetUserFavoriteTweetsParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO[]>>;

  getOEmbedTweetAsync(parameters: IGetOEmbedTweetParameters, request: ITwitterRequest): Promise<ITwitterResult<IOEmbedTweetDTO>>;
}

export const ITweetQueryExecutorToken = new InjectionToken<ITweetQueryExecutor>('ITweetQueryExecutor', {
  providedIn: 'root',
  factory: () => new TweetQueryExecutor(inject(TweetQueryGenerator), inject(TwitterAccessor)),
});

export class TweetQueryExecutor implements ITweetQueryExecutor {
  private readonly _tweetQueryGenerator: ITweetQueryGenerator;
  private readonly _twitterAccessor: ITwitterAccessor;

  constructor(@Inject(ITweetQueryGeneratorToken) tweetQueryGenerator: ITweetQueryGenerator,
              @Inject(ITwitterAccessorToken) twitterAccessor: ITwitterAccessor) {
    this._tweetQueryGenerator = tweetQueryGenerator;
    this._twitterAccessor = twitterAccessor;
  }

  public getTweetAsync(parameters: IGetTweetParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO>> {
    let query = this._tweetQueryGenerator.getTweetQuery(parameters, new ComputedTweetMode(parameters, request));
    request.query.url = query;
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<ITweetDTO>(request);
  }

  public getTweetsAsync(parameters: IGetTweetsParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO[]>> {
    let query = this._tweetQueryGenerator.getTweetsQuery(parameters, new ComputedTweetMode(parameters, request));
    request.query.url = query;
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<ITweetDTO[]>(request);
  }

  public publishTweetAsync(parameters: IPublishTweetParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO>> {
    let query = this._tweetQueryGenerator.getPublishTweetQuery(parameters, new ComputedTweetMode(parameters, request));
    request.query.url = query;
    request.query.httpMethod = HttpMethod.POST;
    return this._twitterAccessor.executeRequestAsync<ITweetDTO>(request);
  }

  // Publish Retweet
  public getRetweetsAsync(parameters: IGetRetweetsParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO[]>> {
    let query = this._tweetQueryGenerator.getRetweetsQuery(parameters, new ComputedTweetMode(parameters, request));
    request.query.url = query;
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<ITweetDTO[]>(request);
  }

  public publishRetweetAsync(parameters: IPublishRetweetParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO>> {
    let query = this._tweetQueryGenerator.getPublishRetweetQuery(parameters, new ComputedTweetMode(parameters, request));
    request.query.url = query;
    request.query.httpMethod = HttpMethod.POST;
    return this._twitterAccessor.executeRequestAsync<ITweetDTO>(request);
  }

  // Publish UnRetweet
  public destroyRetweetAsync(parameters: IDestroyRetweetParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO>> {
    let query = this._tweetQueryGenerator.getDestroyRetweetQuery(parameters, new ComputedTweetMode(parameters, request));
    request.query.url = query;
    request.query.httpMethod = HttpMethod.POST;
    return this._twitterAccessor.executeRequestAsync<ITweetDTO>(request);
  }

  // #region Get Retweeters IDs

  public getRetweeterIdsAsync(parameters: IGetRetweeterIdsParameters, request: ITwitterRequest): Promise<ITwitterResult<IIdsCursorQueryResultDTO>> {
    let query = this._tweetQueryGenerator.getRetweeterIdsQuery(parameters);
    request.query.url = query;
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<IIdsCursorQueryResultDTO>(request);
  }

  // #endregion;

  // Destroy Tweet
  public destroyTweetAsync(parameters: IDestroyTweetParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO>> {
    let query = this._tweetQueryGenerator.getDestroyTweetQuery(parameters, new ComputedTweetMode(parameters, request));
    request.query.url = query;
    request.query.httpMethod = HttpMethod.POST;
    return this._twitterAccessor.executeRequestAsync<ITweetDTO>(request);
  }

  // Favorite Tweet
  public getFavoriteTweetsAsync(parameters: IGetUserFavoriteTweetsParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO[]>> {
    let query = this._tweetQueryGenerator.getFavoriteTweetsQuery(parameters, new ComputedTweetMode(parameters, request));
    request.query.url = query;
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<ITweetDTO[]>(request);
  }

  public getOEmbedTweetAsync(parameters: IGetOEmbedTweetParameters, request: ITwitterRequest): Promise<ITwitterResult<IOEmbedTweetDTO>> {
    let query = this._tweetQueryGenerator.getOEmbedTweetQuery(parameters);
    request.query.url = query;
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<IOEmbedTweetDTO>(request);
  }

  public favoriteTweetAsync(parameters: IFavoriteTweetParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO>> {
    let query = this._tweetQueryGenerator.getCreateFavoriteTweetQuery(parameters);
    request.query.url = query;
    request.query.httpMethod = HttpMethod.POST;
    return this._twitterAccessor.executeRequestAsync<ITweetDTO>(request);
  }

  public unfavoriteTweetAsync(parameters: IUnfavoriteTweetParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO>> {
    let query = this._tweetQueryGenerator.getUnfavoriteTweetQuery(parameters);
    request.query.url = query;
    request.query.httpMethod = HttpMethod.POST;
    return this._twitterAccessor.executeRequestAsync<ITweetDTO>(request);
  }
}
