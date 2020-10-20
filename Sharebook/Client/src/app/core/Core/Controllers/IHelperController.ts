import {ITwitterConfiguration} from "../../Public/Models/Interfaces/DTO/ITwitterConfiguration";
import {ITwitterResult} from "../Web/TwitterResult";
import {ITwitterRequest} from "../../Public/Models/Interfaces/ITwitterRequest";
import {SupportedLanguage} from "../Models/SupportedLanguage";
import {IGetRateLimitsParameters} from "../../Public/Parameters/HelpClient/GetRateLimitsParameters";
import {IGetTwitterConfigurationParameters} from "../../Public/Parameters/HelpClient/GetTwitterConfigurationParameters";
import {IGetSupportedLanguagesParameters} from "../../Public/Parameters/HelpClient/GetSupportedLanguagesParameters";
import {IGetPlaceParameters} from "../../Public/Parameters/HelpClient/GetPlaceParameters";
import {IGeoSearchParameters} from "../../Public/Parameters/HelpClient/GeoSearchParameters";
import {IPlace} from "../../Public/Models/Interfaces/IPlace";
import {SearchGeoSearchResultDTO} from "../../Public/Models/Interfaces/DTO/GeoSearchResultDTO";
import {IGeoSearchReverseParameters} from "../../Public/Parameters/HelpClient/GeoSearchReverseParameters";
import {CredentialsRateLimitsDTO} from "../DTO/CredentialsRateLimitsDTO";

export interface IHelpController {
  getRateLimitsAsync(parameters: IGetRateLimitsParameters, request: ITwitterRequest): Promise<ITwitterResult<CredentialsRateLimitsDTO>>;

  getTwitterConfigurationAsync(parameters: IGetTwitterConfigurationParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterConfiguration>>;

  getSupportedLanguagesAsync(parameters: IGetSupportedLanguagesParameters, request: ITwitterRequest): Promise<ITwitterResult<SupportedLanguage[]>>;

  getPlaceAsync(parameters: IGetPlaceParameters, request: ITwitterRequest): Promise<ITwitterResult<IPlace>>;

  searchGeoAsync(parameters: IGeoSearchParameters, request: ITwitterRequest): Promise<ITwitterResult<SearchGeoSearchResultDTO>>;

  searchGeoReverseAsync(parameters: IGeoSearchReverseParameters, request: ITwitterRequest): Promise<ITwitterResult<SearchGeoSearchResultDTO>>;
}
