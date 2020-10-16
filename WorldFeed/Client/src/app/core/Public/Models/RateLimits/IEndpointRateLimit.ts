import DateTime from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Time/DateTime";

// Give information regarding the rate limits for a specific endpoint of the Twitter API.
export interface IEndpointRateLimit {
  // Remaining operation authorized with the associated credentials.
  remaining: number;

  // Reset DateTime in UTC.
  reset: number;

  // Maximum number of query execution authorized in a rate limit lifecycle (usually 15 minutes).
  limit: number;

  // Remaining seconds to wait before being able to perform such queries again.
  resetDateTimeInSeconds: number;

  // Remaining milliseconds to wait before being able to perform such queries again.
  resetDateTimeInMilliseconds: number;

  // DateTime when the rate limit lifecycle reset.
  resetDateTime: DateTime; // DateTimeOffset;

  isCustomHeaderRateLimit: boolean;
}
