import {Inject, InjectionToken} from "@angular/core";

import {ITwitterResult} from "../../../Core/Web/TwitterResult";
import {IGetRateLimitsParameters} from "../../Parameters/HelpClient/GetRateLimitsParameters";
import {IGetTwitterConfigurationParameters} from "../../Parameters/HelpClient/GetTwitterConfigurationParameters";
import {ITwitterConfiguration} from "../../Models/Interfaces/DTO/ITwitterConfiguration";
import {IGetSupportedLanguagesParameters} from "../../Parameters/HelpClient/GetSupportedLanguagesParameters";
import {SupportedLanguage} from "../../../Core/Models/SupportedLanguage";
import {IGetPlaceParameters} from "../../Parameters/HelpClient/GetPlaceParameters";
import {IPlace} from "../../Models/Interfaces/IPlace";
import {IGeoSearchParameters} from "../../Parameters/HelpClient/GeoSearchParameters";
import {SearchGeoSearchResultDTO} from "../../Models/Interfaces/DTO/GeoSearchResultDTO";
import {IGeoSearchReverseParameters} from "../../Parameters/HelpClient/GeoSearchReverseParameters";
import {CredentialsRateLimitsDTO} from "../../../Core/DTO/CredentialsRateLimitsDTO";
import {HelpRequester} from "../../../../sharebook/Client/Requesters/HelpRequester";
import {TwitterClientEvents} from "../../../Core/Events/TweetinviGlobalEvents";
import {HelpClientRequiredParametersValidator} from "../../../Core/Client/Validators/HelpClientRequiredParametersValidator";
import {TwitterClient} from "../../../../sharebook/TwitterClient";
import {HelpController} from "../../../../controllers/Help/HelpController";

export interface IHelpRequester {
  /// <summary>
  /// Get the rate limits of the current client
  /// </summary>
  /// <para> Read more : https://developer.twitter.com/en/docs/developer-utilities/rate-limit-status/api-reference/get-application-rate_limit_status </para>
  /// <returns>The twitter response containing the client's rate limits</returns>
  getRateLimitsAsync(parameters: IGetRateLimitsParameters): Promise<ITwitterResult<CredentialsRateLimitsDTO>>;

  /// <summary>
  /// Get the Twitter API configuration
  /// </summary>
  /// <para> https://developer.twitter.com/en/docs/developer-utilities/configuration/api-reference/get-help-configuration </para>
  /// <returns>Twitter response containing the official configuration</returns>
  getTwitterConfigurationAsync(parameters: IGetTwitterConfigurationParameters): Promise<ITwitterResult<ITwitterConfiguration>>;

  /// <summary>
  /// Get Twitter supported languages
  /// </summary>
  /// <para> https://developer.twitter.com/en/docs/developer-utilities/supported-languages/api-reference/get-help-languages </para>
  /// <returns>Twitter result containing the supported languages</returns>
  getSupportedLanguagesAsync(parameters: IGetSupportedLanguagesParameters): Promise<ITwitterResult<SupportedLanguage[]>>;

  /// <summary>
  /// Get a place information from place identifier.
  /// </summary>
  /// <para> https://developer.twitter.com/en/docs/geo/place-information/api-reference/get-geo-id-place_id </para>
  /// <returns>Twitter result containing the requested Place</returns>
  getPlaceAsync(parameters: IGetPlaceParameters): Promise<ITwitterResult<IPlace>>;

  /// <summary>
  /// Search for places that can be attached to a statuses/update. Given a latitude and a longitude pair, an IP address, or a name.
  /// </summary>
  /// <para> https://developer.twitter.com/en/docs/geo/places-near-location/api-reference/get-geo-search </para>
  /// <returns>Twitter result containing the places matching search</returns>
  searchGeoAsync(parameters: IGeoSearchParameters): Promise<ITwitterResult<SearchGeoSearchResultDTO>>;

  /// <summary>
  /// Given a latitude and a longitude, searches for up to 20 places.
  /// </summary>
  /// <para> https://developer.twitter.com/en/docs/geo/places-near-location/api-reference/get-geo-reverse_geocode </para>
  /// <returns>Twitter result containing the matching the search</returns>
  searchGeoReverseAsync(parameters: IGeoSearchReverseParameters): Promise<ITwitterResult<SearchGeoSearchResultDTO>>;
}


export const IHelpRequesterToken = new InjectionToken<IHelpRequester>('IHelpRequester', {
  providedIn: 'root',
  factory: () => new HelpRequester(Inject(TwitterClient), Inject(TwitterClientEvents),
    Inject(HelpController), Inject(HelpClientRequiredParametersValidator)),
});
