import {IEndpointRateLimit} from "../../Public/Models/RateLimits/IEndpointRateLimit";
import Dictionary from "typescript-dotnet-commonjs/System/Collections/Dictionaries/Dictionary";

export class CredentialsRateLimitsDTO {
  // [JsonProperty("rate_limit_context")]
  public rateLimitContext: any; // JObject;

  // [JsonProperty("resources")]
  public resources: RateLimitResources;
}

export class RateLimitResources  {
  /*[JsonProperty("account")]*/
  public accountRateLimits: Dictionary<string, IEndpointRateLimit>;
  /*[JsonProperty("application")]*/
  public applicationRateLimits: Dictionary<string, IEndpointRateLimit>;
  /*[JsonProperty("auth")]*/
  public authRateLimits: Dictionary<string, IEndpointRateLimit>;
  /*[JsonProperty("blocks")]*/
  public blocksRateLimits: Dictionary<string, IEndpointRateLimit>;
  /*[JsonProperty("business_experience")]*/
  public businessExperienceRateLimits: Dictionary<string, IEndpointRateLimit>;
  /*[JsonProperty("collections")]*/
  public collectionsRateLimits: Dictionary<string, IEndpointRateLimit>;
  /*[JsonProperty("contacts")]*/
  public contactsRateLimits: Dictionary<string, IEndpointRateLimit>;
  /*[JsonProperty("device")]*/
  public deviceRateLimits: Dictionary<string, IEndpointRateLimit>;
  /*[JsonProperty("direct_messages")]*/
  public directMessagesRateLimits: Dictionary<string, IEndpointRateLimit>;
  /*[JsonProperty("favorites")]*/
  public favoritesRateLimits: Dictionary<string, IEndpointRateLimit>;
  /*[JsonProperty("feedback")]*/
  public feedbackRateLimits: Dictionary<string, IEndpointRateLimit>;
  /*[JsonProperty("followers")]*/
  public followersRateLimits: Dictionary<string, IEndpointRateLimit>;
  /*[JsonProperty("friends")]*/
  public friendsRateLimits: Dictionary<string, IEndpointRateLimit>;
  /*[JsonProperty("friendships")]*/
  public friendshipsRateLimits: Dictionary<string, IEndpointRateLimit>;
  /*[JsonProperty("geo")]*/
  public geoRateLimits: Dictionary<string, IEndpointRateLimit>;
  /*[JsonProperty("help")]*/
  public helpRateLimits: Dictionary<string, IEndpointRateLimit>;
  /*[JsonProperty("lists")]*/
  public listsRateLimits: Dictionary<string, IEndpointRateLimit>;
  /*[JsonProperty("media")]*/
  public mediaRateLimits: Dictionary<string, IEndpointRateLimit>;
  /*[JsonProperty("moments")]*/
  public momentsRateLimits: Dictionary<string, IEndpointRateLimit>;
  /*[JsonProperty("mutes")]*/
  public mutesRateLimits: Dictionary<string, IEndpointRateLimit>;
  /*[JsonProperty("saved_searches")]*/
  public savedSearchesRateLimits: Dictionary<string, IEndpointRateLimit>;
  /*[JsonProperty("search")]*/
  public searchRateLimits: Dictionary<string, IEndpointRateLimit>;
  /*[JsonProperty("statuses")]*/
  public statusesRateLimits: Dictionary<string, IEndpointRateLimit>;
  /*[JsonProperty("tweet_prompts")]*/
  public tweetPromptsRateLimits: Dictionary<string, IEndpointRateLimit>;
  /*[JsonProperty("trends")]*/
  public trendsRateLimits: Dictionary<string, IEndpointRateLimit>;
  /*[JsonProperty("users")]*/
  public usersRateLimits: Dictionary<string, IEndpointRateLimit>;
}
