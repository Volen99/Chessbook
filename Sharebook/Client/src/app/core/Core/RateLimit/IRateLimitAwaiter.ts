import {inject, Inject, InjectionToken} from "@angular/core";

import {ITwitterRequest} from "../../Public/Models/Interfaces/ITwitterRequest";
import {IReadOnlyTwitterCredentials} from "../Models/Authentication/ReadOnlyTwitterCredentials";
import {IWaitForCredentialsRateLimitParameters} from "../../Public/Parameters/RateLimitsClient/WaitForCredentialsRateLimitParameters";
import {IEndpointRateLimit} from "../../Public/Models/RateLimits/IEndpointRateLimit";
import {ITwitterExecutionContext} from "../Client/TwitterExecutionContext";
import { RateLimitAwaiter } from 'src/app/Tweetinvi.Credentials/RateLimit/RateLimitAwaiter';
import {TaskDelayer} from "../Helpers/TaskDelayer";
import {RateLimitCacheManager} from "../../../Tweetinvi.Credentials/RateLimit/RateLimitCacheManager";
import TimeSpan from "typescript-dotnet-commonjs/System/Time/TimeSpan";

// Wait for the RateLimits before performing an operation.
export interface IRateLimitAwaiter {
  // Inform that a query is currently waiting in the RateLimitAwaiter
  // for the appropriate RateLimits to be refreshed before being executed.

  // event QueryAwaitingForRateLimit: EventHandler<QueryAwaitingEventArgs>;   // TODO: UNCOMMENT!!

  // Wait for the credentials' rate limits to be available for the specified query.
  waitForCredentialsRateLimitAsync(request: ITwitterRequest): Promise<void>;

  // Wait for the credentials' rate limits to be available for the specified query.
  waitForCredentialsRateLimitAsync(parameters: IWaitForCredentialsRateLimitParameters): Promise<void>;

  // Wait for the credentials' rate limits to be available for the specified endpoint.
  waitForCredentialsRateLimitAsync(queryRateLimit: IEndpointRateLimit, credentials: IReadOnlyTwitterCredentials, executionContext: ITwitterExecutionContext): Promise<void>;

  // Get the duration to wait before executing the specified query.
  timeToWaitBeforeTwitterRequestAsync(query: string, credentials: IReadOnlyTwitterCredentials, twitterExecutionContext: ITwitterExecutionContext): Promise<TimeSpan>;

  // Get the duration (milliseconds) to wait before executing a query using the specified rate limits.
  getTimeToWaitFromQueryRateLimit(queryRateLimit: IEndpointRateLimit, executionContext: ITwitterExecutionContext): TimeSpan;
}

export const IRateLimitAwaiterToken = new InjectionToken<IRateLimitAwaiter>('IRateLimitAwaiter', {
  providedIn: 'root',
  factory: () => new RateLimitAwaiter(inject(RateLimitCacheManager), inject(TaskDelayer), null),
});

