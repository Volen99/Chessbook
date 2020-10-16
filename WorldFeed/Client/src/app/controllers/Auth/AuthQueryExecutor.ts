import {ITwitterRequest} from 'src/app/core/Public/Models/Interfaces/ITwitterRequest';
import {ITwitterRequest} from 'src/app/core/Public/Models/Interfaces/ITwitterRequest';
import {ITwitterResult} from "../../core/Core/Web/TwitterResult";
import Task from 'src/app/c#-objects/TypeScript.NET-Core/packages/Threading/source/Tasks/Task';
import {ITwitterAccessor} from "../../core/Core/Web/ITwitterAccessor";
import {HttpMethod} from 'src/app/core/Public/Models/Enum/HttpMethod';

export interface IAuthQueryExecutor {
  CreateBearerTokenAsync(parameters: ICreateBearerTokenParameters, request: ITwitterRequest): Task<ITwitterResult<CreateTokenResponseDTO>>;

  RequestAuthUrlAsync(parameters: RequestAuthUrlInternalParameters, request: ITwitterRequest): Task<ITwitterResult>;

  RequestCredentialsAsync(parameters: IRequestCredentialsParameters, request: ITwitterRequest): Task<ITwitterResult>;

  InvalidateBearerTokenAsync(parameters: IInvalidateBearerTokenParameters, request: ITwitterRequest): Task<ITwitterResult<InvalidateTokenResponse>>;

  InvalidateAccessTokenAsync(parameters: IInvalidateAccessTokenParameters, request: ITwitterRequest): Task<ITwitterResult<InvalidateTokenResponse>>;
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

  public CreateBearerTokenAsync(parameters: ICreateBearerTokenParameters, request: ITwitterRequest): Task<ITwitterResult<CreateTokenResponseDTO>> {
    var oAuthQueryGenerator = this._oAuthWebRequestGeneratorFactory.Create(request);
    request.query.url = this._queryGenerator.GetCreateBearerTokenQuery(parameters);
    request.query.httpMethod = HttpMethod.POST;
    request.twitterClientHandler = new BearerHttpHandler(oAuthQueryGenerator);
    return this._twitterAccessor.executeRequestAsync<CreateTokenResponseDTO>(request);
  }

  public RequestAuthUrlAsync(parameters: RequestAuthUrlInternalParameters, request: ITwitterRequest): Task<ITwitterResult> {
    var oAuthWebRequestGenerator = this._oAuthWebRequestGeneratorFactory.Create();
    var callbackParameter = oAuthWebRequestGenerator.GenerateParameter("oauth_callback", parameters.CallbackUrl, true, true, false);

    request.query.url = this._queryGenerator.GetRequestAuthUrlQuery(parameters);
    request.query.httpMethod = HttpMethod.POST;
    request.twitterClientHandler = new AuthHttpHandler(callbackParameter, parameters.AuthRequest, oAuthWebRequestGenerator);
    return this._twitterAccessor.executeRequestAsync(request);
  }

  public RequestCredentialsAsync(parameters: IRequestCredentialsParameters, request: ITwitterRequest): Task<ITwitterResult> {
    let oAuthWebRequestGenerator = this._oAuthWebRequestGeneratorFactory.Create();
    let callbackParameter = oAuthWebRequestGenerator.GenerateParameter("oauth_verifier", parameters.verifierCode, true, true, false);

    request.query.url = this._queryGenerator.GetRequestCredentialsQuery(parameters);
    request.query.httpMethod = HttpMethod.POST;
    request.query.twitterCredentials = new TwitterCredentials(parameters.authRequest.consumerKey, parameters.authRequest.consumerSecret);
    request.twitterClientHandler = new AuthHttpHandler(callbackParameter, parameters.authRequest, oAuthWebRequestGenerator);
    return this._twitterAccessor.executeRequestAsync(request);
  }

  public InvalidateBearerTokenAsync(parameters: IInvalidateBearerTokenParameters, request: ITwitterRequest): Task<ITwitterResult<InvalidateTokenResponse>> {
    var oAuthWebRequestGenerator = this._oAuthWebRequestGeneratorFactory.Create();

    request.query.url = this._queryGenerator.GetInvalidateBearerTokenQuery(parameters);
    request.query.httpMethod = HttpMethod.POST;
    request.twitterClientHandler = new InvalidateTokenHttpHandler(oAuthWebRequestGenerator);
    return this._twitterAccessor.executeRequestAsync<InvalidateTokenResponse>(request);
  }

  public InvalidateAccessTokenAsync(parameters: IInvalidateAccessTokenParameters, request: ITwitterRequest): Task<ITwitterResult<InvalidateTokenResponse>> {
    request.query.url = this._queryGenerator.GetInvalidateAccessTokenQuery(parameters);
    request.query.httpMethod = HttpMethod.POST;
    return this._twitterAccessor.executeRequestAsync<InvalidateTokenResponse>(request);
  }
}
