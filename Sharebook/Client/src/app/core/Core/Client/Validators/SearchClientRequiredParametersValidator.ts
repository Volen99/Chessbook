import {Injectable, InjectionToken} from "@angular/core";

import {ISearchClientParametersValidator} from "./SearchClientParametersValidator";
import {SearchParameters} from "./parameters-types";
import {ISearchUsersParameters} from "../../../Public/Parameters/Search/SearchUsersParameters";
import {ICreateSavedSearchParameters} from "../../../Public/Parameters/Search/CreateSavedSearchParameters";
import {IGetSavedSearchParameters} from "../../../Public/Parameters/Search/GetSavedSearchParameters";
import {IDestroySavedSearchParameters} from "../../../Public/Parameters/Search/DestroySavedSearchParameters";
import ArgumentNullException from "typescript-dotnet-commonjs/System/Exceptions/ArgumentNullException";
import ArgumentException from "typescript-dotnet-commonjs/System/Exceptions/ArgumentException";

export interface ISearchClientRequiredParametersValidator extends ISearchClientParametersValidator {
}

export const ISearchClientRequiredParametersValidatorToken = new InjectionToken<ISearchClientRequiredParametersValidator>('ISearchClientRequiredParametersValidator', {
  providedIn: 'root',
  factory: () => new SearchClientRequiredParametersValidator(),
});

@Injectable({
  providedIn: 'root',
})
export class SearchClientRequiredParametersValidator implements ISearchClientRequiredParametersValidator {
  public validate(parameters: SearchParameters): void {
    if (parameters == null) {
      throw new ArgumentNullException(`nameof(parameters)`);
    }

    if (this.isISearchUsersParameters(parameters)) {
      if (parameters.query == null) {
        throw new ArgumentNullException(`${`nameof(parameters.query)`}`);
      }
    } else if (this.isICreateSavedSearchParameters(parameters)) {
      if (!(parameters.query)) {
        throw new ArgumentException(`${`nameof(parameters.query)`}`);
      }
    } else if (this.isIGetSavedSearchParameters(parameters)) {
      if (parameters.savedSearchId <= 0) {
        throw new ArgumentNullException(`${`nameof(parameters.savedSearchId)`}`);
      }
    } else if (this.isIDestroySavedSearchParameters(parameters)) {
      if (parameters.savedSearchId <= 0) {
        throw new ArgumentNullException(`${`nameof(parameters.savedSearchId)`}`);
      }
    }
  }

  private isISearchUsersParameters(parameters: SearchParameters): parameters is ISearchUsersParameters {
    return (parameters as ISearchUsersParameters).query !== undefined;
  }

  private isICreateSavedSearchParameters(parameters: SearchParameters): parameters is ICreateSavedSearchParameters {
    return (parameters as ICreateSavedSearchParameters).query !== undefined;
  }

  private isIGetSavedSearchParameters(parameters: SearchParameters): parameters is IGetSavedSearchParameters {
    return (parameters as IGetSavedSearchParameters).savedSearchId !== undefined;
  }

  private isIDestroySavedSearchParameters(parameters: SearchParameters): parameters is IDestroySavedSearchParameters {
    return (parameters as IDestroySavedSearchParameters).savedSearchId !== undefined;
  }

}
