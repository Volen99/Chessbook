import {BaseRequester} from "../BaseRequester";
import {ITrendsRequester} from "../../../core/Public/Client/Requesters/ITrendsRequester";
import {ITwitterResult} from "../../../core/Core/Web/TwitterResult";
import {ITrendsController} from "../../../core/Core/Controllers/ITrendsController";
import {ITrendsClientRequiredParametersValidator} from "../../../core/Core/Client/Validators/TrendsClientRequiredParametersValidator";
import {ITwitterClient} from "../../../core/Public/ITwitterClient";
import {IGetTrendsAtParameters} from "../../../core/Public/Parameters/TrendsClient/GetTrendsAtParameters";
import {IGetTrendsAtResult} from "../../../core/Public/Models/Interfaces/IGetTrendsAtResult";
import {IGetTrendsLocationParameters} from "../../../core/Public/Parameters/TrendsClient/GetTrendsLocationParameters";
import {ITrendLocation} from "../../../core/Public/Models/Interfaces/ITrendLocation";
import {IGetTrendsLocationCloseToParameters} from "../../../core/Public/Parameters/TrendsClient/GetTrendsLocationCloseToParameters";
import {ITwitterClientEvents} from "../../../core/Core/Events/TweetinviGlobalEvents";

export class TrendsRequester extends BaseRequester implements ITrendsRequester {
  private readonly _trendsController: ITrendsController;
  private readonly _trendsClientRequiredParametersValidator: ITrendsClientRequiredParametersValidator;

  constructor(trendsController: ITrendsController, trendsClientRequiredParametersValidator: ITrendsClientRequiredParametersValidator,
              client: ITwitterClient, twitterClientEvents: ITwitterClientEvents) {
    super(client, twitterClientEvents);
    this._trendsController = trendsController;
    this._trendsClientRequiredParametersValidator = trendsClientRequiredParametersValidator;
  }

  public getPlaceTrendsAtAsync(parameters: IGetTrendsAtParameters): Promise<ITwitterResult<IGetTrendsAtResult[]>> {
    this._trendsClientRequiredParametersValidator.validate(parameters);
    return super.ExecuteRequestAsync(request => this._trendsController.getPlaceTrendsAtAsync(parameters, request));
  }

  public getTrendLocationsAsync(parameters: IGetTrendsLocationParameters): Promise<ITwitterResult<ITrendLocation[]>> {
    this._trendsClientRequiredParametersValidator.validate(parameters);
    return super.ExecuteRequestAsync(request => this._trendsController.getTrendLocationsAsync(parameters, request));
  }

  public getTrendsLocationCloseToAsync(parameters: IGetTrendsLocationCloseToParameters): Promise<ITwitterResult<ITrendLocation[]>> {
    this._trendsClientRequiredParametersValidator.validate(parameters);
    return super.ExecuteRequestAsync(request => this._trendsController.getTrendsLocationCloseToAsync(parameters, request));
  }
}
