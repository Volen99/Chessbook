import {GetRateLimitsParameters, IGetRateLimitsParameters, RateLimitsSource} from "./GetRateLimitsParameters";

// For more information read: https://developer.twitter.com/en/docs/developer-utilities/rate-limit-status/api-reference/get-application-rate_limit_status
export interface IGetEndpointRateLimitsParameters extends IGetRateLimitsParameters {
  // Url for which you want to get the rate limit
  url: string;
}

export class GetEndpointRateLimitsParameters extends GetRateLimitsParameters implements IGetEndpointRateLimitsParameters {
  constructor(url?: string, from?: RateLimitsSource, source?: IGetEndpointRateLimitsParameters) {
    if (source) {
      super(source);
      this.url = source?.url;
    } else if (url) {
      this.url = url;
      if (from) {
        super.from = from;
      }
    }
  }

  public url: string;
}

// public GetEndpointRateLimitsParameters(string url)
// {
//     Url = url;
// }
//
//
// public GetEndpointRateLimitsParameters(string url, RateLimitsSource from)
// {
//     Url = url;
//     From = from;
// }

// public GetEndpointRateLimitsParameters(IGetEndpointRateLimitsParameters source) : base(source)
// {
//     Url = source?.Url;
// }
