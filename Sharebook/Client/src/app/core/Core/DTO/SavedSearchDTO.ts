import {ISavedSearchDTO} from "../../Public/Models/Interfaces/DTO/ISavedSearchDTO";
import DateTime from "typescript-dotnet-commonjs/System/Time/DateTime";

export class SavedSearchDTO implements ISavedSearchDTO {
  // [JsonProperty("id")]
  public id: number;

  // [JsonProperty("IdStr")]
  public idStr: string;

  // [JsonProperty("name")]
  public name: string;

  // [JsonProperty("query")]
  public query: string;

  // [JsonProperty("created_at")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public createdAt: DateTime;  // DateTimeOffset;
}
