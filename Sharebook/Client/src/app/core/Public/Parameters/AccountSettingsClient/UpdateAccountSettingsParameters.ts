import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";
import {Language} from "../../Models/Enum/Language";

// For more description visit: https://dev.twitter.com/en/docs/accounts-and-users/manage-account-settings/api-reference/post-account-settings
export interface IUpdateAccountSettingsParameters extends ICustomRequestParameters {
  /// <summary>
  /// The languages which Twitter should use for this user.
  /// <para>PLEASE MAKE SURE this is a Language from the DisplayLanguages list</para>
  /// <para>You can use a Language.IsADisplayLanguage() extension function to ensure it is supported</para>
  /// <remarks>Tweetinvi will not prevent this parameter to set to any Language for future support</remarks>
  /// </summary>
  displayLanguage?: Language;

  // Must be a Timezone from http://api.rubyonrails.org/classes/ActiveSupport/TimeZone.html
  timeZone?: string;

  // The Yahoo! Where On Earth ID to use as the user’s default trend location.
  // Global information is available by using 1 as the WOEID.
  trendLocationWoeid?: number;

  // When enabled sleep time is the time when push or SMS notifications should not be sent to the user.
  sleepTimeEnabled?: boolean;

  /// <summary>
  /// The hour that sleep time should begin if it is enabled.
  /// The value for this parameter should be provided in ISO8601 format (i.e. 00-23).
  /// The time is considered to be in the same timezone as the user’s time_zone setting.
  /// </summary>
  startSleepHour?: number;

  /// <summary>
  /// The hour that sleep time should end if it is enabled.
  /// The value for this parameter should be provided in ISO8601 format (i.e. 00-23).
  /// The time is considered to be in the same timezone as the user’s time_zone setting.
  /// </summary>
  endSleepHour?: number;

  // The timezone dates and times should be displayed in for the user.
  // The timezone must be one of the Rails TimeZone names.
  SetTimeZone(timeZoneFromTwitter: TimeZoneFromTwitter): void;
}


export class UpdateAccountSettingsParameters extends CustomRequestParameters implements IUpdateAccountSettingsParameters {
  public displayLanguage?: Language;
  public timeZone: string;
  public trendLocationWoeid?: number;
  public sleepTimeEnabled?: boolean;
  public startSleepHour?: number;
  public endSleepHour?: number;

  public SetTimeZone(timeZoneFromTwitter: TimeZoneFromTwitter): void {
    let tzinfo = timeZoneeFromTwitter.GetTZinfo();
    if (tzinfo != null) {
      this.timeZone = tzinfo;
    }
  }
}
