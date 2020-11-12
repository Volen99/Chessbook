import {inject, Inject, InjectionToken} from "@angular/core";

import {IEndpointRateLimit} from "../../Public/Models/RateLimits/IEndpointRateLimit";
import {RateLimitHelper} from "../../../Tweetinvi.Credentials/RateLimit/RateLimitHelper";
import {ICredentialsRateLimits} from "../../Public/Models/RateLimits/ICredentialsRateLimits";
import {AttributeHelper} from "../Helpers/AttributeHelper";
import { WebHelper } from 'src/app/webLogic/WebHelper';
import {AppInjector} from "../../../sharebook/Injectinvi/app-injector";

// Helper class used to read the flags information from the rate limits and return the rate limits associated with a query.
export interface IRateLimitHelper {
  // Return the specified query rate limits if the query can be identified in the credentialsRateLimits.
  getEndpointRateLimitFromQuery(query: string, rateLimits: ICredentialsRateLimits, createIfNotExist: boolean): IEndpointRateLimit;
}

export const IRateLimitHelperToken = new InjectionToken<IRateLimitHelper>('IRateLimitHelper', {
  providedIn: 'root',
  factory: () => AppInjector.get(RateLimitHelper),
});
