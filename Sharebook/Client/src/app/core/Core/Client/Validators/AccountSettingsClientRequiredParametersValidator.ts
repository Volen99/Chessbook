import {IAccountSettingsClientParametersValidator} from "./AccountSettingsClientParametersValidator";
import ArgumentNullException from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Exceptions/ArgumentNullException";
import {AccountActivityParameters} from "./parameters-types";
import {IUpdateProfileImageParameters} from "../../../Public/Parameters/AccountSettingsClient/UpdateProfileImageParameters";
import {IUpdateProfileBannerParameters} from "../../../Public/Parameters/AccountSettingsClient/UpdateProfileBannerParameters";

export interface IAccountSettingsClientRequiredParametersValidator extends IAccountSettingsClientParametersValidator {
}

export class AccountSettingsClientRequiredParametersValidator implements IAccountSettingsClientRequiredParametersValidator {
  public validate(parameters: AccountActivityParameters): void {
    if (parameters == null) {
      throw new ArgumentNullException(nameof(parameters));
    }

    if (AccountSettingsClientRequiredParametersValidator.isIUpdateProfileImageParameters(parameters)
      || AccountSettingsClientRequiredParametersValidator.isIUpdateProfileBannerParameters(parameters)) {
      if (parameters.binary == null) {
        throw new ArgumentNullException(`${nameof(parameters.binary)}`);
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
