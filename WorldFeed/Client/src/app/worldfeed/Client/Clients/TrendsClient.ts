import {ITrendsClient} from "../../../core/Public/Client/Clients/ITrendsClient";
import {ITwitterClient} from "../../../core/Public/ITwitterClient";
import {ITrendsClientParametersValidator} from "../../../core/Core/Client/Validators/TrendsClientParametersValidator";
import {IGetTrendsAtResult} from "../../../core/Public/Models/Interfaces/IGetTrendsAtResult";
import {GetTrendsAtParameters, IGetTrendsAtParameters} from "../../../core/Public/Parameters/TrendsClient/GetTrendsAtParameters";
import {ITrendLocation} from "../../../core/Public/Models/Interfaces/ITrendLocation";
import {
  GetTrendsLocationParameters,
  IGetTrendsLocationParameters
} from "../../../core/Public/Parameters/TrendsClient/GetTrendsLocationParameters";
import {
  GetTrendsLocationCloseToParameters,
  IGetTrendsLocationCloseToParameters
} from "../../../core/Public/Parameters/TrendsClient/GetTrendsLocationCloseToParameters";
import {ICoordinates} from "../../../core/Public/Models/Interfaces/ICoordinates";
import Type from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Types";

export class TrendsClient implements ITrendsClient {
  private readonly _client: ITwitterClient;

  constructor(client: ITwitterClient) {
    this._client = client;
  }

  get parametersValidator(): ITrendsClientParametersValidator {
    return this._client.ParametersValidator;
  }

  public async getPlaceTrendsAtAsync(woeidOrParameters: number | IGetTrendsAtParameters): Promise<IGetTrendsAtResult> {
    let parameters: IGetTrendsAtParameters;
    if (this.isIGetTrendsAtParameters(woeidOrParameters)) {
      parameters = woeidOrParameters;
    } else {
      parameters = new GetTrendsAtParameters(woeidOrParameters);
    }

    let twitterResult = await this._client.Raw.trends.getPlaceTrendsAtAsync(parameters); // .ConfigureAwait(false);
    return twitterResult?.model[0];
  }

  public async getTrendLocationsAsync(parameters?: IGetTrendsLocationParameters): Promise<ITrendLocation[]> {
    let parametersCurrent: IGetTrendsLocationParameters;
    if (parameters) {
      parametersCurrent = parameters;
    } else {
      parametersCurrent = new GetTrendsLocationParameters();
    }

    let twitterResult = await this._client.Raw.trends.getTrendLocationsAsync(parametersCurrent); // .ConfigureAwait(false);
    return twitterResult?.model;
  }

  public async getTrendsLocationCloseToAsync(latitudeOrCoordinatesOrParameters: number | ICoordinates | IGetTrendsLocationCloseToParameters, longitude?: number): Promise<ITrendLocation[]> {
    let parameters: IGetTrendsLocationCloseToParameters;
    if (Type.isNumber(latitudeOrCoordinatesOrParameters)) {
      parameters = new GetTrendsLocationCloseToParameters(latitudeOrCoordinatesOrParameters, longitude);
    } else if (this.isICoordinates(latitudeOrCoordinatesOrParameters)) {
      parameters = new GetTrendsLocationCloseToParameters(latitudeOrCoordinatesOrParameters);
    }

    let twitterResult = await this._client.Raw.trends.getTrendsLocationCloseToAsync(parameters); // .ConfigureAwait(false);
    return twitterResult?.model;
  }

  private isIGetTrendsAtParameters(woeidOrParameters: any): woeidOrParameters is IGetTrendsAtParameters {
    return (woeidOrParameters as IGetTrendsAtParameters).Woeid !== undefined;
  }

  private isICoordinates(latitudeOrCoordinatesOrParameters: any): latitudeOrCoordinatesOrParameters is ICoordinates {
    return (latitudeOrCoordinatesOrParameters as ICoordinates).latitude !== undefined;
  }
}
