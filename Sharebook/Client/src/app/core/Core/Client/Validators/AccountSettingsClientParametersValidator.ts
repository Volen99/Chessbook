import {Inject, Injectable, InjectionToken} from "@angular/core";

import ArgumentException from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Exceptions/ArgumentException";
import {SharebookLimits} from "../../../Public/Settings/SharebookLimits";
import {IGetAccountSettingsParameters} from "../../../Public/Parameters/AccountSettingsClient/GetAccountSettingsParameters";
import {IUpdateAccountSettingsParameters} from "../../../Public/Parameters/AccountSettingsClient/UpdateAccountSettingsParameters";
import {IUpdateProfileParameters} from "../../../Public/Parameters/AccountSettingsClient/UpdateProfileParameters";
import {IUpdateProfileImageParameters} from "../../../Public/Parameters/AccountSettingsClient/UpdateProfileImageParameters";
import {IUpdateProfileBannerParameters} from "../../../Public/Parameters/AccountSettingsClient/UpdateProfileBannerParameters";
import {IRemoveProfileBannerParameters} from "../../../Public/Parameters/AccountSettingsClient/RemoveProfileBannerParameters";
import {
  AccountSettingsClientRequiredParametersValidator,
  IAccountSettingsClientRequiredParametersValidator,
  IAccountSettingsClientRequiredParametersValidatorToken
} from "./AccountSettingsClientRequiredParametersValidator";
import {ITwitterClient, ITwitterClientToken} from "../../../Public/ITwitterClient";
import {AccountActivityParameters} from "./parameters-types";
import {TwitterClient} from "../../../../sharebook/TwitterClient";

export interface IAccountSettingsClientParametersValidator {
  validate(parameters: IGetAccountSettingsParameters): void;

  validate(parameters: IUpdateAccountSettingsParameters): void;

  validate(parameters: IUpdateProfileParameters): void;

  validate(parameters: IUpdateProfileImageParameters): void;

  validate(parameters: IUpdateProfileBannerParameters): void;

  validate(parameters: IRemoveProfileBannerParameters): void;
}

export const IAccountSettingsClientParametersValidatorToken = new InjectionToken<IAccountSettingsClientParametersValidator>('IAccountSettingsClientParametersValidator', {
  providedIn: 'root',
  factory: () => new AccountSettingsClientParametersValidator(Inject(TwitterClient), Inject(AccountSettingsClientRequiredParametersValidator)),
});

@Injectable()
export class AccountSettingsClientParametersValidator implements IAccountSettingsClientParametersValidator {
  private readonly _accountSettingsClientRequiredParametersValidator: IAccountSettingsClientRequiredParametersValidator;
  private readonly _client: ITwitterClient;

  constructor(@Inject(ITwitterClientToken) client: ITwitterClient,
              @Inject(IAccountSettingsClientRequiredParametersValidatorToken) accountSettingsClientRequiredParametersValidator: IAccountSettingsClientRequiredParametersValidator) {
    this._client = client;
    this._accountSettingsClientRequiredParametersValidator = accountSettingsClientRequiredParametersValidator;
  }

  private get Limits(): SharebookLimits {
    return this._client.config.limits;
  }

  public validate(parameters: AccountActivityParameters): void {
    this._accountSettingsClientRequiredParametersValidator.validate(parameters);

    if (AccountSettingsClientParametersValidator.isIUpdateProfileParameters(parameters)) {
      AccountSettingsClientParametersValidator.throwIfParameterSizeIsInvalid(parameters.name, `${nameof(parameters.name)}`, this.Limits.ACCOUNT_SETTINGS_PROFILE_NAME_MAX_LENGTH);
      AccountSettingsClientParametersValidator.throwIfParameterSizeIsInvalid(parameters.description, `${nameof(parameters.description)}`, this.Limits.ACCOUNT_SETTINGS_PROFILE_DESCRIPTION_MAX_LENGTH);
      AccountSettingsClientParametersValidator.throwIfParameterSizeIsInvalid(parameters.location, `${nameof(parameters.location)}`, this.Limits.ACCOUNT_SETTINGS_PROFILE_LOCATION_MAX_LENGTH);
      AccountSettingsClientParametersValidator.throwIfParameterSizeIsInvalid(parameters.websiteUrl, `${nameof(parameters.websiteUrl)}`, this.Limits.ACCOUNT_SETTINGS_PROFILE_WEBSITE_URL_MAX_LENGTH);
    }
  }

  private static throwIfParameterSizeIsInvalid(value: string, parameterName: string, maxSize: number): void {
    if (value != null && value.length > maxSize) {
      throw new ArgumentException(`${parameterName} cannot contain more than ${maxSize} characters.`, parameterName);
    }
  }

  private static isIUpdateProfileParameters(parameters: AccountActivityParameters): parameters is IUpdateProfileParameters {
    return (parameters as IUpdateProfileParameters).description !== undefined;
  }
}
