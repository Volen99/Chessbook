import {Resources} from "../../properties/resources";
import StringBuilder from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Text/StringBuilder";
import {IGetAccountSettingsParameters} from "../../core/Public/Parameters/AccountSettingsClient/GetAccountSettingsParameters";
import {IUpdateAccountSettingsParameters} from "../../core/Public/Parameters/AccountSettingsClient/UpdateAccountSettingsParameters";
import {IUpdateProfileParameters} from "../../core/Public/Parameters/AccountSettingsClient/UpdateProfileParameters";
import {IUpdateProfileImageParameters} from "../../core/Public/Parameters/AccountSettingsClient/UpdateProfileImageParameters";
import {IRemoveProfileBannerParameters} from "../../core/Public/Parameters/AccountSettingsClient/RemoveProfileBannerParameters";
import {IUpdateProfileBannerParameters} from "../../core/Public/Parameters/AccountSettingsClient/UpdateProfileBannerParameters";
import {Language} from "../../core/Public/Models/Enum/Language";

export interface IAccountSettingsQueryGenerator {
  GetAccountSettingsQuery(parameters: IGetAccountSettingsParameters): string;

  GetUpdateAccountSettingsQuery(parameters: IUpdateAccountSettingsParameters): string;

  GetUpdateProfileQuery(parameters: IUpdateProfileParameters): string;

  GetUpdateProfileImageQuery(parameters: IUpdateProfileImageParameters): string;

  GetUpdateProfileBannerQuery(parameters: IUpdateProfileBannerParameters): string;

  GetRemoveProfileBannerQuery(parameters: IRemoveProfileBannerParameters): string;
}

export class AccountSettingsQueryGenerator implements IAccountSettingsQueryGenerator {
  public GetAccountSettingsQuery(parameters: IGetAccountSettingsParameters): string {
    let query = new StringBuilder(Resources.Account_GetSettings);
    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public GetUpdateAccountSettingsQuery(parameters: IUpdateAccountSettingsParameters): string {
    let baseQuery = new StringBuilder(Resources.Account_UpdateSettings);

    let langParameterValue = parameters.displayLanguage === Language.Undefined ? null : parameters.displayLanguage?.GetLanguageCode();

    baseQuery.addParameterToQuery("lang", langParameterValue);
    baseQuery.addParameterToQuery("time_zone", parameters.timeZone);
    baseQuery.addParameterToQuery("sleep_time_enabled", parameters?.sleepTimeEnabled);
    baseQuery.addParameterToQuery("start_sleep_time", SleepHourToString(parameters.startSleepHour));
    baseQuery.addParameterToQuery("end_sleep_time", SleepHourToString(parameters.endSleepHour));
    baseQuery.addParameterToQuery("trend_location_woeid", parameters.trendLocationWoeid);

    baseQuery.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

    return baseQuery.toString();
  }

  public GetUpdateProfileQuery(parameters: IUpdateProfileParameters): string {
    let query = new StringBuilder(Resources.Account_UpdateProfile);

    query.addParameterToQuery("name", parameters.name);
    query.addParameterToQuery("url", parameters.websiteUrl);
    query.addParameterToQuery("location", parameters.location);
    query.addParameterToQuery("description", parameters.description);
    query.addParameterToQuery("profile_link_color", parameters.profileLinkColor);
    query.addParameterToQuery("include_entities", parameters.includeEntities);
    query.addParameterToQuery("skip_status", parameters.skipStatus);

    query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

    return query.ToString();
  }

  private static SleepHourToString(hour?: number): string {
    if (hour == null) {
      return null;
    }

    if (hour >= 0 && hour < 10) {
      return `0${hour}`;
    }

    return hour.ToString();
  }

  public GetUpdateProfileImageQuery(parameters: IUpdateProfileImageParameters): string {
    var query = new StringBuilder(Resources.Account_UpdateProfileImage);

    query.addParameterToQuery("include_entities", parameters.includeEntities);
    query.addParameterToQuery("skip_status", parameters.skipStatus);
    query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

    return query.ToString();
  }

  public GetUpdateProfileBannerQuery(parameters: IUpdateProfileBannerParameters): string {
    var query = new StringBuilder(Resources.Account_UpdateProfileBanner);

    query.addParameterToQuery("width", parameters.width);
    query.addParameterToQuery("height", parameters.height);
    query.addParameterToQuery("offset_left", parameters.offsetLeft);
    query.addParameterToQuery("offset_top", parameters.offsetTop);

    query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

    return query.ToString();
  }

  public GetRemoveProfileBannerQuery(parameters: IRemoveProfileBannerParameters): string {
    var query = new StringBuilder(Resources.Account_RemoveProfileBanner);

    query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

    return query.ToString();
  }
}
