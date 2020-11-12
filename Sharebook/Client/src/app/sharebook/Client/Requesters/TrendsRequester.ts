import {Inject, Injectable} from "@angular/core";

import {BaseRequester} from "../BaseRequester";
import {ITrendsRequester} from "../../../core/Public/Client/Requesters/ITrendsRequester";
import {ITwitterResult} from "../../../core/Core/Web/TwitterResult";
import {ITrendsController, ITrendsControllerToken} from "../../../core/Core/Controllers/ITrendsController";
import {
  ITrendsClientRequiredParametersValidator,
  ITrendsClientRequiredParametersValidatorToken
} from "../../../core/Core/Client/Validators/TrendsClientRequiredParametersValidator";
import {ITwitterClient, ITwitterClientToken} from "../../../core/Public/ITwitterClient";
import {IGetTrendsAtParameters} from "../../../core/Public/Parameters/TrendsClient/GetTrendsAtParameters";
import {IGetTrendsAtResult} from "../../../core/Public/Models/Interfaces/IGetTrendsAtResult";
import {IGetTrendsLocationParameters} from "../../../core/Public/Parameters/TrendsClient/GetTrendsLocationParameters";
import {ITrendLocation} from "../../../core/Public/Models/Interfaces/ITrendLocation";
import {IGetTrendsLocationCloseToParameters} from "../../../core/Public/Parameters/TrendsClient/GetTrendsLocationCloseToParameters";
import {ITwitterClientEvents, ITwitterClientEventsToken} from "../../../core/Core/Events/TweetinviGlobalEvents";

@Injectable({
  providedIn: 'root',
})
export class TrendsRequester extends BaseRequester implements ITrendsRequester {
  private readonly _trendsController: ITrendsController;
  private readonly _trendsClientRequiredParametersValidator: ITrendsClientRequiredParametersValidator;

  constructor(@Inject(ITrendsControllerToken) trendsController: ITrendsController,
              @Inject(ITrendsClientRequiredParametersValidatorToken) trendsClientRequiredParametersValidator: ITrendsClientRequiredParametersValidator,
              @Inject(ITwitterClientToken) client: ITwitterClient,
              @Inject(ITwitterClientEventsToken) twitterClientEvents: ITwitterClientEvents) {
    super(client, twitterClientEvents);

    this._trendsController = trendsController;
    this._trendsClientRequiredParametersValidator = trendsClientRequiredParametersValidator;
  }

  public getPlaceTrendsAtAsync(parameters: IGetTrendsAtParameters): Promise<ITwitterResult<IGetTrendsAtResult[]>> {
    this._trendsClientRequiredParametersValidator.validate(parameters);
    return super.executeRequestAsync(request => this._trendsController.getPlaceTrendsAtAsync(parameters, request));
  }

  public getTrendLocationsAsync(parameters: IGetTrendsLocationParameters): Promise<ITwitterResult<ITrendLocation[]>> {
    this._trendsClientRequiredParametersValidator.validate(parameters);
    return super.executeRequestAsync(request => this._trendsController.getTrendLocationsAsync(parameters, request));
  }

  public getTrendsLocationCloseToAsync(parameters: IGetTrendsLocationCloseToParameters): Promise<ITwitterResult<ITrendLocation[]>> {
    this._trendsClientRequiredParametersValidator.validate(parameters);
    return super.executeRequestAsync(request => this._trendsController.getTrendsLocationCloseToAsync(parameters, request));
  }
}
