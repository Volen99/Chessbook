import {IHelpClientParametersValidator} from "./HelpClientParametersValidator";
import {IGetRateLimitsParameters} from "../../../Public/Parameters/HelpClient/GetRateLimitsParameters";
import ArgumentNullException from 'src/app/c#-objects/TypeScript.NET-Core/packages/Core/source/Exceptions/ArgumentNullException';
import {IGetTwitterConfigurationParameters} from "../../../Public/Parameters/HelpClient/GetTwitterConfigurationParameters";
import {IGetSupportedLanguagesParameters} from "../../../Public/Parameters/HelpClient/GetSupportedLanguagesParameters";
import {IGetPlaceParameters} from "../../../Public/Parameters/HelpClient/GetPlaceParameters";
import {IGeoSearchParameters} from "../../../Public/Parameters/HelpClient/GeoSearchParameters";
import {IGeoSearchReverseParameters} from "../../../Public/Parameters/HelpClient/GeoSearchReverseParameters";
import ArgumentException from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Exceptions/ArgumentException";
import {InjectionToken} from "@angular/core";

export interface IHelpClientRequiredParametersValidator extends IHelpClientParametersValidator {
}

export const IHelpClientRequiredParametersValidatorToken = new InjectionToken<IHelpClientRequiredParametersValidator>('IHelpClientRequiredParametersValidator', {
  providedIn: 'root',
  factory: () => new HelpClientRequiredParametersValidator(),
});

export class HelpClientRequiredParametersValidator implements IHelpClientRequiredParametersValidator {

  public validate(parameters: IGetRateLimitsParameters
    | IGetTwitterConfigurationParameters
    | IGetSupportedLanguagesParameters
    | IGetPlaceParameters
    | IGeoSearchParameters
    | IGeoSearchReverseParameters): void {
    if (parameters == null) {
      throw new ArgumentNullException(nameof(parameters));
    }

    if (this.isIGetPlaceParameters(parameters)) {
      if (!parameters.placeId) {
        throw new ArgumentException(`${nameof(parameters.placeId)}`);
      }
    } else if (this.isIGeoSearchReverseParameters(parameters)) {
      if (parameters.coordinates == null) {
        throw new ArgumentNullException(`${nameof(parameters.coordinates)}`);
      }
    }

  }

  private isIGetPlaceParameters(parameters: IGetRateLimitsParameters
    | IGetTwitterConfigurationParameters
    | IGetSupportedLanguagesParameters
    | IGetPlaceParameters
    | IGeoSearchParameters
    | IGeoSearchReverseParameters): parameters is IGetPlaceParameters {
    return (parameters as IGetPlaceParameters).placeId !== undefined;
  }

  private isIGeoSearchReverseParameters(parameters: IGetRateLimitsParameters
    | IGetTwitterConfigurationParameters
    | IGetSupportedLanguagesParameters
    | IGetPlaceParameters
    | IGeoSearchParameters
    | IGeoSearchReverseParameters): parameters is IGeoSearchReverseParameters {
    return (parameters as IGeoSearchReverseParameters).coordinates !== undefined;
  }
}

// public void Validate(IGetTwitterConfigurationParameters parameters)
// {
//     if (parameters == null)
//     {
//         throw new ArgumentNullException(nameof(parameters));
//     }
// }
//
// public void Validate(IGetSupportedLanguagesParameters parameters)
// {
//     if (parameters == null)
//     {
//         throw new ArgumentNullException(nameof(parameters));
//     }
// }


// public void Validate(IGeoSearchParameters parameters)
// {
//     if (parameters == null)
//     {
//         throw new ArgumentNullException(nameof(parameters));
//     }
// }


// public void Validate(IGetPlaceParameters parameters)
// {
//     if (parameters == null)
//     {
//         throw new ArgumentNullException(nameof(parameters));
//     }
//
//     if (string.IsNullOrEmpty(parameters.PlaceId))
//     {
//         throw new ArgumentException($"{nameof(parameters.PlaceId)}");
//     }
// }

// public void Validate(IGeoSearchReverseParameters parameters)
// {
//     if (parameters == null)
//     {
//         throw new ArgumentNullException(nameof(parameters));
//     }
//
//     if (parameters.Coordinates == null)
//     {
//         throw new ArgumentNullException($"{nameof(parameters.Coordinates)}");
//     }
// }
