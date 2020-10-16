import {PrivacyMode} from "../../Public/Models/Enum/PrivacyMode";
import {ITimeZone} from "../../Public/Models/Interfaces/ITimeZone";
import {IAccountSettings} from "../../Public/Models/Interfaces/IAccountSettings";
import {IAccountSettingsDTO} from "../../Public/Models/Interfaces/DTO/IAccountSettingsDTO";
import { Language } from '../../Public/Models/Enum/Language';
import { AllowDirectMessagesFrom } from '../../Public/Models/Enum/AllowDirectMessagesFrom';
import {AllowContributorRequestMode} from "../../Public/Models/Enum/AllowContributorRequestMode";
import {ITrendLocation} from "../../Public/Models/Interfaces/ITrendLocation";

export class AccountSettings implements IAccountSettings {
  private _accountSettingsDTO: IAccountSettingsDTO;

  constructor(accountSettingsDTO: IAccountSettingsDTO) {
    this._accountSettingsDTO = accountSettingsDTO;
  }

  get accountSettingsDTO(): IAccountSettingsDTO {
    return this._accountSettingsDTO;
  }

  set accountSettingsDTO(value: IAccountSettingsDTO) {
    this._accountSettingsDTO = value;
  }

  get screenName(): string {
    return this._accountSettingsDTO.screenName;
  }

  get privacyMode(): PrivacyMode {
    return this._accountSettingsDTO.privacyMode;
  }

  get language(): Language {
    return this._accountSettingsDTO.language;
  }

  get alwaysUseHttps(): boolean {
    return this._accountSettingsDTO.alwaysUseHttps;
  }

  get discoverableByEmail(): boolean {
    return this._accountSettingsDTO.discoverableByEmail;
  }

  get discoverableByMobilePhone(): boolean {
    return this._accountSettingsDTO.discoverableByMobilePhone;
  }

  get geoEnabled(): boolean {
    return this._accountSettingsDTO.geoEnabled;
  }

  get useCookiePersonalization(): boolean {
    return this._accountSettingsDTO.useCookiePersonalization;
  }

  get allowDirectMessagesFrom(): AllowDirectMessagesFrom {
    return this._accountSettingsDTO.allowDirectMessagesFrom;
  }

  get allowGroupDirectMessagesFrom(): AllowDirectMessagesFrom {
    return this._accountSettingsDTO.allowGroupDirectMessagesFrom;
  }

  get allowContributorRequest(): AllowContributorRequestMode {
    return this._accountSettingsDTO.allowContributorRequest;
  }

  get displaySensitiveMedia(): boolean {
    return this._accountSettingsDTO.displaySensitiveMedia;
  }

  get smartMute(): boolean {
    return this._accountSettingsDTO.smartMute;
  }

  get timeZone(): ITimeZone {
    return this._accountSettingsDTO.timeZone;
  }

  get sleepTimeEnabled(): boolean {
    return this._accountSettingsDTO.sleepTimeEnabled;
  }

  get startSleepHour(): number {
    return this._accountSettingsDTO.sleepTimeStartHour;
  }

  get endSleepHour(): number {
    return this._accountSettingsDTO.sleepTimeEndHour;
  }

  get translatorType(): string {
    return this._accountSettingsDTO.translatorType;
  }

  get trendLocations(): ITrendLocation[] {
    return this._accountSettingsDTO.trendLocations;
  }
}
