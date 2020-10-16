import {ITrend} from "../../../Public/Models/Interfaces/ITrend";

export class Trend implements ITrend {
  // [JsonProperty("name")]
  public name: string;

  // [JsonProperty("url")]
  public URL: string;

  // [JsonProperty("query")]
  public query: string;

  // [JsonProperty("promoted_content")]
  public promotedContent: string;

  // [JsonProperty("tweet_volume")]
  public tweetVolume: number; // long?
}
