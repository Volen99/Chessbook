import {ITweetEntities} from "../../Public/Models/Entities/ITweetEntities";
import {IExtendedTweet} from "../../Public/Models/Interfaces/DTO/IExtendedTweet";

export class ExtendedTweet implements IExtendedTweet {
  // [JsonProperty("text")]
  public text: string;

  // [JsonProperty("full_text")]
  public fullText: string;

  // [JsonProperty("display_text_range")]
  public displayTextRange: number[];

  // [JsonProperty("entities")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public legacyEntities: ITweetEntities;

  // [JsonProperty("extended_entities")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public extendedEntities: ITweetEntities;
}
