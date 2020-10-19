import {ITwitterRequest} from 'src/app/core/Public/Models/Interfaces/ITwitterRequest';
import {ITwitterResult} from "../../core/Core/Web/TwitterResult";
import {ITwitterAccessor} from "../../core/Core/Web/ITwitterAccessor";
import {HttpMethod} from 'src/app/core/Public/Models/Enum/HttpMethod';
import {ICreateBearerTokenParameters} from "../../core/Public/Parameters/Auth/CreateBearerTokenParameters";
import {RequestAuthUrlInternalParameters} from "./RequestAuthUrlInternalParameters";
import {IRequestCredentialsParameters} from "../../core/Public/Parameters/Auth/RequestCredentialsParameters";
import {IInvalidateBearerTokenParameters} from "../../core/Public/Parameters/Auth/InvalidateBearerTokenParameters";
import {IInvalidateAccessTokenParameters} from "../../core/Public/Parameters/Auth/InvalidateAccessTokenParameters";
import {TwitterCredentials} from "../../core/Public/Models/Authentication/TwitterCredentials";
import {InvalidateTokenResponse} from "../../core/Public/Models/Authentication/InvalidateTokenResponse";
import {CreateTokenResponseDTO} from "../../core/Core/DTO/CreateTokenResponseDTO";
import {IAuthQueryGenerator} from "./AuthQueryGenerator";
import {IOAuthWebRequestGeneratorFactory} from "../../webLogic/OAuthWebRequestGenerator";

export interface IAuthQueryExecutor {
  createBearerTokenAsync(parameters: ICreateBearerTokenParameters, request: ITwitterRequest): Promise<ITwitterResult<CreateTokenResponseDTO>>;

  requestAuthUrlAsync(parameters: RequestAuthUrlInternalParameters, request: ITwitterRequest): Promise<ITwitterResult>;

  requestCredentialsAsync(parameters: IRequestCredentialsParameters, request: ITwitterRequest): Promise<ITwitterResult>;

  invalidateBearerTokenAsync(parameters: IInvalidateBearerTokenParameters, request: ITwitterRequest): Promise<ITwitterResult<InvalidateTokenResponse>>;

  invalidateAccessTokenAsync(parameters: IInvalidateAccessTokenParameters, request: ITwitterRequest): Promise<ITwitterResult<InvalidateTokenResponse>>;
}

export class AuthQueryExecutor implements IAuthQueryExecutor {
  private readonly _queryGenerator: IAuthQueryGenerator;
  private readonly _oAuthWebRequestGeneratorFactory: IOAuthWebRequestGeneratorFactory;
  private readonly _twitterAccessor: ITwitterAccessor;

  constructor(queryGenerator: IAuthQueryGenerator, oAuthWebRequestGeneratorFactory: IOAuthWebRequestGeneratorFactory,
              twitterAccessor: ITwitterAccessor) {
    this._queryGenerator = queryGenerator;
    this._oAuthWebRequestGeneratorFactory = oAuthWebRequestGeneratorFactory;
    this._twitterAccessor = twitterAccessor;
  }

  public createBearerTokenAsync(parameters: ICreateBearerTokenParameters, request: ITwitterRequest): Promise<ITwitterResult<CreateTokenResponseDTO>> {
    let oAuthQueryGenerator = this._oAuthWebRequestGeneratorFactory.Create(request);
    request.query.url = this._queryGenerator.getCreateBearerTokenQuery(parameters);
    request.query.httpMethod = HttpMethod.POST;
    request.twitterClientHandler = new BearerHttpHandler(oAuthQueryGenerator);
    return this._twitterAccessor.executeRequestAsync<CreateTokenResponseDTO>(request);
  }

  public requestAuthUrlAsync(parameters: RequestAuthUrlInternalParameters, request: ITwitterRequest): Promise<ITwitterResult> {
    let oAuthWebRequestGenerator = this._oAuthWebRequestGeneratorFactory.Create();
    let callbackParameter = oAuthWebRequestGenerator.GenerateParameter("oauth_callback", parameters.CallbackUrl, true, true, false);

    request.query.url = this._queryGenerator.getRequestAuthUrlQuery(parameters);
    request.query.httpMethod = HttpMethod.POST;
    request.twitterClientHandler = new AuthHttpHandler(callbackParameter, parameters.AuthRequest, oAuthWebRequestGenerator);
    return this._twitterAccessor.executeRequestAsync(request);
  }

  public requestCredentialsAsync(parameters: IRequestCredentialsParameters, request: ITwitterRequest): Promise<ITwitterResult> {
    let oAuthWebRequestGenerator = this._oAuthWebRequestGeneratorFactory.Create();
    let callbackParameter = oAuthWebRequestGenerator.GenerateParameter("oauth_verifier", parameters.verifierCode, true, true, false);

    request.query.url = this._queryGenerator.getRequestCredentialsQuery(parameters);
    request.query.httpMethod = HttpMethod.POST;
    request.query.twitterCredentials = new TwitterCredentials(parameters.authRequest.consumerKey, parameters.authRequest.consumerSecret);
    request.twitterClientHandler = new AuthHttpHandler(callbackParameter, parameters.authRequest, oAuthWebRequestGenerator);
    return this._twitterAccessor.executeRequestAsync(request);
  }

  public invalidateBearerTokenAsync(parameters: IInvalidateBearerTokenParameters, request: ITwitterRequest): Promise<ITwitterResult<InvalidateTokenResponse>> {
    let oAuthWebRequestGenerator = this._oAuthWebRequestGeneratorFactory.Create();

    request.query.url = this._queryGenerator.getInvalidateBearerTokenQuery(parameters);
    request.query.httpMethod = HttpMethod.POST;
    request.twitterClientHandler = new InvalidateTokenHttpHandler(oAuthWebRequestGenerator);
    return this._twitterAccessor.executeRequestAsync<InvalidateTokenResponse>(request);
  }

  public invalidateAccessTokenAsync(parameters: IInvalidateAccessTokenParameters, request: ITwitterRequest): Promise<ITwitterResult<InvalidateTokenResponse>> {
    request.query.url = this._queryGenerator.getInvalidateAccessTokenQuery(parameters);
    request.query.httpMethod = HttpMethod.POST;
    return this._twitterAccessor.executeRequestAsync<InvalidateTokenResponse>(request);
  }
}
