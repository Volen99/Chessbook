import {ITrendsController} from "../../core/Core/Controllers/ITrendsController";
import {ITwitterResult} from "../../core/Core/Web/TwitterResult";
import Task from 'src/app/c#-objects/TypeScript.NET-Core/packages/Threading/source/Tasks/Task';
import {ITwitterRequest} from "../../core/Public/Models/Interfaces/ITwitterRequest";

export class TrendsController implements ITrendsController {
  private readonly _trendsQueryExecutor: ITrendsQueryExecutor;

  public TrendsController(trendsQueryExecutor: ITrendsQueryExecutor) {
    this._trendsQueryExecutor = trendsQueryExecutor;
  }


  public getPlaceTrendsAtAsync(parameters: IGetTrendsAtParameters, request: ITwitterRequest): Task<ITwitterResult<IGetTrendsAtResult[]>> {
    return this._trendsQueryExecutor.GetPlaceTrendsAtAsync(parameters, request);
  }

  public getTrendLocationsAsync(parameters: IGetTrendsLocationParameters, request: ITwitterRequest): Task<ITwitterResult<ITrendLocation[]>> {
    return this._trendsQueryExecutor.GetTrendLocationsAsync(parameters, request);
  }

  public getTrendsLocationCloseToAsync(parameters: IGetTrendsLocationCloseToParameters, request: ITwitterRequest): Task<ITwitterResult<ITrendLocation[]>> {
    return this._trendsQueryExecutor.GetTrendsLocationCloseToAsync(parameters, request);
  }
}
