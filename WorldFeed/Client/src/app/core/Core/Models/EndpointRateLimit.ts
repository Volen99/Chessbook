import DateTime from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Time/DateTime";
import {IEndpointRateLimit} from "../../Public/Models/RateLimits/IEndpointRateLimit";

export class EndpointRateLimit implements IEndpointRateLimit {
  // Number of operation available on the specific endpoint.
  // [JsonProperty("remaining")]
  public remaining: number;

  private _reset: number;

  // Integer representing the datetime when the endpoint rate limit will be reset.
  // [JsonProperty("reset")]
  get reset(): number {
    return this._reset;
  }

  set reset(value: number) {
    this._reset = value;
    this.resetDateTime = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
    this.resetDateTime = this.resetDateTime.addSeconds(this._reset).ToLocalTime();
  }

  // Maximum number of operations that can be performed in 15 minutes.
  // [JsonProperty("limit")]
  public limit: number;

  // Duration in seconds after which the endpoint rate limit will be reset.
  // [JsonIgnore]
  get resetDateTimeInSeconds(): number {
    if (this.resetDateTime <= DateTime.now) {
      return 0;
    }

    return (this.resetDateTime - DateTime.now).TotalSeconds;
  }

  // Duration in milliseconds after which the endpoint rate limit will be reset.
  // [JsonIgnore]
  get resetDateTimeInMilliseconds(): number {
    return this.resetDateTimeInSeconds * 1000;
  }

  // DateTime when the endpoint rate limit will be reset.
  // [JsonIgnore]
  public resetDateTime: DateTime; // DateTimeOffset;

  public isCustomHeaderRateLimit: boolean;

  public ToString(): string {
    return `${(this.remaining)}/${(this.limit)} (Reset in ${(this.resetDateTimeInSeconds)} seconds)`;
  }
}
