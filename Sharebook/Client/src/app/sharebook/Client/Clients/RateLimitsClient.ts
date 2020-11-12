import {IRateLimitsClient} from "../../../core/Public/Client/Clients/IRateLimitsClient";
import {ITwitterClient, ITwitterClientToken} from "../../../core/Public/ITwitterClient";
import {IRateLimitCacheManager} from "../../../core/Core/RateLimit/IRateLimitCacheManager";
import {IRateLimitAwaiter} from "../../../core/Core/RateLimit/IRateLimitAwaiter";
import {IHelpRequester} from "../../../core/Public/Client/Requesters/IHelpRequester";
import {
  GetRateLimitsParameters,
  IGetRateLimitsParameters,
  RateLimitsSource
} from "../../../core/Public/Parameters/HelpClient/GetRateLimitsParameters";
import {IEndpointRateLimit} from "../../../core/Public/Models/RateLimits/IEndpointRateLimit";
import {
  GetEndpointRateLimitsParameters,
  IGetEndpointRateLimitsParameters
} from "../../../core/Public/Parameters/HelpClient/GetEndpointRateLimitsParameters";
import {WaitForCredentialsRateLimitParameters} from "../../../core/Public/Parameters/RateLimitsClient/WaitForCredentialsRateLimitParameters";
import {IReadOnlyTwitterCredentials} from "../../../core/Core/Models/Authentication/ReadOnlyTwitterCredentials";
import {Inject, Injectable} from "@angular/core";
import {ICredentialsRateLimits} from "../../../core/Public/Models/RateLimits/ICredentialsRateLimits";
import ArgumentException from "typescript-dotnet-commonjs/System/Exceptions/ArgumentException";
import Type from "typescript-dotnet-commonjs/System/Types";
import {AppInjector} from "../../Injectinvi/app-injector";
import {RateLimitCacheManager} from "../../../Tweetinvi.Credentials/RateLimit/RateLimitCacheManager";
import {RateLimitAwaiter} from "../../../Tweetinvi.Credentials/RateLimit/RateLimitAwaiter";

@Injectable({
  providedIn: 'root',
})
export class RateLimitsClient implements IRateLimitsClient {
  private readonly _client: ITwitterClient;
  private readonly _rateLimitCacheManager: IRateLimitCacheManager;
  private readonly _rateLimitAwaiter: IRateLimitAwaiter;
  private readonly _helpRequester: IHelpRequester;

  constructor(@Inject(ITwitterClientToken) client: ITwitterClient) {
    let executionContext = client.createTwitterExecutionContext();

    this._client = client;
    this._helpRequester = client.raw?.help;
    this._rateLimitCacheManager = AppInjector.get(RateLimitCacheManager); // executionContext.container.Resolve<IRateLimitCacheManager>();
    this._rateLimitAwaiter = AppInjector.get(RateLimitAwaiter); // executionContext.container.Resolve<IRateLimitAwaiter>();
  }

  public async initializeRateLimitsManagerAsync(): Promise<void> {
    let credentialsRateLimits = await this._rateLimitCacheManager.rateLimitCache.getCredentialsRateLimitsAsync(this._client.credentials); // .ConfigureAwait(false);
    if (credentialsRateLimits == null) {
      await this._rateLimitCacheManager.refreshCredentialsRateLimitsAsync(this._client.credentials); // .ConfigureAwait(false);
    }
  }

  public async getRateLimitsAsync(fromOrParameters?: RateLimitsSource | IGetRateLimitsParameters): Promise<ICredentialsRateLimits> {
    let parameters: IGetRateLimitsParameters;
    if (this.isIGetRateLimitsParameters(fromOrParameters)) {
      parameters = fromOrParameters;
    } else {
      parameters = new GetRateLimitsParameters();
      if (fromOrParameters) {
        parameters.from = fromOrParameters;
      }
    }

    switch (parameters.from) {
      case RateLimitsSource.CacheOnly:
        return await this._rateLimitCacheManager.rateLimitCache.getCredentialsRateLimitsAsync(this._client.credentials); // .ConfigureAwait(false);
      case RateLimitsSource.TwitterApiOnly:
        let twitterResult = await this._helpRequester.getRateLimitsAsync(parameters); // .ConfigureAwait(false);
        return this._client.factories.createRateLimits(twitterResult?.model);
      case RateLimitsSource.CacheOrTwitterApi:
        return await this._rateLimitCacheManager.getCredentialsRateLimitsAsync(this._client.credentials); // .ConfigureAwait(false);
      default:
        throw new ArgumentException(`nameof(parameters.from)`);
    }
  }

  public getEndpointRateLimitAsync(urlOrParameters: string | IGetEndpointRateLimitsParameters, from?: RateLimitsSource): Promise<IEndpointRateLimit> {
    let parameters: IGetEndpointRateLimitsParameters;
    if (Type.isString(urlOrParameters)) {
      parameters = new GetEndpointRateLimitsParameters(urlOrParameters);
      if (from) {
        parameters.from = from;
      }
    } else {
      parameters = urlOrParameters;
    }

    return this._rateLimitCacheManager.getQueryRateLimitAsync(parameters, this._client.credentials);
  }

  public waitForQueryRateLimitAsync(urlOrEndpointRateLimit: string | IEndpointRateLimit, from?: RateLimitsSource): Promise<void> {
    if (this.isIEndpointRateLimit(urlOrEndpointRateLimit)) {
      return this._rateLimitAwaiter.waitForCredentialsRateLimitAsync(urlOrEndpointRateLimit, this._client.credentials, this._client.createTwitterExecutionContext());
    } else {
      let fromCurrent: RateLimitsSource;
      if (!from) {
        fromCurrent = RateLimitsSource.CacheOrTwitterApi;
      } else {
        fromCurrent = from;
      }

      let credentialsRateLimitParameters = new WaitForCredentialsRateLimitParameters(urlOrEndpointRateLimit);
      credentialsRateLimitParameters.credentials = this._client.credentials;
      credentialsRateLimitParameters.executionContext = this._client.createTwitterExecutionContext();
      credentialsRateLimitParameters.from = fromCurrent;

      return this._rateLimitAwaiter.waitForCredentialsRateLimitAsync(credentialsRateLimitParameters);
    }
  }

  public clearRateLimitCacheAsync(credentials?: IReadOnlyTwitterCredentials): Promise<void> {
    if (credentials) {
      return this._rateLimitCacheManager.rateLimitCache.clearAsync(credentials);
    } else {
      return this._rateLimitCacheManager.rateLimitCache.clearAsync(this._client.credentials);
    }
  }

  public clearAllRateLimitCacheAsync(): Promise<void> {
    return this._rateLimitCacheManager.rateLimitCache.clearAllAsync();
  }

  private isIGetRateLimitsParameters(fromOrParameters: RateLimitsSource | IGetRateLimitsParameters): fromOrParameters is IGetRateLimitsParameters {
    return (fromOrParameters as IGetRateLimitsParameters).from !== undefined;
  }

  private isIEndpointRateLimit(urlOrEndpointRateLimit: any): urlOrEndpointRateLimit is IEndpointRateLimit {
    return (urlOrEndpointRateLimit as IEndpointRateLimit).isCustomHeaderRateLimit !== undefined;
  }
}
