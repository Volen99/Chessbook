import {IGetRateLimitsParameters} from "../../Public/Parameters/HelpClient/GetRateLimitsParameters";
import {IGetTwitterConfigurationParameters} from "../../Public/Parameters/HelpClient/GetTwitterConfigurationParameters";
import {IGetSupportedLanguagesParameters} from "../../Public/Parameters/HelpClient/GetSupportedLanguagesParameters";
import {IGetPlaceParameters} from "../../Public/Parameters/HelpClient/GetPlaceParameters";
import {IGeoSearchParameters} from "../../Public/Parameters/HelpClient/GeoSearchParameters";
import {IGeoSearchReverseParameters} from "../../Public/Parameters/HelpClient/GeoSearchReverseParameters";

export interface IHelpQueryGenerator {
  getRateLimitsQuery(parameters: IGetRateLimitsParameters): string;

  getTwitterConfigurationQuery(parameters: IGetTwitterConfigurationParameters): string;

  getSupportedLanguagesQuery(parameters: IGetSupportedLanguagesParameters): string;

  getPlaceQuery(parameters: IGetPlaceParameters): string;

  // string GenerateGeoParameter(ICoordinates coordinates);
  getSearchGeoQuery(parameters: IGeoSearchParameters): string;

  getSearchGeoReverseQuery(parameters: IGeoSearchReverseParameters);
}
