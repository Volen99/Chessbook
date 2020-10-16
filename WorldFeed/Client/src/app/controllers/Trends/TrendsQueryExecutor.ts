import {ITwitterRequest} from "../../core/Public/Models/Interfaces/ITwitterRequest";
import Task from 'src/app/c#-objects/TypeScript.NET-Core/packages/Threading/source/Tasks/Task';
import {ITwitterResult} from "../../core/Core/Web/TwitterResult";
import {ITwitterAccessor} from 'src/app/core/Core/Web/ITwitterAccessor';
import {HttpMethod} from 'src/app/core/Public/Models/Enum/HttpMethod';

export interface ITrendsQueryExecutor {
  GetPlaceTrendsAtAsync(parameters: IGetTrendsAtParameters, request: ITwitterRequest): Task<ITwitterResult<IGetTrendsAtResult[]>>

  GetTrendLocationsAsync(parameters: IGetTrendsLocationParameters, request: ITwitterRequest): Task<ITwitterResult<ITrendLocation[]>>

  GetTrendsLocationCloseToAsync(parameters: IGetTrendsLocationCloseToParameters, request: ITwitterRequest): Task<ITwitterResult<ITrendLocation[]>>
}

public class TrendsQueryExecutor implements ITrendsQueryExecutor {
  private readonly _trendsQueryGenerator: ITrendsQueryGenerator;
  private readonly _twitterAccessor: ITwitterAccessor;

  public TrendsQueryExecutor(trendsQueryGenerator: ITrendsQueryGenerator, twitterAccessor: ITwitterAccessor) {
    this._trendsQueryGenerator = trendsQueryGenerator;
    this._twitterAccessor = twitterAccessor;
  }

  public GetPlaceTrendsAtAsync(parameters: IGetTrendsAtParameters, request: ITwitterRequest): Task<ITwitterResult<IGetTrendsAtResult[]>> {
    request.query.url = this._trendsQueryGenerator.GetTrendsAtQuery(parameters);
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<IGetTrendsAtResult[]>(request);
  }

  public GetTrendLocationsAsync(parameters: IGetTrendsLocationParameters, request: ITwitterRequest): Task<ITwitterResult<ITrendLocation[]>> {
    request.query.url = _trendsQueryGenerator.GetTrendsLocationQuery(parameters);
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<ITrendLocation[]>(request);
  }

  public GetTrendsLocationCloseToAsync(parameters: IGetTrendsLocationCloseToParameters, request: ITwitterRequest): Task<ITwitterResult<ITrendLocation[]>> {
    request.query.url = this._trendsQueryGenerator.GetTrendsLocationCloseToQuery(parameters);
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<ITrendLocation[]>(request);
  }
}
