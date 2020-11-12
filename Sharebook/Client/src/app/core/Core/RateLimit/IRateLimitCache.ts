import {InjectionToken} from "@angular/core";

import {IReadOnlyTwitterCredentials} from "../Models/Authentication/ReadOnlyTwitterCredentials";
import {RateLimitCache} from "../../../Tweetinvi.Credentials/RateLimit/RateLimitCache";
import {ICredentialsRateLimits} from "../../Public/Models/RateLimits/ICredentialsRateLimits";

// Cache storing the RateLimits to reduce the number of access to the Twitter API rate limits.
// Access to the rate limit cache should be done via the RateLimitCacheManager.
export interface IRateLimitCache {
  // Clear the rate limits entry associated with a specific set of credentials.
  clearAsync(credentials: IReadOnlyTwitterCredentials): Promise<void>;

  // Clear all the rate limit entries from the cache.
  clearAllAsync(): Promise<void>;

  // Manually set a rate limit entry for a specific set of credentials.
  refreshEntryAsync(credentials: IReadOnlyTwitterCredentials, newCredentialsRateLimits: ICredentialsRateLimits): Promise<void>;

  // Return the rate limits entry for a set of credentials.
  getCredentialsRateLimitsAsync(credentials: IReadOnlyTwitterCredentials): Promise<ICredentialsRateLimits>;
}

export const IRateLimitCacheToken = new InjectionToken<IRateLimitCache>('IRateLimitCache', {
  providedIn: 'root',
  factory: () => new RateLimitCache(),
});
