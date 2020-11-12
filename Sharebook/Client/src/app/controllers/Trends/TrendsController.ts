import {Inject, Injectable} from "@angular/core";

import {ITrendsController} from "../../core/Core/Controllers/ITrendsController";
import {ITwitterResult} from "../../core/Core/Web/TwitterResult";
import {ITwitterRequest} from "../../core/Public/Models/Interfaces/ITwitterRequest";
import {ITrendsQueryExecutor, ITrendsQueryExecutorToken} from "./TrendsQueryExecutor";
import {IGetTrendsAtParameters} from "../../core/Public/Parameters/TrendsClient/GetTrendsAtParameters";
import {IGetTrendsLocationParameters} from "../../core/Public/Parameters/TrendsClient/GetTrendsLocationParameters";
import {IGetTrendsLocationCloseToParameters} from "../../core/Public/Parameters/TrendsClient/GetTrendsLocationCloseToParameters";
import {IGetTrendsAtResult} from "../../core/Public/Models/Interfaces/IGetTrendsAtResult";
import {ITrendLocation} from "../../core/Public/Models/Interfaces/ITrendLocation";

@Injectable({
  providedIn: 'root',
})
export class TrendsController implements ITrendsController {
  private readonly _trendsQueryExecutor: ITrendsQueryExecutor;

  constructor(@Inject(ITrendsQueryExecutorToken) trendsQueryExecutor: ITrendsQueryExecutor) {
    this._trendsQueryExecutor = trendsQueryExecutor;
  }

  public getPlaceTrendsAtAsync(parameters: IGetTrendsAtParameters, request: ITwitterRequest): Promise<ITwitterResult<IGetTrendsAtResult[]>> {
    return this._trendsQueryExecutor.getPlaceTrendsAtAsync(parameters, request);
  }

  public getTrendLocationsAsync(parameters: IGetTrendsLocationParameters, request: ITwitterRequest): Promise<ITwitterResult<ITrendLocation[]>> {
    return this._trendsQueryExecutor.getTrendLocationsAsync(parameters, request);
  }

  public getTrendsLocationCloseToAsync(parameters: IGetTrendsLocationCloseToParameters, request: ITwitterRequest): Promise<ITwitterResult<ITrendLocation[]>> {
    return this._trendsQueryExecutor.getTrendsLocationCloseToAsync(parameters, request);
  }
}
