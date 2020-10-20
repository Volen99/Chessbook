import {ITimeZone} from "./ITimeZone";
import {PrivacyMode} from '../Enum/PrivacyMode';
import {IAccountSettingsDTO} from "./DTO/IAccountSettingsDTO";
import { Language } from '../Enum/Language';
import { AllowDirectMessagesFrom } from '../Enum/AllowDirectMessagesFrom';
import {AllowContributorRequestMode} from "../Enum/AllowContributorRequestMode";
import {ITrendLocation} from "./ITrendLocation";

export interface IAccountSettings {
  // Account settings backend properties.
  accountSettingsDTO: IAccountSettingsDTO;

  // User screen name (used for authentication)
  screenName: string;

  // Privacy mode used on the account.
  privacyMode: PrivacyMode;

  // Languages used by the user.
  language: Language;

  // Enforce https mode.
  alwaysUseHttps: boolean;

  // Can this user be found by email address.
  discoverableByEmail: boolean;

  // Can this user be found by phone number.
  discoverableByMobilePhone: boolean;

  // Can the tweets published by the user be geo tagged.
  geoEnabled: boolean;

  // The feature to tailor Twitter based on your recent website visits.
  useCookiePersonalization: boolean;

  // Specify who can send you private messages.
  allowDirectMessagesFrom: AllowDirectMessagesFrom;

  // Specify which groups can send you private messages.
  allowGroupDirectMessagesFrom: AllowDirectMessagesFrom;

  // Specify who can ask you to be a contributor.
  allowContributorRequest: AllowContributorRequestMode;

  // Prevent tweets medias marked as sensitive to be displayed.
  displaySensitiveMedia: boolean;

  // [NOT DOCUMENTED]
  smartMute: boolean;

  // Primary timezone of the account.
  timeZone: ITimeZone;

  // Specify if you want the notifications to be disabled during the sleeping hours.
  sleepTimeEnabled: boolean;

  // Specify the hour after which you do not want to receive any notification.
  startSleepHour: number;

  // Specify the time after which you do want to receive notifications.
  endSleepHour: number;

  // Undocumented
  translatorType: string;

  // Trending locations of the user
  trendLocations: ITrendLocation[];
}
