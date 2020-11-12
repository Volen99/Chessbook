import {Inject, Injectable} from "@angular/core";

import {IHelpClient} from "../../../core/Public/Client/Clients/IHelpClient";
import {ITwitterConfiguration} from "../../../core/Public/Models/Interfaces/DTO/ITwitterConfiguration";
import {SupportedLanguage} from "../../../core/Core/Models/SupportedLanguage";
import {ITwitterClient, ITwitterClientToken} from "../../../core/Public/ITwitterClient";
import {IHelpRequester, IHelpRequesterToken} from "../../../core/Public/Client/Requesters/IHelpRequester";
import {IHelpClientParametersValidator} from "../../../core/Core/Client/Validators/HelpClientParametersValidator";
import {
  GetTwitterConfigurationParameters,
  IGetTwitterConfigurationParameters
} from "../../../core/Public/Parameters/HelpClient/GetTwitterConfigurationParameters";
import {
  GetSupportedLanguagesParameters,
  IGetSupportedLanguagesParameters
} from "../../../core/Public/Parameters/HelpClient/GetSupportedLanguagesParameters";
import {IPlace} from "../../../core/Public/Models/Interfaces/IPlace";
import {GetPlaceParameters, IGetPlaceParameters} from "../../../core/Public/Parameters/HelpClient/GetPlaceParameters";
import {IGeoSearchParameters} from "../../../core/Public/Parameters/HelpClient/GeoSearchParameters";
import {ICoordinates} from "../../../core/Public/Models/Interfaces/ICoordinates";
import {
  GeoSearchReverseParameters,
  IGeoSearchReverseParameters
} from "../../../core/Public/Parameters/HelpClient/GeoSearchReverseParameters";

@Injectable({
  providedIn: 'root',
})
export class HelpClient implements IHelpClient {
  private readonly _client: ITwitterClient;
  private readonly _helpRequester: IHelpRequester;

  constructor(@Inject(ITwitterClientToken) client: ITwitterClient,
              @Inject(IHelpRequesterToken) helpRequester: IHelpRequester) {
    this._client = client;
    this._helpRequester = helpRequester;
  }

  get parametersValidator(): IHelpClientParametersValidator {
    return this._client.parametersValidator;
  }

  public async getTwitterConfigurationAsync(parameters?: IGetTwitterConfigurationParameters): Promise<ITwitterConfiguration> {
    let parametersCurrent: IGetTwitterConfigurationParameters;
    if (!parameters) {
      parametersCurrent = new GetTwitterConfigurationParameters();
    } else {
      parametersCurrent = parameters;
    }

    let twitterResult = await this._helpRequester.getTwitterConfigurationAsync(parametersCurrent); // .ConfigureAwait(false);
    return twitterResult?.model;
  }

  public async getSupportedLanguagesAsync(parameters?: IGetSupportedLanguagesParameters): Promise<SupportedLanguage[]> {
    let parametersCurrent: IGetSupportedLanguagesParameters;
    if (!parameters) {
      parametersCurrent = new GetSupportedLanguagesParameters();
    } else {
      parametersCurrent = parameters;
    }

    let twitterResult = await this._helpRequester.getSupportedLanguagesAsync(parametersCurrent); // .ConfigureAwait(false);
    return twitterResult?.model;
  }

  public async getPlaceAsync(placeIdOrParameters: string | IGetPlaceParameters): Promise<IPlace> {
    let parameters: IGetPlaceParameters;
    if (this.isIGetPlaceParameters(placeIdOrParameters)) {
      parameters = placeIdOrParameters;
    } else {
      parameters = new GetPlaceParameters(placeIdOrParameters);
    }

    let result = await this._helpRequester.getPlaceAsync(parameters); // .ConfigureAwait(false);
    return result?.model;
  }

  public async searchGeoAsync(parameters: IGeoSearchParameters): Promise<IPlace[]> {
    let result = await this._helpRequester.searchGeoAsync(parameters); // .ConfigureAwait(false);
    return result?.model?.result.Places;
  }

  public async searchGeoReverseAsync(coordinatesOrParameters: ICoordinates | IGeoSearchReverseParameters): Promise<IPlace[]> {
    let parameters: IGeoSearchReverseParameters;
    if (this.isIGeoSearchReverseParameters(coordinatesOrParameters)) {
      parameters = coordinatesOrParameters;
    } else {
      parameters = new GeoSearchReverseParameters(coordinatesOrParameters);
    }

    let result = await this._helpRequester.searchGeoReverseAsync(parameters); // .ConfigureAwait(false);
    return result?.model?.result.Places;
  }

  private isIGetPlaceParameters(placeIdOrParameters: any): placeIdOrParameters is IGetPlaceParameters {
    return (placeIdOrParameters as IGetPlaceParameters).placeId !== undefined;
  }

  private isIGeoSearchReverseParameters(coordinatesOrParameters: any): coordinatesOrParameters is IGeoSearchReverseParameters {
    return (coordinatesOrParameters as IGeoSearchReverseParameters).coordinates !== undefined;
  }
}
