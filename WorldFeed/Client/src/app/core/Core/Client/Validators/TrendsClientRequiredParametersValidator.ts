import {ITrendsClientParametersValidator} from "./TrendsClientParametersValidator";
import {TrendsParameters} from "./parameters-types";
import ArgumentNullException from 'src/app/c#-objects/TypeScript.NET-Core/packages/Core/source/Exceptions/ArgumentNullException';

export interface ITrendsClientRequiredParametersValidator extends ITrendsClientParametersValidator {
}

export class TrendsClientRequiredParametersValidator implements ITrendsClientRequiredParametersValidator {
  public validate(parameters: TrendsParameters): void {
    if (parameters == null) {
      throw new ArgumentNullException(nameof(parameters));
    }
  }
}

