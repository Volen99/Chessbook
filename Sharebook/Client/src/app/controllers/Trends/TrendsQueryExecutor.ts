import {ITwitterRequest} from "../../core/Public/Models/Interfaces/ITwitterRequest";
import {ITwitterResult} from "../../core/Core/Web/TwitterResult";
import {ITwitterAccessor} from 'src/app/core/Core/Web/ITwitterAccessor';
import {HttpMethod} from 'src/app/core/Public/Models/Enum/HttpMethod';
import {IGetTrendsAtParameters} from "../../core/Public/Parameters/TrendsClient/GetTrendsAtParameters";
import {IGetTrendsLocationParameters} from "../../core/Public/Parameters/TrendsClient/GetTrendsLocationParameters";
import {IGetTrendsLocationCloseToParameters} from "../../core/Public/Parameters/TrendsClient/GetTrendsLocationCloseToParameters";
import {IGetTrendsAtResult} from "../../core/Public/Models/Interfaces/IGetTrendsAtResult";
import {ITrendLocation} from "../../core/Public/Models/Interfaces/ITrendLocation";
import {ITrendsQueryGenerator} from "./TrendsQueryGenerator";
import {InjectionToken} from "@angular/core";

export interface ITrendsQueryExecutor {
  getPlaceTrendsAtAsync(parameters: IGetTrendsAtParameters, request: ITwitterRequest): Promise<ITwitterResult<IGetTrendsAtResult[]>>;

  getTrendLocationsAsync(parameters: IGetTrendsLocationParameters, request: ITwitterRequest): Promise<ITwitterResult<ITrendLocation[]>>;

  getTrendsLocationCloseToAsync(parameters: IGetTrendsLocationCloseToParameters, request: ITwitterRequest): Promise<ITwitterResult<ITrendLocation[]>>;
}

export const ITrendsQueryExecutorToken = new InjectionToken<ITrendsQueryExecutor>('ITrendsQueryExecutor', {
  providedIn: 'root',
  factory: () => new TrendsQueryExecutor(),
});

export class TrendsQueryExecutor implements ITrendsQueryExecutor {
  private readonly _trendsQueryGenerator: ITrendsQueryGenerator;
  private readonly _twitterAccessor: ITwitterAccessor;

  constructor(trendsQueryGenerator: ITrendsQueryGenerator, twitterAccessor: ITwitterAccessor) {
    this._trendsQueryGenerator = trendsQueryGenerator;
    this._twitterAccessor = twitterAccessor;
  }

  public getPlaceTrendsAtAsync(parameters: IGetTrendsAtParameters, request: ITwitterRequest): Promise<ITwitterResult<IGetTrendsAtResult[]>> {
    request.query.url = this._trendsQueryGenerator.getTrendsAtQuery(parameters);
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<IGetTrendsAtResult[]>(request);
  }

  public getTrendLocationsAsync(parameters: IGetTrendsLocationParameters, request: ITwitterRequest): Promise<ITwitterResult<ITrendLocation[]>> {
    request.query.url = this._trendsQueryGenerator.getTrendsLocationQuery(parameters);
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<ITrendLocation[]>(request);
  }

  public getTrendsLocationCloseToAsync(parameters: IGetTrendsLocationCloseToParameters, request: ITwitterRequest): Promise<ITwitterResult<ITrendLocation[]>> {
    request.query.url = this._trendsQueryGenerator.getTrendsLocationCloseToQuery(parameters);
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<ITrendLocation[]>(request);
  }
}
