import {ISearchClientParametersValidator} from "./SearchClientParametersValidator";
import {SearchParameters} from "./parameters-types";
import {ISearchUsersParameters} from "../../../Public/Parameters/Search/SearchUsersParameters";
import ArgumentNullException from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Exceptions/ArgumentNullException";
import {ICreateSavedSearchParameters} from "../../../Public/Parameters/Search/CreateSavedSearchParameters";
import ArgumentException from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Exceptions/ArgumentException";
import {IGetSavedSearchParameters} from "../../../Public/Parameters/Search/GetSavedSearchParameters";
import {IDestroySavedSearchParameters} from "../../../Public/Parameters/Search/DestroySavedSearchParameters";

export interface ISearchClientRequiredParametersValidator extends ISearchClientParametersValidator {
}

export class SearchClientRequiredParametersValidator implements ISearchClientRequiredParametersValidator {
  public validate(parameters: SearchParameters): void {
    if (parameters == null) {
      throw new ArgumentNullException(nameof(parameters));
    }

    if (this.isISearchUsersParameters(parameters)) {
      if (parameters.Query == null) {
        throw new ArgumentNullException(`${nameof(parameters.Query)}`);
      }
    } else if (this.isICreateSavedSearchParameters(parameters)) {
      if (!(parameters.Query)) {
        throw new ArgumentException(`${nameof(parameters.Query)}`);
      }
    } else if (this.isIGetSavedSearchParameters(parameters)) {
      if (parameters.SavedSearchId <= 0) {
        throw new ArgumentNullException(`${nameof(parameters.SavedSearchId)}`);
      }
    } else if (this.isIDestroySavedSearchParameters(parameters)) {
      if (parameters.SavedSearchId <= 0) {
        throw new ArgumentNullException(`${nameof(parameters.SavedSearchId)}`);
      }
    }
  }

  private isISearchUsersParameters(parameters: SearchParameters): parameters is ISearchUsersParameters {
    return (parameters as ISearchUsersParameters).Query !== undefined;
  }

  private isICreateSavedSearchParameters(parameters: SearchParameters): parameters is ICreateSavedSearchParameters {
    return (parameters as ICreateSavedSearchParameters).Query !== undefined;
  }

  private isIGetSavedSearchParameters(parameters: SearchParameters): parameters is IGetSavedSearchParameters {
    return (parameters as IGetSavedSearchParameters).SavedSearchId !== undefined;
  }

  private isIDestroySavedSearchParameters(parameters: SearchParameters): parameters is IDestroySavedSearchParameters {
    return (parameters as IDestroySavedSearchParameters).SavedSearchId !== undefined;
  }

}

