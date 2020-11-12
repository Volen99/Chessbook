import {inject, Inject, InjectionToken} from "@angular/core";

import {ITwitterResult} from "../../../Core/Web/TwitterResult";
import {IGetTrendsAtParameters} from "../../Parameters/TrendsClient/GetTrendsAtParameters";
import {IGetTrendsAtResult} from "../../Models/Interfaces/IGetTrendsAtResult";
import {IGetTrendsLocationParameters} from "../../Parameters/TrendsClient/GetTrendsLocationParameters";
import {ITrendLocation} from "../../Models/Interfaces/ITrendLocation";
import {IGetTrendsLocationCloseToParameters} from "../../Parameters/TrendsClient/GetTrendsLocationCloseToParameters";
import {TrendsRequester} from "../../../../sharebook/Client/Requesters/TrendsRequester";
import {TrendsClientRequiredParametersValidator} from "../../../Core/Client/Validators/TrendsClientRequiredParametersValidator";
import {TwitterClientEvents} from "../../../Core/Events/TweetinviGlobalEvents";
import {TwitterClient} from "../../../../sharebook/TwitterClient";
import {TrendsController} from "../../../../controllers/Trends/TrendsController";

export interface ITrendsRequester {
  /// <summary>
  /// Returns the top 50 trending topics for a specific WOEID
  /// </summary>
  /// <para>Read more : https://developer.twitter.com/en/docs/trends/trends-for-location/api-reference/get-trends-place </para>
  /// <returns>Twitter result containing the place trends</returns>
  getPlaceTrendsAtAsync(parameters: IGetTrendsAtParameters): Promise<ITwitterResult<IGetTrendsAtResult[]>>;

  /// <summary>
  /// Returns the locations that Twitter has trending topic information for.
  /// </summary>
  /// <para>Read more : https://developer.twitter.com/en/docs/trends/locations-with-trending-topics/api-reference/get-trends-available </para>
  /// <returns>Twitter result containing the trending locations</returns>
  getTrendLocationsAsync(parameters: IGetTrendsLocationParameters): Promise<ITwitterResult<ITrendLocation[]>>;

  /// <summary>
  /// Returns the locations that Twitter has trending topic information for, closest to a specified location.
  /// </summary>
  /// <para>Read more : https://developer.twitter.com/en/docs/trends/locations-with-trending-topics/api-reference/get-trends-closest </para>
  /// <returns>Twitter result containing the trending locations</returns>
  getTrendsLocationCloseToAsync(parameters: IGetTrendsLocationCloseToParameters): Promise<ITwitterResult<ITrendLocation[]>>;
}

export const ITrendsRequesterToken = new InjectionToken<ITrendsRequester>('ITrendsRequester', {
  providedIn: 'root',
  factory: () => new TrendsRequester(inject(TrendsController), inject(TrendsClientRequiredParametersValidator),
    inject(TwitterClient), inject(TwitterClientEvents)),
});
