import {inject, Inject, InjectionToken} from "@angular/core";

import {ITwitterAccessor, ITwitterAccessorToken} from "../../core/Core/Web/ITwitterAccessor";
import {ITwitterResult} from "../../core/Core/Web/TwitterResult";
import {ITwitterRequest} from "../../core/Public/Models/Interfaces/ITwitterRequest";
import {ComputedTweetMode} from "../../core/Core/QueryGenerators/ComputedTweetMode";
import {HttpMethod} from 'src/app/core/Public/Models/Enum/HttpMethod';
import {IGetHomeTimelineParameters} from "../../core/Public/Parameters/TimelineClient/GetHomeTimelineParameters";
import {IGetUserTimelineParameters} from "../../core/Public/Parameters/TimelineClient/GetUserTimelineParameters";
import {IGetMentionsTimelineParameters} from "../../core/Public/Parameters/TimelineClient/GetMentionsTimelineParameters";
import {IGetRetweetsOfMeTimelineParameters} from "../../core/Public/Parameters/TimelineClient/GetRetweetsOfMeTimelineParameters";
import {ITweetDTO} from "../../core/Public/Models/Interfaces/DTO/ITweetDTO";
import {ITimelineQueryGenerator, ITimelineQueryGeneratorToken} from "./TimelineQueryGenerator";

export interface ITimelineQueryExecutor {
  // Home Timeline
  getHomeTimelineAsync(parameters: IGetHomeTimelineParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO[]>>;

  // User Timeline
  getUserTimelineAsync(parameters: IGetUserTimelineParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO[]>>;

  // Mention Timeline
  getMentionsTimelineAsync(parameters: IGetMentionsTimelineParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO[]>>;

  // Retweets Of Me Timeline
  getRetweetsOfMeTimelineAsync(parameters: IGetRetweetsOfMeTimelineParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO[]>>;
}

export const ITimelineQueryExecutorToken = new InjectionToken<ITimelineQueryExecutor>('ITimelineQueryExecutor', {
  providedIn: 'root',
  factory: () => new TimelineQueryExecutor(inject(ITwitterAccessorToken), inject(ITimelineQueryGeneratorToken)),
});

export class TimelineQueryExecutor implements ITimelineQueryExecutor {
  private readonly _twitterAccessor: ITwitterAccessor;
  private readonly _timelineQueryGenerator: ITimelineQueryGenerator;

  constructor(@Inject(ITwitterAccessorToken) twitterAccessor: ITwitterAccessor,
              @Inject(ITimelineQueryGeneratorToken) timelineQueryGenerator: ITimelineQueryGenerator) {
    this._twitterAccessor = twitterAccessor;
    this._timelineQueryGenerator = timelineQueryGenerator;
  }

  // Home Timeline
  public getHomeTimelineAsync(parameters: IGetHomeTimelineParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO[]>> {
    let query = this._timelineQueryGenerator.getHomeTimelineQuery(parameters, new ComputedTweetMode(parameters, request));
    request.query.url = query;
    request.query.httpMethod = HttpMethod.GET;

    return this._twitterAccessor.executeRequestAsync<ITweetDTO[]>(request);
  }

  public getUserTimelineAsync(parameters: IGetUserTimelineParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO[]>> {
    let query = this._timelineQueryGenerator.getUserTimelineQuery(parameters, new ComputedTweetMode(parameters, request));
    request.query.url = query;
    request.query.httpMethod = HttpMethod.GET;

    return this._twitterAccessor.executeRequestAsync<ITweetDTO[]>(request);
  }

  // Mention Timeline
  public getMentionsTimelineAsync(parameters: IGetMentionsTimelineParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO[]>> {
    let query = this._timelineQueryGenerator.getMentionsTimelineQuery(parameters, new ComputedTweetMode(parameters, request));
    request.query.url = query;
    request.query.httpMethod = HttpMethod.GET;

    return this._twitterAccessor.executeRequestAsync<ITweetDTO[]>(request);
  }

  // Retweets of Me Timeline
  public getRetweetsOfMeTimelineAsync(parameters: IGetRetweetsOfMeTimelineParameters, request: ITwitterRequest): Promise<ITwitterResult<ITweetDTO[]>> {
    let query = this._timelineQueryGenerator.getRetweetsOfMeTimelineQuery(parameters, new ComputedTweetMode(parameters, request));
    request.query.url = query;
    request.query.httpMethod = HttpMethod.GET;

    return this._twitterAccessor.executeRequestAsync<ITweetDTO[]>(request);
  }
}
