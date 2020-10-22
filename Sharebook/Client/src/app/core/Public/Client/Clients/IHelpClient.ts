import {ITwitterConfiguration} from "../../Models/Interfaces/DTO/ITwitterConfiguration";
import {SupportedLanguage} from "../../../Core/Models/SupportedLanguage";
import {IGetTwitterConfigurationParameters} from "../../Parameters/HelpClient/GetTwitterConfigurationParameters";
import {IHelpClientParametersValidator} from "../../../Core/Client/Validators/HelpClientParametersValidator";
import {IGetSupportedLanguagesParameters} from "../../Parameters/HelpClient/GetSupportedLanguagesParameters";
import {IPlace} from "../../Models/Interfaces/IPlace";
import {IGetPlaceParameters} from "../../Parameters/HelpClient/GetPlaceParameters";
import {IGeoSearchParameters} from "../../Parameters/HelpClient/GeoSearchParameters";
import {ICoordinates} from "../../Models/Interfaces/ICoordinates";
import {IGeoSearchReverseParameters} from "../../Parameters/HelpClient/GeoSearchReverseParameters";
import {InjectionToken} from "@angular/core";

export interface IHelpClient {
  // Validate all the Help client parameters
  parametersValidator: IHelpClientParametersValidator;

  getTwitterConfigurationAsync(): Promise<ITwitterConfiguration>;

  /// <summary>
  /// Get the Twitter API configuration
  /// </summary>
  /// <para> https://developer.twitter.com/en/docs/developer-utilities/configuration/api-reference/get-help-configuration </para>
  /// <returns>Twitter official configuration</returns>
  getTwitterConfigurationAsync(parameters: IGetTwitterConfigurationParameters): Promise<ITwitterConfiguration>

  getSupportedLanguagesAsync(): Promise<SupportedLanguage[]>;

  /// <summary>
  /// Get Twitter supported languages
  /// </summary>
  /// <para> https://developer.twitter.com/en/docs/developer-utilities/supported-languages/api-reference/get-help-languages </para>
  /// <returns>Twitter supported languages</returns>
  getSupportedLanguagesAsync(parameters: IGetSupportedLanguagesParameters): Promise<SupportedLanguage[]>

  getPlaceAsync(placeId: string): Promise<IPlace>;

  /// <summary>
  /// Get a place information from place identifier.
  /// </summary>
  /// <para> https://developer.twitter.com/en/docs/geo/place-information/api-reference/get-geo-id-place_id </para>
  /// <returns>Requested Place</returns>
  getPlaceAsync(parameters: IGetPlaceParameters): Promise<IPlace>;

  /// <summary>
  /// Search for places that can be attached to a statuses/update. Given a latitude and a longitude pair, an IP address, or a name.
  /// </summary>
  /// <para> https://developer.twitter.com/en/docs/geo/places-near-location/api-reference/get-geo-search </para>
  /// <returns>Places matching search</returns>
  searchGeoAsync(parameters: IGeoSearchParameters);

  searchGeoReverseAsync(coordinates: ICoordinates): Promise<IPlace[]>;

  /// <summary>
  /// Given a latitude and a longitude, searches for up to 20 places.
  /// </summary>
  /// <para> https://developer.twitter.com/en/docs/geo/places-near-location/api-reference/get-geo-reverse_geocode </para>
  /// <returns>Places matching the search</returns>
  searchGeoReverseAsync(parameters: IGeoSearchReverseParameters): Promise<IPlace[]>;
}


export const IHelpClientToken = new InjectionToken<IHelpClient>('IHelpClient', {
  providedIn: 'root',
  factory: () => new,
});
