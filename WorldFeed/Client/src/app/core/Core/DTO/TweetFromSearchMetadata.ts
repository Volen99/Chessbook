import {ITweetFromSearchMetadata} from "../../Public/Models/Interfaces/DTO/ITweetFromSearchMetadata";

export class TweetFromSearchMetadata implements ITweetFromSearchMetadata {
  // [JsonProperty("result_type")]
  public resultType: string;

  // [JsonProperty("iso_language_code")]
  public isoLanguageCode: string;
}
