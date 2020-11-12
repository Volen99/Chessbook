import {Injectable, InjectionToken} from "@angular/core";

import {IAccountSettingsClientParametersValidator} from "./AccountSettingsClientParametersValidator";
import {AccountActivityParameters} from "./parameters-types";
import {IUpdateProfileImageParameters} from "../../../Public/Parameters/AccountSettingsClient/UpdateProfileImageParameters";
import {IUpdateProfileBannerParameters} from "../../../Public/Parameters/AccountSettingsClient/UpdateProfileBannerParameters";
import ArgumentNullException from "typescript-dotnet-commonjs/System/Exceptions/ArgumentNullException";

export interface IAccountSettingsClientRequiredParametersValidator extends IAccountSettingsClientParametersValidator {
}

export const IAccountSettingsClientRequiredParametersValidatorToken = new InjectionToken<IAccountSettingsClientRequiredParametersValidator>('IAccountSettingsClientRequiredParametersValidator', {
  providedIn: 'root',
  factory: () => new AccountSettingsClientRequiredParametersValidator(),
});

@Injectable({
  providedIn: 'root',
})
export class AccountSettingsClientRequiredParametersValidator implements IAccountSettingsClientRequiredParametersValidator {
  public validate(parameters: AccountActivityParameters): void {
    if (parameters == null) {
      throw new ArgumentNullException(`nameof(parameters)`);
    }

    if (AccountSettingsClientRequiredParametersValidator.isIUpdateProfileImageParameters(parameters)
      || AccountSettingsClientRequiredParametersValidator.isIUpdateProfileBannerParameters(parameters)) {
      if (parameters.binary == null) {
        throw new ArgumentNullException(`${`nameof(parameters.binary)`}`);
      }
    }
  }

  private static isIUpdateProfileImageParameters(parameters: AccountActivityParameters): parameters is IUpdateProfileImageParameters {
    return (parameters as IUpdateProfileImageParameters).binary !== undefined;
  }

  private static isIUpdateProfileBannerParameters(parameters: AccountActivityParameters): parameters is IUpdateProfileBannerParameters {
    return (parameters as IUpdateProfileBannerParameters).binary !== undefined;
  }
}
