import {Inject, Injectable} from "@angular/core";

import {IRateLimitUpdater, IRateLimitUpdaterFactory} from "../../core/Core/RateLimit/IRateLimitUpdater";
import {IRateLimitCacheManager, IRateLimitCacheManagerToken} from "../../core/Core/RateLimit/IRateLimitCacheManager";
import {ITwitterCredentials} from 'src/app/core/Public/Models/Authentication/TwitterCredentials';
import {RateLimitsSource} from "../../core/Public/Parameters/HelpClient/GetRateLimitsParameters";
import {GetEndpointRateLimitsParameters} from "../../core/Public/Parameters/HelpClient/GetEndpointRateLimitsParameters";
import {IReadOnlyTwitterCredentials} from "../../core/Core/Models/Authentication/ReadOnlyTwitterCredentials";
import Dictionary from "typescript-dotnet-commonjs/System/Collections/Dictionaries/Dictionary";
import Type from "typescript-dotnet-commonjs/System/Types";

@Injectable({
  providedIn: 'root',
})
export class RateLimitUpdaterFactory implements IRateLimitUpdaterFactory {
  constructor() {
  }

  public create(rateLimitCacheManager: IRateLimitCacheManager): IRateLimitUpdater {
    return new RateLimitUpdater(rateLimitCacheManager);
  }
}

export class RateLimitUpdater implements IRateLimitUpdater {
  private readonly _rateLimitCacheManager: IRateLimitCacheManager;

  constructor(@Inject(IRateLimitCacheManagerToken) rateLimitCacheManager: IRateLimitCacheManager) {
    this._rateLimitCacheManager = rateLimitCacheManager;
  }

  public async queryExecutedAsync(query: string, credentials: ITwitterCredentials,
                                  numberOfRequestsOrRateLimitHeaders: number | Dictionary<string, Iterable<string>> = 1): Promise<void> {
    if (!Type.isNumber(numberOfRequestsOrRateLimitHeaders)) {
      if (numberOfRequestsOrRateLimitHeaders !== null && numberOfRequestsOrRateLimitHeaders.count > 0) {
        let rateLimit = await this._rateLimitCacheManager.getQueryRateLimitAsync(new GetEndpointRateLimitsParameters(query), credentials);

        // If the user runs out of RateLimit requests
        if (rateLimit == null) {
          return;
        }

        let limitHeaders: Iterable<string>;
        let out = (value: Iterable<string>): void => {
          limitHeaders = value;
        };
        if (numberOfRequestsOrRateLimitHeaders.tryGetValue("x-rate-limit-limit", out)) /*out limitHeaders*/{
          let limit = limitHeaders[0];
          if (limit != null) {
            rateLimit.limit = parseInt(limit, 10);
          }
        }

        let remainingHeaders: Iterable<string>;
        let out1 = (value: Iterable<string>): void => {
          remainingHeaders = value;
        };
        if (numberOfRequestsOrRateLimitHeaders.tryGetValue("x-rate-limit-remaining", out1)) {
          let remaining = remainingHeaders[0];
          if (remaining != null) {
            rateLimit.remaining = parseInt(remaining, 10);
          }
        }

        let resetHeaders: Iterable<string>;
        let out2 = (value: Iterable<string>): void => {
          remainingHeaders = value;
        };

        if (numberOfRequestsOrRateLimitHeaders.tryGetValue("x-rate-limit-reset", out2)) {
          let reset = resetHeaders[0];
          if (reset != null) {
            rateLimit.reset = parseInt(reset, 10);
          }
        }
      } else {
        await this.queryExecutedAsync(query, credentials);    // TODO: recursion
      }
    } else {
      let getRateLimitsFromCacheParameters = new GetEndpointRateLimitsParameters(query, RateLimitsSource.CacheOnly);
      let rateLimit = await this._rateLimitCacheManager.getQueryRateLimitAsync(getRateLimitsFromCacheParameters, credentials);

      if (rateLimit != null) {
        let newRemainingValue = Math.max(rateLimit.remaining - numberOfRequestsOrRateLimitHeaders, 0);
        rateLimit.remaining = newRemainingValue;
      }
    }
  }

  public async clearRateLimitsForQueryAsync(query: string, credentials: IReadOnlyTwitterCredentials): Promise<void> {
    let rateLimit = await this._rateLimitCacheManager.getQueryRateLimitAsync(new GetEndpointRateLimitsParameters(query, RateLimitsSource.CacheOnly), credentials);
    if (rateLimit != null) {
      rateLimit.remaining = 0;
    }
  }
}
