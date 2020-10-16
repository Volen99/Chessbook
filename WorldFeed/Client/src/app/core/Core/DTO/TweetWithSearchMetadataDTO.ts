import {TweetDTO} from "./TweetDTO";
import {ITweetFromSearchMetadata} from "../../Public/Models/Interfaces/DTO/ITweetFromSearchMetadata";
import {ITweetWithSearchMetadataDTO} from "../../Public/Models/Interfaces/DTO/ITweetWithSearchMetadataDTO";

export class TweetWithSearchMetadataDTO extends TweetDTO implements ITweetWithSearchMetadataDTO {
  // [JsonProperty("metadata")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public tweetFromSearchMetadata: ITweetFromSearchMetadata;
}
