import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";
import {RateLimitTrackerMode} from "../../Settings/TweetinviSettings";

export enum RateLimitsSource {
  // Gets the rate limits from the cache if they exists.
  // If they do not exists, get from Twitter api and save in cache.
  CacheOrTwitterApi,

  // Gets the rate limits from the cache only.
  // If the cache does not have such rate limits, will return null.
  CacheOnly,

  // Gets the rate limits from Twitter api.
  // This does not try to get the rate limits from the cache nor does it save them there.
  TwitterApiOnly
}

// For more information visit: https://developer.twitter.com/en/docs/developer-utilities/rate-limit-status/api-reference/get-application-rate_limit_status
export interface IGetRateLimitsParameters extends ICustomRequestParameters {
  // How you want the rate limits to be retrieved.
  // This parameter is not a parameter applied to the Twitter Api request.
  from: RateLimitsSource;

  // Defines how the requests will be tracked
  trackerMode?: RateLimitTrackerMode;
}

export class GetRateLimitsParameters extends CustomRequestParameters implements IGetRateLimitsParameters {
  constructor(source?: IGetRateLimitsParameters) {
    super();
    if (source) {
      this.from = source.from;
      this.trackerMode = source.trackerMode;
    }
  }

  public from: RateLimitsSource;

  public trackerMode?: RateLimitTrackerMode;
}


// public GetRateLimitsParameters()
// {
// }
//
// public GetRateLimitsParameters(IGetRateLimitsParameters source)
// {
//   if (source == null)
//   {
//     return;
//   }
//
//   From = source.From;
//   TrackerMode = source.TrackerMode;
// }
