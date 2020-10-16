import Task from 'src/app/c#-objects/TypeScript.NET-Core/packages/Threading/source/Tasks/Task';
import {ITwitterResult} from "../../core/Core/Web/TwitterResult";
import {ITwitterRequest} from "../../core/Public/Models/Interfaces/ITwitterRequest";
import {ITweetQueryGenerator} from "../../core/Core/QueryGenerators/ITweetQueryGenerator";
import {ITwitterAccessor} from 'src/app/core/Core/Web/ITwitterAccessor';
import {ComputedTweetMode} from "../../core/Core/QueryGenerators/ComputedTweetMode";
import {HttpMethod} from "../../core/Public/Models/Enum/HttpMethod";

export interface ITweetQueryExecutor {
  GetTweetAsync(parameters: IGetTweetParameters, request: ITwitterRequest): Task<ITwitterResult<ITweetDTO>>

  GetTweetsAsync(parameters: IGetTweetsParameters, request: ITwitterRequest): Task<ITwitterResult<ITweetDTO[]>>

  PublishTweetAsync(parameters: IPublishTweetParameters, request: ITwitterRequest): Task<ITwitterResult<ITweetDTO>>


  // Publish Retweet
  PublishRetweetAsync(parameters: IPublishRetweetParameters, request: ITwitterRequest): Task<ITwitterResult<ITweetDTO>>

  // UnRetweet
  DestroyRetweetAsync(parameters: IDestroyRetweetParameters, request: ITwitterRequest): Task<ITwitterResult<ITweetDTO>>

  // Get Retweets
  GetRetweetsAsync(parameters: IGetRetweetsParameters, request: ITwitterRequest): Task<ITwitterResult<ITweetDTO[]>>

  //Get Retweeters Ids
  GetRetweeterIdsAsync(parameters: IGetRetweeterIdsParameters, request: ITwitterRequest): Task<ITwitterResult<IIdsCursorQueryResultDTO>>

  // Destroy Tweet
  DestroyTweetAsync(parameters: IDestroyTweetParameters, request: ITwitterRequest): Task<ITwitterResult<ITweetDTO>>

  // Favorite Tweet
  FavoriteTweetAsync(parameters: IFavoriteTweetParameters, request: ITwitterRequest): Task<ITwitterResult<ITweetDTO>>

  UnfavoriteTweetAsync(parameters: IUnfavoriteTweetParameters, request: ITwitterRequest): Task<ITwitterResult<ITweetDTO>>

  GetFavoriteTweetsAsync(parameters: IGetUserFavoriteTweetsParameters, request: ITwitterRequest): Task<ITwitterResult<ITweetDTO[]>>

  GetOEmbedTweetAsync(parameters: IGetOEmbedTweetParameters, request: ITwitterRequest): Task<ITwitterResult<IOEmbedTweetDTO>>
}

export class TweetQueryExecutor implements ITweetQueryExecutor {
  private readonly _tweetQueryGenerator: ITweetQueryGenerator;
  private readonly _twitterAccessor: ITwitterAccessor;

  constructor(tweetQueryGenerator: ITweetQueryGenerator, twitterAccessor: ITwitterAccessor) {
    this._tweetQueryGenerator = tweetQueryGenerator;
    this._twitterAccessor = twitterAccessor;
  }

  public GetTweetAsync(parameters: IGetTweetParameters, request: ITwitterRequest): Task<ITwitterResult<ITweetDTO>> {
    var query = this._tweetQueryGenerator.getTweetQuery(parameters, new ComputedTweetMode(parameters, request));
    request.query.url = query;
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<ITweetDTO>(request);
  }

  public GetTweetsAsync(parameters: IGetTweetsParameters, request: ITwitterRequest): Task<ITwitterResult<ITweetDTO[]>> {
    var query = this._tweetQueryGenerator.getTweetsQuery(parameters, new ComputedTweetMode(parameters, request));
    request.query.url = query;
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<ITweetDTO[]>(request);
  }

  public PublishTweetAsync(parameters: IPublishTweetParameters, request: ITwitterRequest): Task<ITwitterResult<ITweetDTO>> {
    var query = this._tweetQueryGenerator.getPublishTweetQuery(parameters, new ComputedTweetMode(parameters, request));
    request.query.url = query;
    request.query.httpMethod = HttpMethod.POST;
    return this._twitterAccessor.executeRequestAsync<ITweetDTO>(request);
  }

  // Publish Retweet
  public GetRetweetsAsync(parameters: IGetRetweetsParameters, request: ITwitterRequest): Task<ITwitterResult<ITweetDTO[]>> {
    var query = this._tweetQueryGenerator.getRetweetsQuery(parameters, new ComputedTweetMode(parameters, request));
    request.query.url = query;
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<ITweetDTO[]>(request);
  }

  public PublishRetweetAsync(parameters: IPublishRetweetParameters, request: ITwitterRequest): Task<ITwitterResult<ITweetDTO>> {
    var query = this._tweetQueryGenerator.getPublishRetweetQuery(parameters, new ComputedTweetMode(parameters, request));
    request.query.url = query;
    request.query.httpMethod = HttpMethod.POST;
    return this._twitterAccessor.executeRequestAsync<ITweetDTO>(request);
  }

  // Publish UnRetweet
  public DestroyRetweetAsync(parameters: IDestroyRetweetParameters, request: ITwitterRequest): Task<ITwitterResult<ITweetDTO>> {
    var query = this._tweetQueryGenerator.getDestroyRetweetQuery(parameters, new ComputedTweetMode(parameters, request));
    request.query.url = query;
    request.query.httpMethod = HttpMethod.POST;
    return this._twitterAccessor.executeRequestAsync<ITweetDTO>(request);
  }

  // #region Get Retweeters IDs

  public GetRetweeterIdsAsync(parameters: IGetRetweeterIdsParameters, request: ITwitterRequest): Task<ITwitterResult<IIdsCursorQueryResultDTO>> {
    var query = this._tweetQueryGenerator.getRetweeterIdsQuery(parameters);
    request.query.url = query;
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<IIdsCursorQueryResultDTO>(request);
  }

  // #endregion;

  // Destroy Tweet
  public DestroyTweetAsync(parameters: IDestroyTweetParameters, request: ITwitterRequest): Task<ITwitterResult<ITweetDTO>> {
    var query = this._tweetQueryGenerator.getDestroyTweetQuery(parameters, new ComputedTweetMode(parameters, request));
    request.query.url = query;
    request.query.httpMethod = HttpMethod.POST;
    return this._twitterAccessor.executeRequestAsync<ITweetDTO>(request);
  }

  // Favorite Tweet
  public GetFavoriteTweetsAsync(parameters: IGetUserFavoriteTweetsParameters, request: ITwitterRequest): Task<ITwitterResult<ITweetDTO[]>> {
    var query = this._tweetQueryGenerator.getFavoriteTweetsQuery(parameters, new ComputedTweetMode(parameters, request));
    request.query.url = query;
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<ITweetDTO[]>(request);
  }

  public GetOEmbedTweetAsync(parameters: IGetOEmbedTweetParameters, request: ITwitterRequest): Task<ITwitterResult<IOEmbedTweetDTO>> {
    var query = this._tweetQueryGenerator.getOEmbedTweetQuery(parameters);
    request.query.url = query;
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<IOEmbedTweetDTO>(request);
  }

  public FavoriteTweetAsync(parameters: IFavoriteTweetParameters, request: ITwitterRequest): Task<ITwitterResult<ITweetDTO>> {
    var query = this._tweetQueryGenerator.getCreateFavoriteTweetQuery(parameters);
    request.query.url = query;
    request.query.httpMethod = HttpMethod.POST;
    return this._twitterAccessor.executeRequestAsync<ITweetDTO>(request);
  }

  public UnfavoriteTweetAsync(parameters: IUnfavoriteTweetParameters, request: ITwitterRequest): Task<ITwitterResult<ITweetDTO>> {
    var query = this._tweetQueryGenerator.getUnfavoriteTweetQuery(parameters);
    request.query.url = query;
    request.query.httpMethod = HttpMethod.POST;
    return this._twitterAccessor.executeRequestAsync<ITweetDTO>(request);
  }
}
