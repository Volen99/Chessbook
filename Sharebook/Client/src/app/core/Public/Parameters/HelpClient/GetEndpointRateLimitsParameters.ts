import {GetRateLimitsParameters, IGetRateLimitsParameters, RateLimitsSource} from "./GetRateLimitsParameters";
import Type from "typescript-dotnet-commonjs/System/Types";

// For more information read: https://developer.twitter.com/en/docs/developer-utilities/rate-limit-status/api-reference/get-application-rate_limit_status
export interface IGetEndpointRateLimitsParameters extends IGetRateLimitsParameters {
  // Url for which you want to get the rate limit
  url: string;
}

export class GetEndpointRateLimitsParameters extends GetRateLimitsParameters implements IGetEndpointRateLimitsParameters {
  constructor(urlOrSource?: string | IGetEndpointRateLimitsParameters, from?: RateLimitsSource) {
    if (Type.isString(urlOrSource)) {
      super();

      this.url = urlOrSource;
      if (from) {
        this.from = from;
      }
    } else {
      this.url = urlOrSource.url;
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
