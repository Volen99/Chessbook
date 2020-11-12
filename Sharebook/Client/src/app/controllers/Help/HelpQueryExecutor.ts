import {inject, Inject, InjectionToken} from "@angular/core";

import {ITwitterResult} from 'src/app/core/Core/Web/TwitterResult';
import {ITwitterRequest} from "../../core/Public/Models/Interfaces/ITwitterRequest";
import {ITwitterAccessor, ITwitterAccessorToken} from "../../core/Core/Web/ITwitterAccessor";
import {IHelpQueryGenerator, IHelpQueryGeneratorToken} from "../../core/Core/QueryGenerators/IHelpQueryGenerator";
import {HttpMethod} from 'src/app/core/Public/Models/Enum/HttpMethod';
import {SupportedLanguage} from "../../core/Core/Models/SupportedLanguage";
import {IGetRateLimitsParameters} from "../../core/Public/Parameters/HelpClient/GetRateLimitsParameters";
import {IGetTwitterConfigurationParameters} from "../../core/Public/Parameters/HelpClient/GetTwitterConfigurationParameters";
import {IGetSupportedLanguagesParameters} from "../../core/Public/Parameters/HelpClient/GetSupportedLanguagesParameters";
import {IGetPlaceParameters} from "../../core/Public/Parameters/HelpClient/GetPlaceParameters";
import {IGeoSearchParameters} from "../../core/Public/Parameters/HelpClient/GeoSearchParameters";
import {IGeoSearchReverseParameters} from "../../core/Public/Parameters/HelpClient/GeoSearchReverseParameters";
import {SearchGeoSearchResultDTO} from "../../core/Public/Models/Interfaces/DTO/GeoSearchResultDTO";
import {CredentialsRateLimitsDTO} from "../../core/Core/DTO/CredentialsRateLimitsDTO";
import {IPlace} from "../../core/Public/Models/Interfaces/IPlace";
import {ITwitterConfiguration} from "../../core/Public/Models/Interfaces/DTO/ITwitterConfiguration";
import {HelpQueryGenerator} from "./HelpQueryGenerator";
import {TwitterAccessor} from "../../Tweetinvi.Credentials/TwitterAccessor";

export interface IHelpQueryExecutor {
  getRateLimitsAsync(parameters: IGetRateLimitsParameters, request: ITwitterRequest): Promise<ITwitterResult<CredentialsRateLimitsDTO>>;

  getTwitterConfigurationAsync(parameters: IGetTwitterConfigurationParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterConfiguration>>;

  getSupportedLanguagesAsync(parameters: IGetSupportedLanguagesParameters, request: ITwitterRequest): Promise<ITwitterResult<SupportedLanguage[]>>;

  getPlaceAsync(parameters: IGetPlaceParameters, request: ITwitterRequest): Promise<ITwitterResult<IPlace>>;

  searchGeoAsync(parameters: IGeoSearchParameters, request: ITwitterRequest): Promise<ITwitterResult<SearchGeoSearchResultDTO>>;

  searchGeoReverseAsync(parameters: IGeoSearchReverseParameters, request: ITwitterRequest): Promise<ITwitterResult<SearchGeoSearchResultDTO>>;
}

export const IHelpQueryExecutorToken = new InjectionToken<IHelpQueryExecutor>('IHelpQueryExecutor', {
  providedIn: 'root',
  factory: () => new HelpQueryExecutor(inject(HelpQueryGenerator), inject(TwitterAccessor)),
});

export class HelpQueryExecutor implements IHelpQueryExecutor {
  private readonly _helpQueryGenerator: IHelpQueryGenerator;
  private readonly _twitterAccessor: ITwitterAccessor;

  constructor(@Inject(IHelpQueryGeneratorToken) helpQueryGenerator: IHelpQueryGenerator,
              @Inject(ITwitterAccessorToken) twitterAccessor: ITwitterAccessor) {
    this._helpQueryGenerator = helpQueryGenerator;
    this._twitterAccessor = twitterAccessor;
  }

  public getRateLimitsAsync(parameters: IGetRateLimitsParameters, request: ITwitterRequest): Promise<ITwitterResult<CredentialsRateLimitsDTO>> {
    request.query.url = this._helpQueryGenerator.getRateLimitsQuery(parameters);
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<CredentialsRateLimitsDTO>(request);
  }

  public getTwitterConfigurationAsync(parameters: IGetTwitterConfigurationParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterConfiguration>> {
    request.query.url = this._helpQueryGenerator.getTwitterConfigurationQuery(parameters);
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<ITwitterConfiguration>(request);
  }

  public getSupportedLanguagesAsync(parameters: IGetSupportedLanguagesParameters, request: ITwitterRequest): Promise<ITwitterResult<SupportedLanguage[]>> {
    request.query.url = this._helpQueryGenerator.getSupportedLanguagesQuery(parameters);
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<SupportedLanguage[]>(request);
  }

  public getPlaceAsync(parameters: IGetPlaceParameters, request: ITwitterRequest): Promise<ITwitterResult<IPlace>> {
    request.query.url = this._helpQueryGenerator.getPlaceQuery(parameters);
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<IPlace>(request);
  }

  public searchGeoAsync(parameters: IGeoSearchParameters, request: ITwitterRequest): Promise<ITwitterResult<SearchGeoSearchResultDTO>> {
    request.query.url = this._helpQueryGenerator.getSearchGeoQuery(parameters);
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<SearchGeoSearchResultDTO>(request);
  }

  public searchGeoReverseAsync(parameters: IGeoSearchReverseParameters, request: ITwitterRequest): Promise<ITwitterResult<SearchGeoSearchResultDTO>> {
    request.query.url = this._helpQueryGenerator.getSearchGeoReverseQuery(parameters);
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<SearchGeoSearchResultDTO>(request);
  }
}
