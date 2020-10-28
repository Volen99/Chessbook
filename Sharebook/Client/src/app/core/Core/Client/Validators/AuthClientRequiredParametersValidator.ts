import {Injectable, InjectionToken} from "@angular/core";

import {IAuthClientParametersValidator} from "./AuthClientParametersValidator";
import ArgumentNullException from 'src/app/c#-objects/TypeScript.NET-Core/packages/Core/source/Exceptions/ArgumentNullException';
import ArgumentException from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Exceptions/ArgumentException";
import {IReadOnlyConsumerCredentialsWithoutBearer} from "../../Models/Authentication/ReadOnlyConsumerCredentials";
import {IReadOnlyTwitterCredentials} from "../../Models/Authentication/ReadOnlyTwitterCredentials";
import {ICreateBearerTokenParameters} from "../../../Public/Parameters/Auth/CreateBearerTokenParameters";
import {ITwitterRequest} from 'src/app/core/Public/Models/Interfaces/ITwitterRequest';
import {RequestCredentialsParameters} from "../../../Public/Parameters/Auth/RequestCredentialsParameters";
import {AuthParameters} from "./parameters-types";
import {IInvalidateAccessTokenParameters} from "../../../Public/Parameters/Auth/InvalidateAccessTokenParameters";

export interface IAuthClientRequiredParametersValidator extends IAuthClientParametersValidator {
}

export const IAuthClientRequiredParametersValidatorToken = new InjectionToken<IAuthClientRequiredParametersValidator>('IAuthClientRequiredParametersValidator', {
  providedIn: 'root',
  factory: () => new AuthClientRequiredParametersValidator(),
});

@Injectable()
export class AuthClientRequiredParametersValidator implements IAuthClientRequiredParametersValidator {
  public validate(parameters: AuthParameters, request?: ITwitterRequest): void {
    if (parameters == null) {
      throw new ArgumentNullException(nameof(parameters));
    }

    if (this.isICreateBearerTokenParameters(parameters)) {
      let credentials = request.query.twitterCredentials;

      if (parameters instanceof RequestCredentialsParameters) {
        if (!parameters.verifierCode) {
          throw new ArgumentNullException(`${nameof(parameters.verifierCode)}", "If you received a null verifier code, the authentication failed`);
        }

        if (parameters.authRequest == null) {
          throw new ArgumentNullException(`${nameof(parameters.authRequest)}`);
        }

        AuthClientRequiredParametersValidator.throwIfInvalidConsumerCredentials(`${nameof(parameters.authRequest)}`, parameters.authRequest);
      } else {
        AuthClientRequiredParametersValidator.throwIfInvalidConsumerCredentials("client.Credentials", credentials);
      }
    } else if (this.isIInvalidateAccessTokenParameters(parameters)) {
      let credentialsParameterName = "client.Credentials";
      let credentials = request.query.twitterCredentials;

      AuthClientRequiredParametersValidator.throwIfInvalidConsumerCredentials(credentialsParameterName, credentials);
      AuthClientRequiredParametersValidator.throwIfInvalidAccessCredentials(credentialsParameterName, credentials);
    } else if (this.isICreateBearerTokenParameters(parameters)) {
      let credentialsParameterName = "client.Credentials";
      let credentials = request.query.twitterCredentials;

      AuthClientRequiredParametersValidator.throwIfInvalidConsumerCredentials(credentialsParameterName, credentials);

      if (!credentials?.bearerToken) {
        throw new ArgumentException("Cannot be null or empty", `${credentialsParameterName}.${nameof(credentials.bearerToken)}`);
      }
    }
  }

  public static throwIfInvalidConsumerCredentials(credentialsParameterName: string, credentials: IReadOnlyConsumerCredentialsWithoutBearer): void {
    if (!(credentials?.consumerKey)) {
      throw new ArgumentException("Cannot be null or empty", `${credentialsParameterName}.${nameof(credentials.consumerKey)}`);
    }

    if (!(credentials.consumerSecret)) {
      throw new ArgumentException("Cannot be null or empty", `${credentialsParameterName}.${nameof(credentials.consumerSecret)}`);
    }
  }

  public static throwIfInvalidAccessCredentials(credentialsParameterName: string, credentials: IReadOnlyTwitterCredentials): void {
    if (!(credentials?.accessToken)) {
      throw new ArgumentException("Cannot be null or empty", `${credentialsParameterName}.${nameof(credentials.accessToken)}`);
    }

    if (!(credentials.accessTokenSecret)) {
      throw new ArgumentException("Cannot be null or empty", `${credentialsParameterName}.${nameof(credentials.accessTokenSecret)}`);
    }
  }

  private isICreateBearerTokenParameters(parameters: AuthParameters): parameters is ICreateBearerTokenParameters {
    return (parameters as ICreateBearerTokenParameters).formattedCustomQueryParameters !== undefined;
  }

  private isIInvalidateAccessTokenParameters(parameters: AuthParameters): parameters is IInvalidateAccessTokenParameters {
    return (parameters as IInvalidateAccessTokenParameters).formattedCustomQueryParameters !== undefined;
  }
}
