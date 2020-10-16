import {ITwitterRequest} from "../../Public/Models/Interfaces/ITwitterRequest";
import {ITwitterResult} from "../Web/TwitterResult";
import {ICreateBearerTokenParameters} from "../../Public/Parameters/Auth/CreateBearerTokenParameters";
import {IRequestAuthUrlParameters} from "../../Public/Parameters/Auth/IRequestAuthUrlParameters";
import {IRequestCredentialsParameters} from "../../Public/Parameters/Auth/RequestCredentialsParameters";
import {IInvalidateAccessTokenParameters} from "../../Public/Parameters/Auth/InvalidateAccessTokenParameters";
import {IInvalidateBearerTokenParameters} from "../../Public/Parameters/Auth/InvalidateBearerTokenParameters";
import {InvalidateTokenResponse} from "../../Public/Models/Authentication/InvalidateTokenResponse";
import {ITwitterCredentials} from "../../Public/Models/Authentication/TwitterCredentials";
import {IAuthenticationRequest} from "../../Public/Models/Authentication/IAuthenticationRequest";
import {CreateTokenResponseDTO} from "../DTO/CreateTokenResponseDTO";

export interface IAuthController {
  createBearerTokenAsync(parameters: ICreateBearerTokenParameters, request: ITwitterRequest): Promise<ITwitterResult<CreateTokenResponseDTO>>;

  requestAuthUrlAsync(parameters: IRequestAuthUrlParameters, request: ITwitterRequest): Promise<ITwitterResult<IAuthenticationRequest>>;

  requestCredentialsAsync(parameters: IRequestCredentialsParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterCredentials>>;

  invalidateAccessTokenAsync(parameters: IInvalidateAccessTokenParameters, request: ITwitterRequest): Promise<ITwitterResult<InvalidateTokenResponse>>;

  invalidateBearerTokenAsync(parameters: IInvalidateBearerTokenParameters, request: ITwitterRequest): Promise<ITwitterResult<InvalidateTokenResponse>>;
}
