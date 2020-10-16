import {DistanceMeasure} from 'src/app/core/Public/Models/Enum/DistanceMeasure';
import {ICoordinates} from "../../core/Public/Models/Interfaces/ICoordinates";
import {IGeoCode} from "../../core/Public/Models/Interfaces/IGeoCode";
import DateTime from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Time/DateTime";

export interface ISearchQueryParameterGenerator {
  CreateSearchTweetParameter(query: string): ISearchTweetsParameters;

  CreateSearchTweetParameter(geoCode: IGeoCode): ISearchTweetsParameters;

  CreateSearchTweetParameter(coordinates: ICoordinates, radius: number, measure: DistanceMeasure): ISearchTweetsParameters;

  CreateSearchTweetParameter(latitude: number, longitude: number, radius: number, measure: DistanceMeasure): ISearchTweetsParameters;

  GenerateSinceParameter(since?: DateTime): string;

  GenerateUntilParameter(until?: DateTime): string;

  GenerateGeoCodeParameter(geoCode: IGeoCode): string;

  CreateUserSearchParameters(query: string): ISearchUsersParameters
}

export class SearchQueryParameterGenerator implements ISearchQueryParameterGenerator {
  public CreateSearchTweetParameter(query: string): ISearchTweetsParameters {
    return new SearchTweetsParameters(query);
  }

  public CreateSearchTweetParameter(geoCode: IGeoCode): ISearchTweetsParameters {
    return new SearchTweetsParameters(geoCode);
  }

  public CreateSearchTweetParameter(coordinates: ICoordinates, radius: number, measure: DistanceMeasure): ISearchTweetsParameters {
    return new SearchTweetsParameters(coordinates, radius, measure);
  }

  public CreateSearchTweetParameter(latitude: number, longitude: number, radius: number, measure: DistanceMeasure): ISearchTweetsParameters {
    return new SearchTweetsParameters(latitude, longitude, radius, measure);
  }

  public GenerateSinceParameter(since?: DateTime): string {
    if (since == null) {
      return string.Empty;
    }

    return `since=${since.Value.ToString("yyyy-MM-dd")}`;
  }

  public GenerateUntilParameter(until?: DateTime): string {
    if (until == null) {
      return string.Empty;
    }

    return `until=${until.Value.ToString("yyyy-MM-dd")}`;
  }

  public GenerateGeoCodeParameter(geoCode: IGeoCode): string {
    if (geoCode?.coordinates == null) {
      return null;
    }

    let latitude = geoCode.coordinates.latitude.toString(CultureInfo.InvariantCulture);
    let longitude = geoCode.coordinates.longitude.toString(CultureInfo.InvariantCulture);
    let radius = geoCode.radius.toString(CultureInfo.InvariantCulture);
    let measure = geoCode.distanceMeasure === DistanceMeasure.Kilometers ? "km" : "mi";

    return `${latitude},${longitude},${radius}${measure}`;
  }

  public CreateUserSearchParameters(query: string): ISearchUsersParameters {
    return new SearchUsersParameters(query);
  }
}
