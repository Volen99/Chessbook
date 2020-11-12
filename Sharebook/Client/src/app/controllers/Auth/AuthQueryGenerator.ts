import {Injectable, InjectionToken} from "@angular/core";

import {Resources} from "../../properties/resources";
import {AuthAccessType} from "../../core/Public/Parameters/Auth/AuthAccessType";
import {ICreateBearerTokenParameters} from "../../core/Public/Parameters/Auth/CreateBearerTokenParameters";
import {IRequestAuthUrlParameters} from "../../core/Public/Parameters/Auth/IRequestAuthUrlParameters";
import {IRequestCredentialsParameters} from "../../core/Public/Parameters/Auth/RequestCredentialsParameters";
import {IInvalidateBearerTokenParameters} from "../../core/Public/Parameters/Auth/InvalidateBearerTokenParameters";
import {IInvalidateAccessTokenParameters} from "../../core/Public/Parameters/Auth/InvalidateAccessTokenParameters";
import StringBuilder from "typescript-dotnet-commonjs/System/Text/StringBuilder";
import {StringBuilderExtensions} from "../../core/Core/Extensions/stringBuilder-extensions";

export interface IAuthQueryGenerator {
  getCreateBearerTokenQuery(parameters: ICreateBearerTokenParameters): string;

  getRequestAuthUrlQuery(parameters: IRequestAuthUrlParameters): string;

  getRequestCredentialsQuery(parameters: IRequestCredentialsParameters): string;

  getInvalidateBearerTokenQuery(parameters: IInvalidateBearerTokenParameters): string;

  getInvalidateAccessTokenQuery(parameters: IInvalidateAccessTokenParameters): string;
}

export const IAuthQueryGeneratorToken = new InjectionToken<IAuthQueryGenerator>('IAuthQueryGenerator', {
  providedIn: 'root',
  factory: () => new AuthQueryGenerator(),
});

@Injectable({
  providedIn: 'root',
})
export class AuthQueryGenerator implements IAuthQueryGenerator {
  public getCreateBearerTokenQuery(parameters: ICreateBearerTokenParameters): string {
    let query = new StringBuilder(Resources.Auth_CreateBearerToken);
    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);
    return query.toString();
  }

  public getRequestAuthUrlQuery(parameters: IRequestAuthUrlParameters): string {
    let query = new StringBuilder(Resources.Auth_RequestToken);

    if (parameters.authAccessType != null) {
      let paramValue = parameters.authAccessType === AuthAccessType.ReadWrite ? "write" : "read";
      StringBuilderExtensions.addParameterToQuery(query, "x_auth_access_type", paramValue);
    }

    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);
    return query.toString();
  }

  public getRequestCredentialsQuery(parameters: IRequestCredentialsParameters): string {
    let query = new StringBuilder(Resources.Auth_RequestAccessToken);
    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);
    return query.toString();
  }

  public getInvalidateBearerTokenQuery(parameters: IInvalidateBearerTokenParameters): string {
    let query = new StringBuilder(Resources.Auth_InvalidateBearerToken);
    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);
    return query.toString();
  }

  public getInvalidateAccessTokenQuery(parameters: IInvalidateAccessTokenParameters): string {
    let query = new StringBuilder(Resources.Auth_InvalidateAccessToken);
    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);
    return query.toString();
  }
}
