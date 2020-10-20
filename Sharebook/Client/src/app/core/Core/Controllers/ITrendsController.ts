import {ITwitterRequest} from "../../Public/Models/Interfaces/ITwitterRequest";
import {ITwitterResult} from "../Web/TwitterResult";
import {IGetTrendsAtParameters} from "../../Public/Parameters/TrendsClient/GetTrendsAtParameters";
import {IGetTrendsLocationParameters} from "../../Public/Parameters/TrendsClient/GetTrendsLocationParameters";
import {IGetTrendsLocationCloseToParameters} from "../../Public/Parameters/TrendsClient/GetTrendsLocationCloseToParameters";
import {IGetTrendsAtResult} from "../../Public/Models/Interfaces/IGetTrendsAtResult";
import {ITrendLocation} from "../../Public/Models/Interfaces/ITrendLocation";

export interface ITrendsController {
  getPlaceTrendsAtAsync(parameters: IGetTrendsAtParameters, request: ITwitterRequest): Promise<ITwitterResult<IGetTrendsAtResult[]>>;

  getTrendLocationsAsync(parameters: IGetTrendsLocationParameters, request: ITwitterRequest): Promise<ITwitterResult<ITrendLocation[]>>;

  getTrendsLocationCloseToAsync(parameters: IGetTrendsLocationCloseToParameters, request: ITwitterRequest): Promise<ITwitterResult<ITrendLocation[]>>;
}
