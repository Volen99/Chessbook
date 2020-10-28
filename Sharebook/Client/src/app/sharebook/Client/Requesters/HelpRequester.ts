import {IHelpRequester} from "../../../core/Public/Client/Requesters/IHelpRequester";
import {BaseRequester} from "../BaseRequester";
import {ITwitterResult} from "../../../core/Core/Web/TwitterResult";
import {SupportedLanguage} from "../../../core/Core/Models/SupportedLanguage";
import {IHelpController, IHelpControllerToken} from "../../../core/Core/Controllers/IHelperController";
import {
  IHelpClientRequiredParametersValidator,
  IHelpClientRequiredParametersValidatorToken
} from "../../../core/Core/Client/Validators/HelpClientRequiredParametersValidator";
import {ITwitterClient, ITwitterClientToken} from "../../../core/Public/ITwitterClient";
import {ITwitterClientEvents} from "../../../core/Core/Events/TweetinviGlobalEvents";
import {IGetRateLimitsParameters} from "../../../core/Public/Parameters/HelpClient/GetRateLimitsParameters";
import {CredentialsRateLimitsDTO} from "../../../core/Core/DTO/CredentialsRateLimitsDTO";
import {IGetTwitterConfigurationParameters} from "../../../core/Public/Parameters/HelpClient/GetTwitterConfigurationParameters";
import {ITwitterConfiguration} from "../../../core/Public/Models/Interfaces/DTO/ITwitterConfiguration";
import {IGetSupportedLanguagesParameters} from "../../../core/Public/Parameters/HelpClient/GetSupportedLanguagesParameters";
import {IGetPlaceParameters} from "../../../core/Public/Parameters/HelpClient/GetPlaceParameters";
import {IPlace} from "../../../core/Public/Models/Interfaces/IPlace";
import {IGeoSearchParameters} from "../../../core/Public/Parameters/HelpClient/GeoSearchParameters";
import {SearchGeoSearchResultDTO} from "../../../core/Public/Models/Interfaces/DTO/GeoSearchResultDTO";
import {IGeoSearchReverseParameters} from "../../../core/Public/Parameters/HelpClient/GeoSearchReverseParameters";
import {Inject, Injectable} from "@angular/core";

@Injectable()
export class HelpRequester extends BaseRequester implements IHelpRequester {
  private readonly _helpController: IHelpController;
  private readonly _validator: IHelpClientRequiredParametersValidator;

  constructor(@Inject(ITwitterClientToken) client: ITwitterClient,
              @Inject(ITwitterClientEventsToken) clientEvents: ITwitterClientEvents,
              @Inject(IHelpControllerToken) helpController: IHelpController,
              @Inject(IHelpClientRequiredParametersValidatorToken) validator: IHelpClientRequiredParametersValidator) {

    super(client, clientEvents);
    this._helpController = helpController;
    this._validator = validator;
  }

  public getRateLimitsAsync(parameters: IGetRateLimitsParameters): Promise<ITwitterResult<CredentialsRateLimitsDTO>> {
    this._validator.validate(parameters);

    return super.ExecuteRequestAsync(request => {
      if (parameters.trackerMode != null) {
        request.executionContext.rateLimitTrackerMode = parameters.trackerMode.Value;
      }

      return this._helpController.getRateLimitsAsync(parameters, request);
    });
  }

  public getTwitterConfigurationAsync(parameters: IGetTwitterConfigurationParameters): Promise<ITwitterResult<ITwitterConfiguration>> {
    this._validator.validate(parameters);
    return super.ExecuteRequestAsync(request => this._helpController.getTwitterConfigurationAsync(parameters, request));
  }

  public getSupportedLanguagesAsync(parameters: IGetSupportedLanguagesParameters): Promise<ITwitterResult<SupportedLanguage[]>> {
    this._validator.validate(parameters);
    return super.ExecuteRequestAsync(request => this._helpController.getSupportedLanguagesAsync(parameters, request));
  }

  public getPlaceAsync(parameters: IGetPlaceParameters): Promise<ITwitterResult<IPlace>> {
    this._validator.validate(parameters);
    return super.ExecuteRequestAsync(request => this._helpController.getPlaceAsync(parameters, request));
  }

  public searchGeoAsync(parameters: IGeoSearchParameters): Promise<ITwitterResult<SearchGeoSearchResultDTO>> {
    this._validator.validate(parameters);
    return super.ExecuteRequestAsync(request => this._helpController.searchGeoAsync(parameters, request));
  }

  public searchGeoReverseAsync(parameters: IGeoSearchReverseParameters): Promise<ITwitterResult<SearchGeoSearchResultDTO>> {
    this._validator.validate(parameters);
    return super.ExecuteRequestAsync(request => this._helpController.searchGeoReverseAsync(parameters, request));
  }
}
