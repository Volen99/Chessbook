import {Injectable, InjectionToken} from "@angular/core";

import {Resources} from "../../properties/resources";
import {IGetAccountSettingsParameters} from "../../core/Public/Parameters/AccountSettingsClient/GetAccountSettingsParameters";
import {IUpdateAccountSettingsParameters} from "../../core/Public/Parameters/AccountSettingsClient/UpdateAccountSettingsParameters";
import {IUpdateProfileParameters} from "../../core/Public/Parameters/AccountSettingsClient/UpdateProfileParameters";
import {IUpdateProfileImageParameters} from "../../core/Public/Parameters/AccountSettingsClient/UpdateProfileImageParameters";
import {IRemoveProfileBannerParameters} from "../../core/Public/Parameters/AccountSettingsClient/RemoveProfileBannerParameters";
import {IUpdateProfileBannerParameters} from "../../core/Public/Parameters/AccountSettingsClient/UpdateProfileBannerParameters";
import {Languages} from "../../core/Public/Models/Enum/Languages";
import StringBuilder from "typescript-dotnet-commonjs/System/Text/StringBuilder";
import {StringBuilderExtensions} from "../../core/Core/Extensions/stringBuilder-extensions";

export interface IAccountSettingsQueryGenerator {
  getAccountSettingsQuery(parameters: IGetAccountSettingsParameters): string;

  getUpdateAccountSettingsQuery(parameters: IUpdateAccountSettingsParameters): string;

  getUpdateProfileQuery(parameters: IUpdateProfileParameters): string;

  getUpdateProfileImageQuery(parameters: IUpdateProfileImageParameters): string;

  getUpdateProfileBannerQuery(parameters: IUpdateProfileBannerParameters): string;

  getRemoveProfileBannerQuery(parameters: IRemoveProfileBannerParameters): string;
}

export const IAccountSettingsQueryGeneratorToken = new InjectionToken<IAccountSettingsQueryGenerator>('IAccountSettingsQueryGenerator', {
  providedIn: 'root',
  factory: () => new AccountSettingsQueryGenerator(),
});

@Injectable({
  providedIn: 'root',
})
export class AccountSettingsQueryGenerator implements IAccountSettingsQueryGenerator {
  public getAccountSettingsQuery(parameters: IGetAccountSettingsParameters): string {
    let query = new StringBuilder(Resources.Account_GetSettings);
    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getUpdateAccountSettingsQuery(parameters: IUpdateAccountSettingsParameters): string {
    let baseQuery = new StringBuilder(Resources.Account_UpdateSettings);

    let langParameterValue = parameters.displayLanguage === Languages.Undefined ? null : parameters.displayLanguage?.getLanguageCode();

    StringBuilderExtensions.addParameterToQuery(baseQuery, "lang", langParameterValue);
    StringBuilderExtensions.addParameterToQuery(baseQuery, "time_zone", parameters.timeZone);
    StringBuilderExtensions.addParameterToQuery(baseQuery, "sleep_time_enabled", parameters?.sleepTimeEnabled);
    StringBuilderExtensions.addParameterToQuery(baseQuery, "start_sleep_time", AccountSettingsQueryGenerator.sleepHourToString(parameters.startSleepHour));
    StringBuilderExtensions.addParameterToQuery(baseQuery, "end_sleep_time", AccountSettingsQueryGenerator.sleepHourToString(parameters.endSleepHour));
    StringBuilderExtensions.addParameterToQuery(baseQuery, "trend_location_woeid", parameters.trendLocationWoeid);

    StringBuilderExtensions.addFormattedParameterToQuery(baseQuery, parameters.formattedCustomQueryParameters);

    return baseQuery.toString();
  }

  public getUpdateProfileQuery(parameters: IUpdateProfileParameters): string {
    let query = new StringBuilder(Resources.Account_UpdateProfile);

    StringBuilderExtensions.addParameterToQuery(query, "name", parameters.name);
    StringBuilderExtensions.addParameterToQuery(query, "url", parameters.websiteUrl);
    StringBuilderExtensions.addParameterToQuery(query, "location", parameters.location);
    StringBuilderExtensions.addParameterToQuery(query, "description", parameters.description);
    StringBuilderExtensions.addParameterToQuery(query, "profile_link_color", parameters.profileLinkColor);
    StringBuilderExtensions.addParameterToQuery(query, "include_entities", parameters.includeEntities);
    StringBuilderExtensions.addParameterToQuery(query, "skip_status", parameters.skipStatus);

    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  private static sleepHourToString(hour?: number): string {
    if (hour == null) {
      return null;
    }

    if (hour >= 0 && hour < 10) {
      return `0${hour}`;
    }

    return hour.toString();
  }

  public getUpdateProfileImageQuery(parameters: IUpdateProfileImageParameters): string {
    let query = new StringBuilder(Resources.Account_UpdateProfileImage);

    StringBuilderExtensions.addParameterToQuery(query, "include_entities", parameters.includeEntities);
    StringBuilderExtensions.addParameterToQuery(query, "skip_status", parameters.skipStatus);
    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getUpdateProfileBannerQuery(parameters: IUpdateProfileBannerParameters): string {
    let query = new StringBuilder(Resources.Account_UpdateProfileBanner);

    StringBuilderExtensions.addParameterToQuery(query, "width", parameters.width);
    StringBuilderExtensions.addParameterToQuery(query, "height", parameters.height);
    StringBuilderExtensions.addParameterToQuery(query, "offset_left", parameters.offsetLeft);
    StringBuilderExtensions.addParameterToQuery(query, "offset_top", parameters.offsetTop);

    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getRemoveProfileBannerQuery(parameters: IRemoveProfileBannerParameters): string {
    let query = new StringBuilder(Resources.Account_RemoveProfileBanner);

    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }
}
