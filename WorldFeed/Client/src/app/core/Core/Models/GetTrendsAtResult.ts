import {IGetTrendsAtResult} from "../../Public/Models/Interfaces/IGetTrendsAtResult";
import {IWoeIdLocation} from "../../Public/Models/Interfaces/IWoeIdLocation";
import {ITrend} from "../../Public/Models/Interfaces/ITrend";
import DateTime from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Time/DateTime";

export class GetTrendsAtResult implements IGetTrendsAtResult {
  // [JsonProperty("as_of")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public asOf: DateTime; // DateTimeOffset;

  // [JsonProperty("created_at")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public createdAt: DateTime; // DateTimeOffset;

  // [JsonProperty("locations")]
  public woeIdLocations: IWoeIdLocation[];

  // [JsonProperty("trends")]
  public trends: ITrend[];
}
