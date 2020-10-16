﻿import {IHelpController} from "../../core/Core/Controllers/IHelperController";
import {ITwitterResult} from "../../core/Core/Web/TwitterResult";
import {ITwitterRequest} from "../../core/Public/Models/Interfaces/ITwitterRequest";
import {IHelpQueryExecutor} from "./HelpQueryExecutor";
import {IGetRateLimitsParameters} from "../../core/Public/Parameters/HelpClient/GetRateLimitsParameters";
import {CredentialsRateLimitsDTO} from "../../core/Core/DTO/CredentialsRateLimitsDTO";
import {IGetTwitterConfigurationParameters} from "../../core/Public/Parameters/HelpClient/GetTwitterConfigurationParameters";
import {IGetSupportedLanguagesParameters} from "../../core/Public/Parameters/HelpClient/GetSupportedLanguagesParameters";
import {IGetPlaceParameters} from "../../core/Public/Parameters/HelpClient/GetPlaceParameters";
import {IGeoSearchParameters} from "../../core/Public/Parameters/HelpClient/GeoSearchParameters";
import {IGeoSearchReverseParameters} from "../../core/Public/Parameters/HelpClient/GeoSearchReverseParameters";
import {SearchGeoSearchResultDTO} from "../../core/Public/Models/Interfaces/DTO/GeoSearchResultDTO";
import {IPlace} from "../../core/Public/Models/Interfaces/IPlace";
import {SupportedLanguage} from "../../core/Core/Models/SupportedLanguage";
import {ITwitterConfiguration} from "../../core/Public/Models/Interfaces/DTO/ITwitterConfiguration";

export class HelpController implements IHelpController {
  private readonly _helpQueryExecutor: IHelpQueryExecutor;

  constructor(helpQueryExecutor: IHelpQueryExecutor) {
    this._helpQueryExecutor = helpQueryExecutor;
  }

  public getRateLimitsAsync(parameters: IGetRateLimitsParameters, request: ITwitterRequest): Promise<ITwitterResult<CredentialsRateLimitsDTO>> {
    return this._helpQueryExecutor.GetRateLimitsAsync(parameters, request);
  }

  public getTwitterConfigurationAsync(parameters: IGetTwitterConfigurationParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterConfiguration>> {
    return this._helpQueryExecutor.GetTwitterConfigurationAsync(parameters, request);
  }

  public getSupportedLanguagesAsync(parameters: IGetSupportedLanguagesParameters, request: ITwitterRequest): Promise<ITwitterResult<SupportedLanguage[]>> {
    return this._helpQueryExecutor.GetSupportedLanguagesAsync(parameters, request);
  }

  public getPlaceAsync(parameters: IGetPlaceParameters, request: ITwitterRequest): Promise<ITwitterResult<IPlace>> {
    return this._helpQueryExecutor.GetPlaceAsync(parameters, request);
  }

  public searchGeoAsync(parameters: IGeoSearchParameters, request: ITwitterRequest): Promise<ITwitterResult<SearchGeoSearchResultDTO>> {
    return this._helpQueryExecutor.SearchGeoAsync(parameters, request);
  }

  public searchGeoReverseAsync(parameters: IGeoSearchReverseParameters, request: ITwitterRequest): Promise<ITwitterResult<SearchGeoSearchResultDTO>> {
    return this._helpQueryExecutor.SearchGeoReverseAsync(parameters, request);
  }
}
