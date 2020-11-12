import {Inject, Injectable} from "@angular/core";

import {IRateLimitCacheManager} from "../../core/Core/RateLimit/IRateLimitCacheManager";
import {IRateLimitCache, IRateLimitCacheToken} from 'src/app/core/Core/RateLimit/IRateLimitCache';
import {IRateLimitHelper, IRateLimitHelperToken} from "../../core/Core/RateLimit/IRateLimitHelper";
import {IRateLimitsClient} from "../../core/Public/Client/Clients/IRateLimitsClient";
import {IEndpointRateLimit} from 'src/app/core/Public/Models/RateLimits/IEndpointRateLimit';
import {IReadOnlyTwitterCredentials} from "../../core/Core/Models/Authentication/ReadOnlyTwitterCredentials";
import {IGetEndpointRateLimitsParameters} from "../../core/Public/Parameters/HelpClient/GetEndpointRateLimitsParameters";
import {GetRateLimitsParameters, RateLimitsSource} from "../../core/Public/Parameters/HelpClient/GetRateLimitsParameters";
import {ICredentialsRateLimits} from "../../core/Public/Models/RateLimits/ICredentialsRateLimits";
import {RateLimitTrackerMode} from "../../core/Public/Settings/SharebookSettings";
import DateTime from "typescript-dotnet-commonjs/System/Time/DateTime";

@Injectable({
  providedIn: 'root',
})
export class RateLimitCacheManager implements IRateLimitCacheManager {
  private readonly _rateLimitHelper: IRateLimitHelper;
  private readonly _rateLimitCache: IRateLimitCache;

  constructor(@Inject(IRateLimitCacheToken) rateLimitCache: IRateLimitCache,
              @Inject(IRateLimitHelperToken) rateLimitHelper: IRateLimitHelper) {
    this._rateLimitCache = rateLimitCache;
    this._rateLimitHelper = rateLimitHelper;
  }

  get rateLimitCache(): IRateLimitCache {
    return this._rateLimitCache;
  }

  public rateLimitsClient: IRateLimitsClient;

  public async getQueryRateLimitAsync(parameters: IGetEndpointRateLimitsParameters, credentials: IReadOnlyTwitterCredentials): Promise<IEndpointRateLimit> {
    let credentialsRateLimits = await this.rateLimitsClient.getRateLimitsAsync(parameters);
    let endpointRateLimit = this._rateLimitHelper.getEndpointRateLimitFromQuery(parameters.url, credentialsRateLimits, false);

    if (parameters.from === RateLimitsSource.CacheOrTwitterApi && this.shouldEndpointCacheBeUpdated(endpointRateLimit)) {
      let updatedCredentialsRateLimits = await this.refreshCredentialsRateLimitsAsync(credentials);
      endpointRateLimit = this._rateLimitHelper.getEndpointRateLimitFromQuery(parameters.url, updatedCredentialsRateLimits, false);
    }

    return endpointRateLimit;
  }

  public async getCredentialsRateLimitsAsync(credentials: IReadOnlyTwitterCredentials): Promise<ICredentialsRateLimits> {
    let rateLimits = await this._rateLimitCache.getCredentialsRateLimitsAsync(credentials);
    if (rateLimits == null) {
      rateLimits = await this.refreshCredentialsRateLimitsAsync(credentials);
    }

    return rateLimits;
  }

  public updateCredentialsRateLimitsAsync(credentials: IReadOnlyTwitterCredentials, credentialsRateLimits: ICredentialsRateLimits): Promise<void> {
    return this._rateLimitCache.refreshEntryAsync(credentials, credentialsRateLimits);
  }

  public async refreshCredentialsRateLimitsAsync(credentials: IReadOnlyTwitterCredentials): Promise<ICredentialsRateLimits> {
    let tokenRateLimits = await this.getTokenRateLimitsFromTwitterAsync(credentials);
    await this._rateLimitCache.refreshEntryAsync(credentials, tokenRateLimits);

    return await this._rateLimitCache.getCredentialsRateLimitsAsync(credentials);
  }

  public shouldEndpointCacheBeUpdated(rateLimit: IEndpointRateLimit): boolean {
    if (rateLimit == null || rateLimit.isCustomHeaderRateLimit) {
      return false;
    }

    return rateLimit.resetDateTime < DateTime.now;
  }

  private async getTokenRateLimitsFromTwitterAsync(credentials: IReadOnlyTwitterCredentials): Promise<ICredentialsRateLimits> {
    let isApplicationOnlyCreds = !!!credentials.accessToken || !!!credentials.accessTokenSecret;
    if (isApplicationOnlyCreds && !credentials.bearerToken) {
      return null;
    }

    try {
      let getRateLimitsParameters: GetRateLimitsParameters = new GetRateLimitsParameters();
      getRateLimitsParameters.from = RateLimitsSource.TwitterApiOnly;
      getRateLimitsParameters.trackerMode = RateLimitTrackerMode.None;

      return await this.rateLimitsClient.getRateLimitsAsync(getRateLimitsParameters);
    } catch (TwitterException) {
      return null;
    }
  }
}
