import {PrivacyMode} from '../../Public/Models/Enum/PrivacyMode';
import {ITimeZone} from "../../Public/Models/Interfaces/ITimeZone";
import {IAccountSettingsDTO} from "../../Public/Models/Interfaces/DTO/IAccountSettingsDTO";
import {Language} from '../../Public/Models/Enum/Language';
import {AllowContributorRequestMode} from "../../Public/Models/Enum/AllowContributorRequestMode";
import {AllowDirectMessagesFrom} from '../../Public/Models/Enum/AllowDirectMessagesFrom';
import {ITrendLocation} from "../../Public/Models/Interfaces/ITrendLocation";

export class AccountSettingsDTO implements IAccountSettingsDTO {
  // private class SleepTimeDTO
  // {
  //     // [JsonProperty("enabled")]
  //     public Enabled: boolean;
  //
  //     // [JsonProperty("start_time")]
  //     // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  //     public StartTime: number;
  //
  //     // [JsonProperty("end_time")]
  //     // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  //     public EndTime: number;
  // }

  private SleepTimeDTO = class {
    // [JsonProperty("enabled")]
    public enabled: boolean;

    // [JsonProperty("start_time")]
    // [JsonConverter(typeof(JsonPropertyConverterRepository))]
    public startTime: number;

    // [JsonProperty("end_time")]
    // [JsonConverter(typeof(JsonPropertyConverterRepository))]
    public endTime: number;
  };

  // [JsonProperty("screen_name")]
  public screenName: string;

  // [JsonProperty("protected")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public privacyMode: PrivacyMode;

  // [JsonProperty("language")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public language: Language;

  // [JsonProperty("always_use_https")]
  public alwaysUseHttps: boolean;

  // [JsonProperty("discoverable_by_email")]
  public discoverableByEmail: boolean;

  // [JsonProperty("discoverable_by_mobile_phone")]
  public discoverableByMobilePhone: boolean;

  // [JsonProperty("geo_enabled")]
  public geoEnabled: boolean;

  // [JsonProperty("use_cookie_personalization")]
  public useCookiePersonalization: boolean;

  // [JsonProperty("allow_contributor_request")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public allowContributorRequest: AllowContributorRequestMode;

  // [JsonProperty("allow_dms_from")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public allowDirectMessagesFrom: AllowDirectMessagesFrom;

  // [JsonProperty("allow_dm_groups_from")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public allowGroupDirectMessagesFrom: AllowDirectMessagesFrom;

  // [JsonProperty("time_zone")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public timeZone: ITimeZone;

  // [JsonProperty("display_sensitive_media")]
  public displaySensitiveMedia: boolean;

  // [JsonProperty("smart_mute")]
  public smartMute: boolean;

  // [JsonProperty("sleep_time")]
  private _sleepTime: any; // SleepTimeDTO;

  get sleepTimeEnabled(): boolean {
    return this._sleepTime.Enabled;
  }

  set sleepTimeEnabled(value: boolean) {
    this._sleepTime.Enabled = value;
  }

  get sleepTimeStartHour(): number {
    return this._sleepTime.StartTime;
  }

  set sleepTimeStartHour(value: number) {
    this._sleepTime.StartTime = value;
  }

  get sleepTimeEndHour(): number {
    return this._sleepTime.EndTime;
  }

  set sleepTimeEndHour(value: number) {
    this._sleepTime.EndTime = value;
  }

  // [JsonProperty("translator_type")]
  public translatorType: string;

  // [JsonProperty("trend_location")]
  public trendLocations: ITrendLocation[];
}
