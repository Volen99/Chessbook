import {inject, Inject, InjectionToken} from "@angular/core";

import {IReadOnlyTwitterCredentials} from "../Models/Authentication/ReadOnlyTwitterCredentials";
import {IRateLimitCache} from "./IRateLimitCache";
import {IRateLimitsClient} from "../../Public/Client/Clients/IRateLimitsClient";
import {IGetEndpointRateLimitsParameters} from "../../Public/Parameters/HelpClient/GetEndpointRateLimitsParameters";
import {IEndpointRateLimit} from "../../Public/Models/RateLimits/IEndpointRateLimit";
import {ICredentialsRateLimits} from "../../Public/Models/RateLimits/ICredentialsRateLimits";
import {RateLimitCacheManager} from "../../../Tweetinvi.Credentials/RateLimit/RateLimitCacheManager";
import {RateLimitHelper} from "../../../Tweetinvi.Credentials/RateLimit/RateLimitHelper";
import {RateLimitCache} from "../../../Tweetinvi.Credentials/RateLimit/RateLimitCache";
import {AppInjector} from "../../../sharebook/Injectinvi/app-injector";

// Proxy used to access and refresh the rate limits cache.
export interface IRateLimitCacheManager {
  rateLimitCache: IRateLimitCache;
  rateLimitsClient: IRateLimitsClient;

  // Return the rate limits for a specific query.
  // If the query url cannot be mapped, a new one is created in the OtherQueryRateLimits.
  // If the credentials rate limits are not located in the cache, they will be retrieved from Twitter.
  getQueryRateLimitAsync(parameters: IGetEndpointRateLimitsParameters, credentials: IReadOnlyTwitterCredentials): Promise<IEndpointRateLimit>


  // Return the all the rate limits for a specific set of credentials.
  // If the rate limits are not located in the cache, they will be retrieved from Twitter.
  getCredentialsRateLimitsAsync(credentials: IReadOnlyTwitterCredentials): Promise<ICredentialsRateLimits>;

  // Update the rate limit cache with a specific set of rate limits.
  updateCredentialsRateLimitsAsync(credentials: IReadOnlyTwitterCredentials, credentialsRateLimits: ICredentialsRateLimits): Promise<void>;

  refreshCredentialsRateLimitsAsync(credentials: IReadOnlyTwitterCredentials): Promise<ICredentialsRateLimits>;

  // Returns whether the rate limits should be refreshed to retrieve a specific endpoint information
  shouldEndpointCacheBeUpdated(rateLimit: IEndpointRateLimit): boolean;
}

export const IRateLimitCacheManagerToken = new InjectionToken<IRateLimitCacheManager>('IRateLimitCacheManager', {
  providedIn: 'root',
  factory: () => AppInjector.get(RateLimitCacheManager) // new RateLimitCacheManager(inject(RateLimitCache), inject(RateLimitHelper)),
});
