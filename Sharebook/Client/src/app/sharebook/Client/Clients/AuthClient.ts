import {IAuthClient, IAuthClientToken} from "../../../core/Public/Client/Clients/IAuthClient";
import {IAuthClientParametersValidator} from "../../../core/Core/Client/Validators/AuthClientParametersValidator";
import {TwitterClient} from "../../TwitterClient";
import {IAuthRequester, IAuthRequesterToken} from "../../../core/Public/Client/Requesters/IAuthRequester";
import {CreateBearerTokenParameters, ICreateBearerTokenParameters} from "../../../core/Public/Parameters/Auth/CreateBearerTokenParameters";
import {ITwitterCredentials, TwitterCredentials} from "../../../core/Public/Models/Authentication/TwitterCredentials";
import {IAuthenticationRequest} from "../../../core/Public/Models/Authentication/IAuthenticationRequest";
import {RequestPinAuthUrlParameters} from "../../../core/Public/Parameters/Auth/RequestPinAuthUrlParameters";
import {IRequestAuthUrlParameters} from "../../../core/Public/Parameters/Auth/IRequestAuthUrlParameters";
import {
  IRequestCredentialsParameters,
  RequestCredentialsParameters
} from "../../../core/Public/Parameters/Auth/RequestCredentialsParameters";
import {InvalidateTokenResponse} from "../../../core/Public/Models/Authentication/InvalidateTokenResponse";
import {
  IInvalidateBearerTokenParameters,
  InvalidateBearerTokenParameters
} from "../../../core/Public/Parameters/Auth/InvalidateBearerTokenParameters";
import {
  IInvalidateAccessTokenParameters,
  InvalidateAccessTokenParameters
} from "../../../core/Public/Parameters/Auth/InvalidateAccessTokenParameters";
import {RequestUrlAuthUrlParameters} from "../../../core/Public/Parameters/Auth/RequestUrlAuthUrlParameters";
import {Inject, Injectable} from "@angular/core";
import {ITwitterClientToken} from "../../../core/Public/ITwitterClient";
import Uri from "typescript-dotnet-commonjs/System/Uri/Uri";

@Injectable({
  providedIn: 'root',
})
export
class AuthClient implements IAuthClient {
  private readonly _client: TwitterClient;
  private readonly _authRequester: IAuthRequester;

  constructor(@Inject(ITwitterClientToken) client: TwitterClient, @Inject(IAuthRequesterToken) auth?: IAuthRequester) {
    this._client = client;
    this._authRequester = auth; // client.raw.auth;
  }

  get parametersValidator(): IAuthClientParametersValidator {
    return this._client.parametersValidator;
  }

  public async createBearerTokenAsync(parameters?: ICreateBearerTokenParameters): Promise<string> {
    let parametersCurrent: ICreateBearerTokenParameters;
    if (!parameters) {
      parametersCurrent = new CreateBearerTokenParameters();
    } else {
      parametersCurrent = parameters;
    }

    let twitterResult = await this._authRequester.createBearerTokenAsync(parametersCurrent); // .ConfigureAwait(false);
    return twitterResult?.model.accessToken;
  }

  public async initializeClientBearerTokenAsync(): Promise<void> {
    let bearerToken = await this.createBearerTokenAsync(); // .ConfigureAwait(false);

    this._client.credentials = new TwitterCredentials(/*this._client.credentials*/);
    this._client.credentials.bearerToken = bearerToken;
  }

  public async requestAuthenticationUrlAsync(callbackUrlOrUriOrParameters?: string | Uri | IRequestAuthUrlParameters): Promise<IAuthenticationRequest> {
    let parameters: IRequestAuthUrlParameters;
    if (callbackUrlOrUriOrParameters) {
      parameters = new RequestPinAuthUrlParameters();
    } else {
      parameters = new RequestUrlAuthUrlParameters(callbackUrlOrUriOrParameters);
    }

    let twitterResult = await this._authRequester.requestAuthUrlAsync(parameters); // .ConfigureAwait(false);
    return twitterResult?.model;
  }


  public async requestCredentialsAsync(parameters: IRequestCredentialsParameters): Promise<ITwitterCredentials> {
    let twitterResult = await this._authRequester.requestCredentialsAsync(parameters); // .ConfigureAwait(false);
    return twitterResult?.model;
  }

  public requestCredentialsFromVerifierCodeAsync(verifierCode: string, authenticationRequest: IAuthenticationRequest): Promise<ITwitterCredentials> {
    return this.requestCredentialsAsync(new RequestCredentialsParameters(verifierCode, authenticationRequest));
  }

  public requestCredentialsFromCallbackUrlAsync(callbackUrlOrUri: string | Uri, authenticationRequest: IAuthenticationRequest): Promise<ITwitterCredentials> {
    return this.requestCredentialsAsync(RequestCredentialsParameters.FromCallbackUrl(callbackUrlOrUri, authenticationRequest));
  }

  public async invalidateBearerTokenAsync(parameters?: IInvalidateBearerTokenParameters): Promise<InvalidateTokenResponse> {
    let parametersCurrent: IInvalidateBearerTokenParameters;
    if (!parameters) {
      parametersCurrent = new InvalidateBearerTokenParameters();
    } else {
      parametersCurrent = parameters;
    }

    let twitterResult = await this._authRequester.invalidateBearerTokenAsync(parametersCurrent); // .ConfigureAwait(false);
    return twitterResult?.model;
  }

  public async invalidateAccessTokenAsync(parameters?: IInvalidateAccessTokenParameters): Promise<InvalidateTokenResponse> {
    let parametersCurrent: IInvalidateAccessTokenParameters;
    if (!parameters) {
      parametersCurrent = new InvalidateAccessTokenParameters();
    } else {
      parametersCurrent = parameters;
    }

    let twitterResult = await this._authRequester.invalidateAccessTokenAsync(parametersCurrent); // .ConfigureAwait(false);
    return twitterResult?.model;
  }
}
