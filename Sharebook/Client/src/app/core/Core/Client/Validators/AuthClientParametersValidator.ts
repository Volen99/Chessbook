import {inject, Inject, Injectable, InjectionToken} from "@angular/core";

import {ITwitterRequest} from "../../../Public/Models/Interfaces/ITwitterRequest";
import {ICreateBearerTokenParameters} from "../../../Public/Parameters/Auth/CreateBearerTokenParameters";
import {IRequestAuthUrlParameters} from "../../../Public/Parameters/Auth/IRequestAuthUrlParameters";
import {IRequestCredentialsParameters} from "../../../Public/Parameters/Auth/RequestCredentialsParameters";
import {IInvalidateBearerTokenParameters} from "../../../Public/Parameters/Auth/InvalidateBearerTokenParameters";
import {IInvalidateAccessTokenParameters} from "../../../Public/Parameters/Auth/InvalidateAccessTokenParameters";
import {AuthParameters} from "./parameters-types";
import {UriKind} from "../../../Public/Models/Enum/uri-kind";
import {
  AuthClientRequiredParametersValidator,
  IAuthClientRequiredParametersValidator,
  IAuthClientRequiredParametersValidatorToken
} from "./AuthClientRequiredParametersValidator";
import ArgumentException from "typescript-dotnet-commonjs/System/Exceptions/ArgumentException";
import {UriExtensions} from "../../Extensions/UriExtensions";

export interface IAuthClientParametersValidator {
  validate(parameters: ICreateBearerTokenParameters, request: ITwitterRequest): void;

  validate(parameters: IRequestAuthUrlParameters): void;

  validate(parameters: IRequestCredentialsParameters): void;

  validate(parameters: IInvalidateAccessTokenParameters, request: ITwitterRequest): void;

  validate(parameters: IInvalidateBearerTokenParameters, request: ITwitterRequest): void;
}

export const IAuthClientParametersValidatorToken = new InjectionToken<IAuthClientParametersValidator>('IAuthClientParametersValidator', {
  providedIn: 'root',
  factory: () => new AuthClientParametersValidator(inject(AuthClientRequiredParametersValidator)),
});

@Injectable({
  providedIn: 'root',
})
export class AuthClientParametersValidator implements IAuthClientParametersValidator {
  private readonly _authClientRequiredParametersValidator: IAuthClientRequiredParametersValidator;

  constructor(@Inject(IAuthClientRequiredParametersValidatorToken) authClientRequiredParametersValidator: IAuthClientRequiredParametersValidator) {
    this._authClientRequiredParametersValidator = authClientRequiredParametersValidator;
  }

  public validate(parameters: AuthParameters, request?: ITwitterRequest): void {
    this._authClientRequiredParametersValidator.validate(parameters, request);

    if (AuthClientParametersValidator.isIRequestAuthUrlParameters(parameters)) {
      if (parameters.callbackUrl != null) {
        if (parameters.callbackUrl !== "oob" && !UriExtensions.isWellFormedUriString(parameters.callbackUrl, UriKind.Absolute)) {
          throw new ArgumentException("Invalid format, must be absolute uri or have a value of 'oob'", `${`nameof(parameters)`}${`nameof(parameters.callbackUrl)`}`);
        }
      }
    }
  }

  private static isIRequestAuthUrlParameters(parameters: AuthParameters): parameters is IRequestAuthUrlParameters {
    return (parameters as IRequestAuthUrlParameters).authAccessType !== undefined;
  }
}
