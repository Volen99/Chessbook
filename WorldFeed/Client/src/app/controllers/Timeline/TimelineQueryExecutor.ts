import {ITwitterAccessor} from "../../core/Core/Web/ITwitterAccessor";
import Task from 'src/app/c#-objects/TypeScript.NET-Core/packages/Threading/source/Tasks/Task';
import {ITwitterResult} from "../../core/Core/Web/TwitterResult";
import {ITwitterRequest} from "../../core/Public/Models/Interfaces/ITwitterRequest";
import {ComputedTweetMode} from "../../core/Core/QueryGenerators/ComputedTweetMode";
import {HttpMethod} from 'src/app/core/Public/Models/Enum/HttpMethod';

export interface ITimelineQueryExecutor {
  // Home Timeline
  GetHomeTimelineAsync(parameters: IGetHomeTimelineParameters, request: ITwitterRequest): Task<ITwitterResult<ITweetDTO[]>>

  // User Timeline
  GetUserTimelineAsync(parameters: IGetUserTimelineParameters, request: ITwitterRequest): Task<ITwitterResult<ITweetDTO[]>>

  // Mention Timeline
  GetMentionsTimelineAsync(parameters: IGetMentionsTimelineParameters, request: ITwitterRequest): Task<ITwitterResult<ITweetDTO[]>>

  // Retweets Of Me Timeline
  GetRetweetsOfMeTimelineAsync(parameters: IGetRetweetsOfMeTimelineParameters, request: ITwitterRequest): Task<ITwitterResult<ITweetDTO[]>>
}

export class TimelineQueryExecutor implements ITimelineQueryExecutor {
  private readonly _twitterAccessor: ITwitterAccessor;
  private readonly _timelineQueryGenerator: ITimelineQueryGenerator;

  constructor(twitterAccessor: ITwitterAccessor, timelineQueryGenerator: ITimelineQueryGenerator) {
    this._twitterAccessor = twitterAccessor;
    this._timelineQueryGenerator = timelineQueryGenerator;
  }

  // Home Timeline
  public GetHomeTimelineAsync(parameters: IGetHomeTimelineParameters, request: ITwitterRequest): Task<ITwitterResult<ITweetDTO[]>> {
    let query = this._timelineQueryGenerator.GetHomeTimelineQuery(parameters, new ComputedTweetMode(parameters, request));
    request.query.url = query;
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<ITweetDTO[]>(request);
  }

  public GetUserTimelineAsync(parameters: IGetUserTimelineParameters, request: ITwitterRequest): Task<ITwitterResult<ITweetDTO[]>> {
    let query = this._timelineQueryGenerator.GetUserTimelineQuery(parameters, new ComputedTweetMode(parameters, request));
    request.query.url = query;
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<ITweetDTO[]>(request);
  }

  // Mention Timeline
  public GetMentionsTimelineAsync(parameters: IGetMentionsTimelineParameters, request: ITwitterRequest): Task<ITwitterResult<ITweetDTO[]>> {
    let query = this._timelineQueryGenerator.GetMentionsTimelineQuery(parameters, new ComputedTweetMode(parameters, request));
    request.query.url = query;
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<ITweetDTO[]>(request);
  }

  // Retweets of Me Timeline
  public GetRetweetsOfMeTimelineAsync(parameters: IGetRetweetsOfMeTimelineParameters, request: ITwitterRequest): Task<ITwitterResult<ITweetDTO[]>> {
    var query = this._timelineQueryGenerator.GetRetweetsOfMeTimelineQuery(parameters, new ComputedTweetMode(parameters, request));
    request.query.url = query;
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<ITweetDTO[]>(request);
  }
}
