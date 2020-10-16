import {IOEmbedTweetDTO} from "../../Public/Models/Interfaces/DTO/IOembedTweetDTO";

export class OEmbedTweetDTO implements IOEmbedTweetDTO {
  // [JsonProperty("author_name")]
  public authorName: string;

  // [JsonProperty("author_url")]
  public authorURL: string;

  // [JsonProperty("html")]
  public HTML: string;

  // [JsonProperty("url")]
  public URL: string;

  // [JsonProperty("provider_url")]
  public providerURL: string;

  // [JsonProperty("width")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public width: number;

  // [JsonProperty("height")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public height: number;

  // [JsonProperty("version")]
  public version: string;

  // [JsonProperty("type")]
  public type: string;

  // [JsonProperty("cache_age")]
  public cacheAge: string;
}
