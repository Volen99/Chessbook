import {Inject, InjectionToken} from "@angular/core";

import {IGetTrendsAtResult} from "../../Models/Interfaces/IGetTrendsAtResult";
import {IGetTrendsAtParameters} from "../../Parameters/TrendsClient/GetTrendsAtParameters";
import {ITrendLocation} from "../../Models/Interfaces/ITrendLocation";
import {IGetTrendsLocationParameters} from "../../Parameters/TrendsClient/GetTrendsLocationParameters";
import {ICoordinates} from "../../Models/Interfaces/ICoordinates";
import {IGetTrendsLocationCloseToParameters} from "../../Parameters/TrendsClient/GetTrendsLocationCloseToParameters";
import {ITrendsClientParametersValidator} from "../../../Core/Client/Validators/TrendsClientParametersValidator";
import {TrendsClient} from "../../../../sharebook/Client/Clients/TrendsClient";
import {TwitterClient} from "../../../../sharebook/TwitterClient";

export interface ITrendsClient {
  // Validate all the Trends client parameters
  parametersValidator: ITrendsClientParametersValidator;

  getPlaceTrendsAtAsync(woeid: number): Promise<IGetTrendsAtResult>;

  /// <summary>
  /// Returns the top 50 trending topics for a specific WOEID
  /// </summary>
  /// <para>Read more : https://developer.twitter.com/en/docs/trends/trends-for-location/api-reference/get-trends-place </para>
  /// <returns>Trending topics</returns>
  getPlaceTrendsAtAsync(parameters: IGetTrendsAtParameters): Promise<IGetTrendsAtResult>;

  getTrendLocationsAsync(): Promise<ITrendLocation[]>;

  /// <summary>
  /// Returns the locations that Twitter has trending topic information for.
  /// </summary>
  /// <para>Read more : https://developer.twitter.com/en/docs/trends/locations-with-trending-topics/api-reference/get-trends-available </para>
  /// <returns>Trending locations</returns>
  getTrendLocationsAsync(parameters: IGetTrendsLocationParameters): Promise<ITrendLocation[]>;

  getTrendsLocationCloseToAsync(latitude: number, longitude: number): Promise<ITrendLocation[]>;

  getTrendsLocationCloseToAsync(coordinates: ICoordinates): Promise<ITrendLocation[]>;

  /// <summary>
  /// Returns the locations that Twitter has trending topic information for, closest to a specified location.
  /// </summary>
  /// <para>Read more : https://developer.twitter.com/en/docs/trends/locations-with-trending-topics/api-reference/get-trends-closest </para>
  /// <returns>Trending locations</returns>
  getTrendsLocationCloseToAsync(parameters: IGetTrendsLocationCloseToParameters): Promise<ITrendLocation[]>;
}


export const ITrendsClientToken = new InjectionToken<ITrendsClient>('ITrendsClient', {
  providedIn: 'root',
  factory: () => new TrendsClient(Inject(TwitterClient)),
});
