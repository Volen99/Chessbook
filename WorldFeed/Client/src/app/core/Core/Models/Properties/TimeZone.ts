import {ITimeZone} from "../../../Public/Models/Interfaces/ITimeZone";

export class TimeZone implements ITimeZone {
  // [JsonProperty("name")]
  public name: string;

  // [JsonProperty("tzinfo_name")]
  public tzinfoName: string;

  // [JsonProperty("utc_offset")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public utcOffset: number;
}
