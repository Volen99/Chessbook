import {ITwitterResult} from 'src/app/core/Core/Web/TwitterResult';
import {ITwitterRequest} from "../../core/Public/Models/Interfaces/ITwitterRequest";
import {ITwitterAccessor} from "../../core/Core/Web/ITwitterAccessor";
import {IHelpQueryGenerator} from "../../core/Core/QueryGenerators/IHelpQueryGenerator";
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

export interface IHelpQueryExecutor {
  GetRateLimitsAsync(parameters: IGetRateLimitsParameters, request: ITwitterRequest): Promise<ITwitterResult<CredentialsRateLimitsDTO>>;

  GetTwitterConfigurationAsync(parameters: IGetTwitterConfigurationParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterConfiguration>>;

  GetSupportedLanguagesAsync(parameters: IGetSupportedLanguagesParameters, request: ITwitterRequest): Promise<ITwitterResult<SupportedLanguage[]>>;

  GetPlaceAsync(parameters: IGetPlaceParameters, request: ITwitterRequest): Promise<ITwitterResult<IPlace>>;

  SearchGeoAsync(parameters: IGeoSearchParameters, request: ITwitterRequest): Promise<ITwitterResult<SearchGeoSearchResultDTO>>;

  SearchGeoReverseAsync(parameters: IGeoSearchReverseParameters, request: ITwitterRequest): Promise<ITwitterResult<SearchGeoSearchResultDTO>>;
}

export class HelpQueryExecutor implements IHelpQueryExecutor {
  private readonly _helpQueryGenerator: IHelpQueryGenerator;
  private readonly _twitterAccessor: ITwitterAccessor;

  constructor(helpQueryGenerator: IHelpQueryGenerator, twitterAccessor: ITwitterAccessor) {
    this._helpQueryGenerator = helpQueryGenerator;
    this._twitterAccessor = twitterAccessor;
  }

  public GetRateLimitsAsync(parameters: IGetRateLimitsParameters, request: ITwitterRequest): Promise<ITwitterResult<CredentialsRateLimitsDTO>> {
    request.query.url = this._helpQueryGenerator.getRateLimitsQuery(parameters);
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<CredentialsRateLimitsDTO>(request);
  }

  public GetTwitterConfigurationAsync(parameters: IGetTwitterConfigurationParameters, request: ITwitterRequest): Promise<ITwitterResult<ITwitterConfiguration>> {
    request.query.url = this._helpQueryGenerator.getTwitterConfigurationQuery(parameters);
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<ITwitterConfiguration>(request);
  }

  public GetSupportedLanguagesAsync(parameters: IGetSupportedLanguagesParameters, request: ITwitterRequest): Promise<ITwitterResult<SupportedLanguage[]>> {
    request.query.url = this._helpQueryGenerator.getSupportedLanguagesQuery(parameters);
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<SupportedLanguage[]>(request);
  }

  public GetPlaceAsync(parameters: IGetPlaceParameters, request: ITwitterRequest): Promise<ITwitterResult<IPlace>> {
    request.query.url = this._helpQueryGenerator.getPlaceQuery(parameters);
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<IPlace>(request);
  }

  public SearchGeoAsync(parameters: IGeoSearchParameters, request: ITwitterRequest): Promise<ITwitterResult<SearchGeoSearchResultDTO>> {
    request.query.url = this._helpQueryGenerator.getSearchGeoQuery(parameters);
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<SearchGeoSearchResultDTO>(request);
  }

  public SearchGeoReverseAsync(parameters: IGeoSearchReverseParameters, request: ITwitterRequest): Promise<ITwitterResult<SearchGeoSearchResultDTO>> {
    request.query.url = this._helpQueryGenerator.getSearchGeoReverseQuery(parameters);
    request.query.httpMethod = HttpMethod.GET;
    return this._twitterAccessor.executeRequestAsync<SearchGeoSearchResultDTO>(request);
  }
}
