import {InjectionToken} from "@angular/core";

import TimeSpan from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Time/TimeSpan";
import DateTime from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Time/DateTime";
import {ITweetinviSettings} from "../../Settings/SharebookSettings";
import {ITwitterRequestParameters} from "./ITwitterRequestParameters";
import {IProxyConfig} from "../../Settings/ProxyConfig";
import {ITwitterCredentials} from "../Authentication/TwitterCredentials";
import {IOAuthQueryParameter} from "../../../Core/Web/IOAuthQueryParameter";
import {IEndpointRateLimit} from "../RateLimits/IEndpointRateLimit";
import {TwitterQuery} from "../../TwitterQuery";

// All the information necessary for an http request to be executed.
export interface ITwitterQuery extends ITwitterRequestParameters {
  // Proxy used to perform the query
  proxyConfig: IProxyConfig;

  // Duration after which the query is considered as having failed.
  timeout: TimeSpan;

  // Credentials with which the query will be executed.
  twitterCredentials: ITwitterCredentials;

  // OAuth request parameters.
  queryParameters: IOAuthQueryParameter[];

  // RateLimit for the specific query. These can be null if the query url,
  // could not be matched with any documented RateLimit field.
  queryRateLimit: IEndpointRateLimit;

  // All the endpoint RateLimits for the query credentials.
  credentialsRateLimits: ICredentialsRateLimits;

  // Date when the credentials will have the required rate limits to execute the query.
  dateWhenCredentialsWillHaveTheRequiredRateLimits?: DateTime;

  // Time to wait before executing the query to ensure that we have not reached the RateLimits.
  timeToWaitBeforeExecutingTheQuery?: TimeSpan;

  initialize(settings: ITweetinviSettings): void;
}

export const ITwitterQueryToken = new InjectionToken<ITwitterQuery>('ITwitterQuery', {
  providedIn: 'root',
  factory: () => new TwitterQuery(),
});
