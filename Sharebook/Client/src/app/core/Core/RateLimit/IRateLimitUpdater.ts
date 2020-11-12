import {inject, Inject, InjectionToken} from "@angular/core";

import {IRateLimitCacheManager} from "./IRateLimitCacheManager";
import {IReadOnlyTwitterCredentials} from "../Models/Authentication/ReadOnlyTwitterCredentials";
import {ITwitterCredentials} from "../../Public/Models/Authentication/TwitterCredentials";
import {RateLimitUpdater, RateLimitUpdaterFactory} from "../../../Tweetinvi.Credentials/RateLimit/RateLimitUpdater";
import Dictionary from "typescript-dotnet-commonjs/System/Collections/Dictionaries/Dictionary";

export interface IRateLimitUpdaterFactory {
  create(rateLimitCacheManager: IRateLimitCacheManager): IRateLimitUpdater;
}

export const IRateLimitUpdaterFactoryToken = new InjectionToken<IRateLimitUpdaterFactory>('IRateLimitUpdaterFactory', {
  providedIn: 'root',
  factory: () => new RateLimitUpdaterFactory(),
});


// Update the rate limit cached information.
export interface IRateLimitUpdater {
  // Inform the updater a specific query has been executed with a specific set of credentials.
  queryExecutedAsync(query: string, credentials: ITwitterCredentials, numberOfRequests): Promise<void>;

  // Inform the updater a specific query has been executed with a specific set of credentials.
  queryExecutedAsync(query: string, credentials: ITwitterCredentials, rateLimitHeaders: Dictionary<string, Array<string>>): Promise<void>;

  // Inform that you want to query rate limits to be set to 0.
  clearRateLimitsForQueryAsync(query: string, credentials: IReadOnlyTwitterCredentials): Promise<void>;
}

export const IRateLimitUpdaterToken = new InjectionToken<IRateLimitUpdater>('IRateLimitUpdater', {
  providedIn: 'root',
  factory: () => new RateLimitUpdater(inject(RateLimitUpdater)),
});
