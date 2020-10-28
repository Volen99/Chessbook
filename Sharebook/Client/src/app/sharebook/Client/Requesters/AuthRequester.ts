import {BaseRequester} from "../BaseRequester";
import {IAuthRequester} from "../../../core/Public/Client/Requesters/IAuthRequester";
import {ITwitterResult} from "../../../core/Core/Web/TwitterResult";
import {IAuthController, IAuthControllerToken} from "../../../core/Core/Controllers/IAuthController";
import {
  IAuthClientRequiredParametersValidator,
  IAuthClientRequiredParametersValidatorToken
} from "../../../core/Core/Client/Validators/AuthClientRequiredParametersValidator";
import {ITwitterClient, ITwitterClientToken} from "../../../core/Public/ITwitterClient";
import {ITwitterClientEvents} from "../../../core/Core/Events/TweetinviGlobalEvents";
import {ICreateBearerTokenParameters} from "../../../core/Public/Parameters/Auth/CreateBearerTokenParameters";
import {CreateTokenResponseDTO} from "../../../core/Core/DTO/CreateTokenResponseDTO";
import {IRequestAuthUrlParameters} from "../../../core/Public/Parameters/Auth/IRequestAuthUrlParameters";
import {IAuthenticationRequest} from "../../../core/Public/Models/Authentication/IAuthenticationRequest";
import {IRequestCredentialsParameters} from "../../../core/Public/Parameters/Auth/RequestCredentialsParameters";
import {ITwitterCredentials} from "../../../core/Public/Models/Authentication/TwitterCredentials";
import {IInvalidateBearerTokenParameters} from "../../../core/Public/Parameters/Auth/InvalidateBearerTokenParameters";
import {InvalidateTokenResponse} from "../../../core/Public/Models/Authentication/InvalidateTokenResponse";
import {IInvalidateAccessTokenParameters} from "../../../core/Public/Parameters/Auth/InvalidateAccessTokenParameters";
import {Inject, Injectable} from "@angular/core";

@Injectable()
export class AuthRequester extends BaseRequester implements IAuthRequester {
  private readonly _authController: IAuthController;
  private readonly _validator: IAuthClientRequiredParametersValidator;

  constructor(@Inject(ITwitterClientToken) client: ITwitterClient, clientEvents: ITwitterClientEvents,
              @Inject(IAuthControllerToken) authController: IAuthController,
              @Inject(IAuthClientRequiredParametersValidatorToken) validator: IAuthClientRequiredParametersValidator) {
    super(client, clientEvents);
    this._authController = authController;
    this._validator = validator;
  }

  public createBearerTokenAsync(parameters: ICreateBearerTokenParameters): Promise<ITwitterResult<CreateTokenResponseDTO>> {
    return super.ExecuteRequestAsync(request => {
      this._validator.validate(parameters, request);
      return this._authController.createBearerTokenAsync(parameters, request);
    });
  }

  public requestAuthUrlAsync(parameters: IRequestAuthUrlParameters): Promise<ITwitterResult<IAuthenticationRequest>> {
    this._validator.validate(parameters);
    return super.ExecuteRequestAsync(request => this._authController.requestAuthUrlAsync(parameters, request));
  }

  public requestCredentialsAsync(parameters: IRequestCredentialsParameters): Promise<ITwitterResult<ITwitterCredentials>> {
    this._validator.validate(parameters);
    return super.ExecuteRequestAsync(request => this._authController.requestCredentialsAsync(parameters, request));
  }

  public invalidateBearerTokenAsync(parameters: IInvalidateBearerTokenParameters): Promise<ITwitterResult<InvalidateTokenResponse>> {
    return super.ExecuteRequestAsync(request => {
      this._validator.validate(parameters, request);
      return this._authController.invalidateBearerTokenAsync(parameters, request);
    });
  }

  public invalidateAccessTokenAsync(parameters: IInvalidateAccessTokenParameters): Promise<ITwitterResult<InvalidateTokenResponse>> {
    return super.ExecuteRequestAsync(request => {
      this._validator.validate(parameters, request);
      return this._authController.invalidateAccessTokenAsync(parameters, request);
    });
  }
}
