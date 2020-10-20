import {ITweetIdentifier} from "../../Public/Models/Interfaces/ITweetIdentifier";

export class TweetIdentifierDTO implements ITweetIdentifier {
  // [JsonProperty("id")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public id: number;

  // [JsonProperty("id_str")]
  public idStr: string;
}
