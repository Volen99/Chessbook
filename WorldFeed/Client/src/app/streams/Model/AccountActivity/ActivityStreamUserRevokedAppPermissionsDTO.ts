import {ActivityStreamAppIdentifierDTO} from "./ActivityStreamAppIdentifierDTO";
import {ActivityStreamUserIdentifierDTO} from "./ActivityStreamUserIdentifierDTO";

export class ActivityStreamUserRevokedAppPermissionsDTO {
  // [JsonProperty("date_time")]
  public DateTime: DateTimeOffset;

  // [JsonProperty("target")]
  public Target: ActivityStreamAppIdentifierDTO;

  // [JsonProperty("source")]
  public Source: ActivityStreamUserIdentifierDTO;
}
