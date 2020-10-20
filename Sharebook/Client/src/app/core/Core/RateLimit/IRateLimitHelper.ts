import {IEndpointRateLimit} from "../../Public/Models/RateLimits/IEndpointRateLimit";

// Helper class used to read the flags information from the rate limits and return the rate limits associated with a query.
export interface IRateLimitHelper {
  // Return the specified query rate limits if the query can be identified in the credentialsRateLimits.
  getEndpointRateLimitFromQuery(query: string, rateLimits: ICredentialsRateLimits, createIfNotExist: boolean): IEndpointRateLimit;
}
