import {Inject, Injectable} from "@angular/core";

import {IRateLimitAwaiter} from "../../core/Core/RateLimit/IRateLimitAwaiter";
import {IRateLimitCacheManager, IRateLimitCacheManagerToken} from "../../core/Core/RateLimit/IRateLimitCacheManager";
import {ITaskDelayer, ITaskDelayerToken} from 'src/app/core/Core/Helpers/TaskDelayer';
import {QueryAwaitingEventArgs} from 'src/app/core/Public/Events/QueryAwaitingEventArgs';
import {ITwitterRequest} from "../../core/Public/Models/Interfaces/ITwitterRequest";
import {
  IWaitForCredentialsRateLimitParameters,
  WaitForCredentialsRateLimitParameters
} from "../../core/Public/Parameters/RateLimitsClient/WaitForCredentialsRateLimitParameters";
import {RateLimitsSource} from "../../core/Public/Parameters/HelpClient/GetRateLimitsParameters";
import {GetEndpointRateLimitsParameters} from "../../core/Public/Parameters/HelpClient/GetEndpointRateLimitsParameters";
import {IEndpointRateLimit} from "../../core/Public/Models/RateLimits/IEndpointRateLimit";
import {ITwitterExecutionContext} from 'src/app/core/Core/Client/TwitterExecutionContext';
import {IReadOnlyTwitterCredentials} from 'src/app/core/Core/Models/Authentication/ReadOnlyTwitterCredentials';
import TimeSpan from "typescript-dotnet-commonjs/System/Time/TimeSpan";

@Injectable({
  providedIn: 'root',
})
export class RateLimitAwaiter implements IRateLimitAwaiter {
  private readonly _rateLimitCacheManager: IRateLimitCacheManager;
  private readonly _taskDelayer: ITaskDelayer;
  private readonly _queryAwaitingForRateLimitWeakEvent: any // IWeakEvent<EventHandler<QueryAwaitingEventArgs>>;

  constructor(
    @Inject(IRateLimitCacheManagerToken) rateLimitCacheManager: IRateLimitCacheManager,
    @Inject(ITaskDelayerToken) taskDelayer: ITaskDelayer,
    queryAwaitingForRateLimitWeakEvent: any /*IWeakEvent<EventHandler<QueryAwaitingEventArgs>>*/) {
    this._rateLimitCacheManager = rateLimitCacheManager;
    this._taskDelayer = taskDelayer;
    this._queryAwaitingForRateLimitWeakEvent = queryAwaitingForRateLimitWeakEvent;
  }

  // public event EventHandler<QueryAwaitingEventArgs> QueryAwaitingForRateLimit
  // {
  //     add => _queryAwaitingForRateLimitWeakEvent.AddHandler(value);
  //     remove => _queryAwaitingForRateLimitWeakEvent.RemoveHandler(value);
  // }

  public async waitForCredentialsRateLimitAsync(parameter: ITwitterRequest | IWaitForCredentialsRateLimitParameters | IEndpointRateLimit,
                                                credentials?: IReadOnlyTwitterCredentials, executionContext?: ITwitterExecutionContext): Promise<void> {
    if (this.isIEndpointRateLimit(parameter)) {
      let timeToWait = this.getTimeToWaitFromQueryRateLimit(parameter, executionContext);
      if (timeToWait > TimeSpan.zero) {
        this._queryAwaitingForRateLimitWeakEvent.Raise(this, new QueryAwaitingEventArgs(null, parameter, credentials));
        await this._taskDelayer.delay(timeToWait);
      }
    } else {
      let waitForCredentialsRateLimitParametersCurrent: IWaitForCredentialsRateLimitParameters;
      if (this.isITwitterRequest(parameter)) {
        waitForCredentialsRateLimitParametersCurrent = new WaitForCredentialsRateLimitParameters(parameter.query.url);
        waitForCredentialsRateLimitParametersCurrent.credentials = parameter.query.twitterCredentials;
        waitForCredentialsRateLimitParametersCurrent.executionContext = parameter.executionContext;
        waitForCredentialsRateLimitParametersCurrent.from = RateLimitsSource.CacheOnly;
      } else {
        waitForCredentialsRateLimitParametersCurrent = parameter;
      }

      let queryRateLimit = await this._rateLimitCacheManager.getQueryRateLimitAsync(new GetEndpointRateLimitsParameters(waitForCredentialsRateLimitParametersCurrent.url,
        waitForCredentialsRateLimitParametersCurrent.from), waitForCredentialsRateLimitParametersCurrent.credentials);
      if (queryRateLimit == null) {
        return;
      }

      let timeToWait = this.getTimeToWaitFromQueryRateLimit(queryRateLimit, waitForCredentialsRateLimitParametersCurrent.executionContext);
      if (timeToWait > TimeSpan.zero) {
        this._queryAwaitingForRateLimitWeakEvent.Raise(this, new QueryAwaitingEventArgs(waitForCredentialsRateLimitParametersCurrent.url, queryRateLimit, waitForCredentialsRateLimitParametersCurrent.credentials));
        await this._taskDelayer.delay(timeToWait);
      }
    }
  }

  public async timeToWaitBeforeTwitterRequestAsync(query: string, credentials: IReadOnlyTwitterCredentials, twitterExecutionContext: ITwitterExecutionContext): Promise<TimeSpan> {
    let queryRateLimits = await this._rateLimitCacheManager.getQueryRateLimitAsync(new GetEndpointRateLimitsParameters(query), credentials);
    return this.getTimeToWaitFromQueryRateLimit(queryRateLimits, twitterExecutionContext);
  }

  public getTimeToWaitFromQueryRateLimit(queryRateLimit: IEndpointRateLimit, executionContext: ITwitterExecutionContext): TimeSpan {
    if (queryRateLimit == null || queryRateLimit.remaining > 0) {
      return TimeSpan.zero;
    }

    let timeToWaitInMs = Math.ceil(queryRateLimit.resetDateTimeInMilliseconds) as number + executionContext.rateLimitWaitFudge.getTotalMilliseconds();
    return TimeSpan.fromMilliseconds(timeToWaitInMs);
  }

  private isIEndpointRateLimit(twitterRequestOrWaitForCredentialsRateLimitParametersOrQueryRateLimit: any):
    twitterRequestOrWaitForCredentialsRateLimitParametersOrQueryRateLimit is IEndpointRateLimit {
    return (twitterRequestOrWaitForCredentialsRateLimitParametersOrQueryRateLimit as IEndpointRateLimit).isCustomHeaderRateLimit !== undefined;
  }

  private isITwitterRequest(twitterRequestOrWaitForCredentialsRateLimitParametersOrQueryRateLimit: ITwitterRequest | IWaitForCredentialsRateLimitParameters):
    twitterRequestOrWaitForCredentialsRateLimitParametersOrQueryRateLimit is ITwitterRequest {
    return (twitterRequestOrWaitForCredentialsRateLimitParametersOrQueryRateLimit as ITwitterRequest).query !== undefined;
  }
}
