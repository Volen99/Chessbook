import {IRateLimitCacheManager} from "./IRateLimitCacheManager";
import Dictionary from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Dictionaries/Dictionary";
import {IReadOnlyTwitterCredentials} from "../Models/Authentication/ReadOnlyTwitterCredentials";
import {ITwitterCredentials} from "../../Public/Models/Authentication/TwitterCredentials";

export interface IRateLimitUpdaterFactory {
  create(rateLimitCacheManager: IRateLimitCacheManager): IRateLimitUpdater;
}

// Update the rate limit cached information.
export interface IRateLimitUpdater {
  // Inform the updater a specific query has been executed with a specific set of credentials.
  queryExecutedAsync(query: string, credentials: ITwitterCredentials, numberOfRequests): Promise<void>;

  // Inform the updater a specific query has been executed with a specific set of credentials.
  queryExecutedAsync(query: string, credentials: ITwitterCredentials, rateLimitHeaders: Dictionary<string, Array<string>>): Promise<void>;

  // Inform that you want to query rate limits to be set to 0.
  clearRateLimitsForQueryAsync(query: string, credentials: IReadOnlyTwitterCredentials): Promise<void>;
}
