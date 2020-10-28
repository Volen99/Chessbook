import {Inject, Injectable, InjectionToken} from "@angular/core";

import {IGetRateLimitsParameters} from "../../../Public/Parameters/HelpClient/GetRateLimitsParameters";
import {IGetTwitterConfigurationParameters} from "../../../Public/Parameters/HelpClient/GetTwitterConfigurationParameters";
import {IGetSupportedLanguagesParameters} from "../../../Public/Parameters/HelpClient/GetSupportedLanguagesParameters";
import {IGetPlaceParameters} from "../../../Public/Parameters/HelpClient/GetPlaceParameters";
import {IGeoSearchParameters} from "../../../Public/Parameters/HelpClient/GeoSearchParameters";
import {IGeoSearchReverseParameters} from "../../../Public/Parameters/HelpClient/GeoSearchReverseParameters";
import {
  HelpClientRequiredParametersValidator,
  IHelpClientRequiredParametersValidator,
  IHelpClientRequiredParametersValidatorToken
} from "./HelpClientRequiredParametersValidator";
import {HelpParameters} from "./parameters-types";

export interface IHelpClientParametersValidator {
  validate(parameters: IGetRateLimitsParameters): void;

  validate(parameters: IGetTwitterConfigurationParameters): void;

  validate(parameters: IGetSupportedLanguagesParameters): void;

  validate(parameters: IGetPlaceParameters): void;

  validate(parameters: IGeoSearchParameters): void;

  validate(parameters: IGeoSearchReverseParameters): void;
}

export const IHelpClientParametersValidatorToken = new InjectionToken<IHelpClientParametersValidator>('IHelpClientParametersValidator', {
  providedIn: 'root',
  factory: () => new HelpClientParametersValidator(Inject(HelpClientRequiredParametersValidator)),
});

@Injectable()
export class HelpClientParametersValidator implements IHelpClientParametersValidator {
  private readonly _helpClientRequiredParametersValidator: IHelpClientRequiredParametersValidator;

  constructor(@Inject(IHelpClientRequiredParametersValidatorToken) helpClientRequiredParametersValidator: IHelpClientRequiredParametersValidator) {
    this._helpClientRequiredParametersValidator = helpClientRequiredParametersValidator;
  }

  public validate(parameters: HelpParameters): void {
    this._helpClientRequiredParametersValidator.validate(parameters);
  }
}
