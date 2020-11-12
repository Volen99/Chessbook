import {Injectable, InjectionToken} from "@angular/core";

import {ITrendsClientParametersValidator} from "./TrendsClientParametersValidator";
import {TrendsParameters} from "./parameters-types";
import ArgumentNullException from "typescript-dotnet-commonjs/System/Exceptions/ArgumentNullException";

export interface ITrendsClientRequiredParametersValidator extends ITrendsClientParametersValidator {
}

export const ITrendsClientRequiredParametersValidatorToken = new InjectionToken<ITrendsClientRequiredParametersValidator>('ITrendsClientRequiredParametersValidator', {
  providedIn: 'root',
  factory: () => new TrendsClientRequiredParametersValidator(),
});

@Injectable({
  providedIn: 'root',
})
export class TrendsClientRequiredParametersValidator implements ITrendsClientRequiredParametersValidator {
  public validate(parameters: TrendsParameters): void {
    if (parameters == null) {
      throw new ArgumentNullException(`nameof(parameters)`);
    }
  }
}

