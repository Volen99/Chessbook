import {PrivacyMode} from '../../Enum/PrivacyMode';
import {ITimeZone} from "../ITimeZone";
import {ITrendLocation} from "../ITrendLocation";
import { AllowDirectMessagesFrom } from '../../Enum/AllowDirectMessagesFrom';
import {AllowContributorRequestMode} from "../../Enum/AllowContributorRequestMode";
import { Language } from '../../Enum/Language';

export interface IAccountSettingsDTO {
  screenName: string;
  privacyMode: PrivacyMode;
  language: Language;

  alwaysUseHttps: boolean;
  discoverableByEmail: boolean;
  discoverableByMobilePhone: boolean;
  displaySensitiveMedia: boolean;
  smartMute: boolean;

  geoEnabled: boolean;
  useCookiePersonalization: boolean;

  allowDirectMessagesFrom: AllowDirectMessagesFrom;
  allowGroupDirectMessagesFrom: AllowDirectMessagesFrom;
  allowContributorRequest: AllowContributorRequestMode;

  timeZone: ITimeZone;

  sleepTimeEnabled: boolean;
  sleepTimeStartHour: number;
  sleepTimeEndHour: number;

  translatorType: string;
  trendLocations: ITrendLocation[];
}
