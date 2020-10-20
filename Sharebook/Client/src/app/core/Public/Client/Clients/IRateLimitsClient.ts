import {IGetRateLimitsParameters, RateLimitsSource} from "../../Parameters/HelpClient/GetRateLimitsParameters";
import {IEndpointRateLimit} from "../../Models/RateLimits/IEndpointRateLimit";
import {IGetEndpointRateLimitsParameters} from "../../Parameters/HelpClient/GetEndpointRateLimitsParameters";
import {IReadOnlyTwitterCredentials} from "../../../Core/Models/Authentication/ReadOnlyTwitterCredentials";

export interface IRateLimitsClient {
  // Load the client's rate limits in the cache
  initializeRateLimitsManagerAsync(): Promise<void>;

  getRateLimitsAsync(): Promise<ICredentialsRateLimits>;

  getRateLimitsAsync(from: RateLimitsSource): Promise<ICredentialsRateLimits>;

  /// <summary>
  /// Get the rate limits of the current client
  /// </summary>
  /// <para> Read more : https://developer.twitter.com/en/docs/developer-utilities/rate-limit-status/api-reference/get-application-rate_limit_status </para>
  /// <returns>The client's rate limits</returns>
  getRateLimitsAsync(parameters: IGetRateLimitsParameters): Promise<ICredentialsRateLimits>;

  getEndpointRateLimitAsync(url: string): Promise<IEndpointRateLimit>;

  getEndpointRateLimitAsync(url: string, from: RateLimitsSource): Promise<IEndpointRateLimit>;

  /// <summary>
  /// Get a specific endpoint's rate limits of the current client
  /// </summary>
  /// <para> Read more : https://developer.twitter.com/en/docs/developer-utilities/rate-limit-status/api-reference/get-application-rate_limit_status </para>
  /// <returns>The endpoint's rate limits, or null if the endpoint is not support by Tweetinvi</returns>
  getEndpointRateLimitAsync(parameters: IGetEndpointRateLimitsParameters): Promise<IEndpointRateLimit>;

  waitForQueryRateLimitAsync(url: string): Promise<void>;

  waitForQueryRateLimitAsync(url: string, from: RateLimitsSource): Promise<void>;

  // Wait for new requests to a specific endpoint become available
  waitForQueryRateLimitAsync(endpointRateLimit: IEndpointRateLimit): Promise<void>;

  // Clear the rate limits cached for a specific set of credentials
  clearRateLimitCacheAsync(credentials: IReadOnlyTwitterCredentials): Promise<void>;

  // Clear the rate limits cached for the client's credentials
  clearRateLimitCacheAsync(): Promise<void>;

  // Clear the rate limits of all the credentials
  clearAllRateLimitCacheAsync(): Promise<void>;
}

