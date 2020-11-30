import {inject, Inject, Injectable, InjectionToken} from "@angular/core";

import {ITwitterResponse} from '../core/Core/Web/ITwitterResponse';
import {ITwitterRequest} from "../core/Public/Models/Interfaces/ITwitterRequest";
import {IRateLimitAwaiter, IRateLimitAwaiterToken} from "../core/Core/RateLimit/IRateLimitAwaiter";
import {IRateLimitCacheManager, IRateLimitCacheManagerToken} from '../core/Core/RateLimit/IRateLimitCacheManager';
import {IRateLimitUpdater, IRateLimitUpdaterFactory, IRateLimitUpdaterFactoryToken} from '../core/Core/RateLimit/IRateLimitUpdater';
import {IWebRequestExecutor, IWebRequestExecutorToken} from '../core/Core/Web/IWebRequestExecutor';
import {BeforeExecutingRequestEventArgs} from "../core/Public/Events/BeforeExecutingRequestEventArgs";
import {MultipartTwitterQuery} from "../core/Public/MultipartTwitterQuery";
import {RateLimitTrackerMode} from "../core/Public/Settings/SharebookSettings";
import {AfterExecutingQueryEventArgs} from "../core/Public/Events/AfterExecutingQueryEventArgs";
import {SharebookException} from "../core/Public/Exceptions/SharebookException";
import {AfterExecutingQueryExceptionEventArgs} from "../core/Public/Events/AfterExecutingQueryExceptionEventArgs";
import {RateLimitsSource} from "../core/Public/Parameters/HelpClient/GetRateLimitsParameters";
import {IEndpointRateLimit} from "../core/Public/Models/RateLimits/IEndpointRateLimit";
import {GetEndpointRateLimitsParameters} from "../core/Public/Parameters/HelpClient/GetEndpointRateLimitsParameters";
import {WebRequestExecutor} from "./WebRequestExecutor";
import {RateLimitAwaiter} from '../Tweetinvi.Credentials/RateLimit/RateLimitAwaiter';
import {RateLimitCacheManager} from "../Tweetinvi.Credentials/RateLimit/RateLimitCacheManager";
import {RateLimitUpdaterFactory} from "../Tweetinvi.Credentials/RateLimit/RateLimitUpdater";
import DateTime from "typescript-dotnet-commonjs/System/Time/DateTime";
import Exception from "typescript-dotnet-commonjs/System/Exception";

export interface ITwitterRequestHandler {
  executeQueryAsync(request: ITwitterRequest): Promise<ITwitterResponse>;

  prepareTwitterRequestAsync(request: ITwitterRequest): Promise<void>;
}

export const ITwitterRequestHandlerToken = new InjectionToken<ITwitterRequestHandler>('ITwitterRequestHandler', {
  providedIn: 'root',
  factory: () => new TwitterRequestHandler(inject(RateLimitAwaiter), inject(RateLimitCacheManager),
    inject(RateLimitUpdaterFactory), inject(WebRequestExecutor))
});

@Injectable({
  providedIn: 'root',
})
export class TwitterRequestHandler implements ITwitterRequestHandler {
  private readonly _rateLimitAwaiter: IRateLimitAwaiter;
  private readonly _rateLimitCacheManager: IRateLimitCacheManager;
  private readonly _rateLimitUpdaterFactory: IRateLimitUpdaterFactory;
  private readonly _webRequestExecutor: IWebRequestExecutor;

  constructor(
    @Inject(IRateLimitAwaiterToken) rateLimitAwaiter: IRateLimitAwaiter,
    @Inject(IRateLimitCacheManagerToken) rateLimitCacheManager: IRateLimitCacheManager,
    @Inject(IRateLimitUpdaterFactoryToken) rateLimitUpdaterFactory: IRateLimitUpdaterFactory,
    @Inject(IWebRequestExecutorToken) webRequestExecutor: IWebRequestExecutor) {
    this._rateLimitAwaiter = rateLimitAwaiter;
    this._rateLimitCacheManager = rateLimitCacheManager;
    this._rateLimitUpdaterFactory = rateLimitUpdaterFactory;
    this._webRequestExecutor = webRequestExecutor;
  }

  public async executeQueryAsync(request: ITwitterRequest): Promise<ITwitterResponse> {
    let rateLimitUpdater = this._rateLimitUpdaterFactory.create(this._rateLimitCacheManager);

    await this.prepareTwitterRequestAsync(request);
    await this.waitBeforeExecutingQueryAsync(request);

    let beforeQueryExecuteEventArgs = new BeforeExecutingRequestEventArgs(request.query);
    // request.executionContext.events.RaiseBeforeExecutingQuery(beforeQueryExecuteEventArgs);

    if (beforeQueryExecuteEventArgs.cancel) {
      throw new Exception("Operation was cancelled intentionally.");
    }


    try {
      let twitterResponse: ITwitterResponse;

      if (!(request.query instanceof MultipartTwitterQuery)) {
        twitterResponse = await this._webRequestExecutor.executeQueryAsync(request, request.twitterClientHandler);
      } else {
        twitterResponse = await this._webRequestExecutor.executeMultipartQueryAsync(request);
      }

      this.queryCompleted(request, twitterResponse, rateLimitUpdater);

      return twitterResponse;
    } catch (ex) {
      debugger
      this.handleException(request, ex, rateLimitUpdater);

      // throw new Error(ex);
    }
  }

  public async prepareTwitterRequestAsync(request: ITwitterRequest): Promise<void> {
    let twitterQuery = request.query;
    twitterQuery.url = TwitterRequestHandler.cleanupQueryUrl(twitterQuery.url); // TODO : THIS LOGIC SHOULD HAPPEN BEFORE ARRIVING HERE

    let rateLimitTrackerMode = request.executionContext.rateLimitTrackerMode;
    if (rateLimitTrackerMode === RateLimitTrackerMode.None) {
      return;
    }

    // Use the RateLimitCacheManager instead of RateLimitHelper to get the queryRateLimits to ensure the cache is up to date!
    let credentialRateLimits = await this._rateLimitCacheManager.getCredentialsRateLimitsAsync(twitterQuery.twitterCredentials);

    let queryRateLimit: IEndpointRateLimit = null;

    // If we were not able to retrieve the credentials few ms before there is no reason why it would work now.
    if (credentialRateLimits != null) {
      let getEndpointRateLimitsFromCache = new GetEndpointRateLimitsParameters(twitterQuery.url, RateLimitsSource.CacheOnly);
      queryRateLimit = await this._rateLimitCacheManager.getQueryRateLimitAsync(getEndpointRateLimitsFromCache, twitterQuery.twitterCredentials);
    }

    let timeToWait = this._rateLimitAwaiter.getTimeToWaitFromQueryRateLimit(queryRateLimit, request.executionContext);

    twitterQuery.credentialsRateLimits = credentialRateLimits;
    twitterQuery.queryRateLimit = queryRateLimit;
    twitterQuery.dateWhenCredentialsWillHaveTheRequiredRateLimits = DateTime.now.add(timeToWait); // utcNow
  }

  private async waitBeforeExecutingQueryAsync(twitterRequest: ITwitterRequest): Promise<void> {
    let twitterQuery = twitterRequest.query;
    if (twitterQuery.dateWhenCredentialsWillHaveTheRequiredRateLimits == null) {
      return;
    }

    if (twitterRequest.executionContext.rateLimitTrackerMode === RateLimitTrackerMode.TrackAndAwait) {
      await this._rateLimitAwaiter.waitForCredentialsRateLimitAsync(twitterRequest);
    }
  }

  // #region Helper Methods

  private static cleanupQueryUrl(query: string): string {
    let index = query.indexOf("?", /*StringComparison.OrdinalIgnoreCase*/);
    if (index > 0) {
      if (query.length === index + 1) {
        query = query.slice(0, 3);  // query = query.Remove(index);

        return query;
      }

      if (query.length > index && query[index + 1] === '&') {
        // query = query.Remove(index + 1, 1);
        query = query.slice(0, index + 1) + query.slice(index + 1 + 1, query.length);
      }
    }

    return query;
  }

  private queryCompleted(request: ITwitterRequest, twitterResponse: ITwitterResponse, rateLimitUpdater: IRateLimitUpdater): void {
    if (request.executionContext.rateLimitTrackerMode !== RateLimitTrackerMode.None) {
      // I want to die so badly...
      let rateLimitHeaders = new Map([...twitterResponse.headers.normalizedNames].filter(kvp => kvp[0].startsWith("x-rate-limit-"))); // .ToDictionary(kvp => kvp.Key, kvp => kvp.Value);

      rateLimitUpdater.queryExecutedAsync(request.query.url, request.query.twitterCredentials, rateLimitHeaders);
    }

    // @ts-ignore
    // request.executionContext.events.RaiseAfterExecutingQuery(new AfterExecutingQueryEventArgs(request.query, twitterResponse.content, twitterResponse.headers));
  }

  private handleException(request: ITwitterRequest, exception: SharebookException, rateLimitUpdater: IRateLimitUpdater): void {
    let statusCode = exception.statusCode;
    const tooManyRequestStatusCode: number = 429;
    if (request.executionContext.rateLimitTrackerMode !== RateLimitTrackerMode.None && statusCode === tooManyRequestStatusCode) {
      rateLimitUpdater.clearRateLimitsForQueryAsync(request.query.url, request.query.twitterCredentials);
    }

   // request.executionContext.events.RaiseAfterExecutingQuery(new AfterExecutingQueryExceptionEventArgs(request.query, exception));
  }

  // #endregion
}
