import {Resources} from "../../properties/resources";
import StringBuilder from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Text/StringBuilder";
import {AuthAccessType} from "../../core/Public/Parameters/Auth/AuthAccessType";
import {ICreateBearerTokenParameters} from "../../core/Public/Parameters/Auth/CreateBearerTokenParameters";
import {IRequestAuthUrlParameters} from "../../core/Public/Parameters/Auth/IRequestAuthUrlParameters";
import {IRequestCredentialsParameters} from "../../core/Public/Parameters/Auth/RequestCredentialsParameters";
import {IInvalidateBearerTokenParameters} from "../../core/Public/Parameters/Auth/InvalidateBearerTokenParameters";
import {IInvalidateAccessTokenParameters} from "../../core/Public/Parameters/Auth/InvalidateAccessTokenParameters";

export interface IAuthQueryGenerator {
  getCreateBearerTokenQuery(parameters: ICreateBearerTokenParameters): string;

  getRequestAuthUrlQuery(parameters: IRequestAuthUrlParameters): string;

  getRequestCredentialsQuery(parameters: IRequestCredentialsParameters): string;

  getInvalidateBearerTokenQuery(parameters: IInvalidateBearerTokenParameters): string;

  getInvalidateAccessTokenQuery(parameters: IInvalidateAccessTokenParameters): string;
}

export class AuthQueryGenerator implements IAuthQueryGenerator {
  public getCreateBearerTokenQuery(parameters: ICreateBearerTokenParameters): string {
    let query = new StringBuilder(Resources.Auth_CreateBearerToken);
    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);
    return query.toString();
  }

  public getRequestAuthUrlQuery(parameters: IRequestAuthUrlParameters): string {
    let query = new StringBuilder(Resources.Auth_RequestToken);

    if (parameters.authAccessType != null) {
      let paramValue = parameters.authAccessType === AuthAccessType.ReadWrite ? "write" : "read";
      query.addParameterToQuery("x_auth_access_type", paramValue);
    }

    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);
    return query.toString();
  }

  public getRequestCredentialsQuery(parameters: IRequestCredentialsParameters): string {
    let query = new StringBuilder(Resources.Auth_RequestAccessToken);
    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);
    return query.toString();
  }

  public getInvalidateBearerTokenQuery(parameters: IInvalidateBearerTokenParameters): string {
    let query = new StringBuilder(Resources.Auth_InvalidateBearerToken);
    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);
    return query.toString();
  }

  public getInvalidateAccessTokenQuery(parameters: IInvalidateAccessTokenParameters): string {
    let query = new StringBuilder(Resources.Auth_InvalidateAccessToken);
    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);
    return query.toString();
  }
}
