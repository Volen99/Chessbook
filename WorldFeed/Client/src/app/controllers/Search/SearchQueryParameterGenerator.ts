import {DistanceMeasure} from 'src/app/core/Public/Models/Enum/DistanceMeasure';
import {ICoordinates} from "../../core/Public/Models/Interfaces/ICoordinates";
import {IGeoCode} from "../../core/Public/Models/Interfaces/IGeoCode";
import DateTime from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Time/DateTime";
import {ISearchTweetsParameters, SearchTweetsParameters} from "../../core/Public/Parameters/Search/SearchTweetsParameters";
import {ISearchUsersParameters, SearchUsersParameters} from "../../core/Public/Parameters/Search/SearchUsersParameters";
import {WorldFeedConsts} from "../../core/Public/worldFeed-consts";

export interface ISearchQueryParameterGenerator {
  createSearchTweetParameter(query: string): ISearchTweetsParameters;

  createSearchTweetParameter(geoCode: IGeoCode): ISearchTweetsParameters;

  createSearchTweetParameter(coordinates: ICoordinates, radius: number, measure: DistanceMeasure): ISearchTweetsParameters;

  createSearchTweetParameter(latitude: number, longitude: number, radius: number, measure: DistanceMeasure): ISearchTweetsParameters;

  generateSinceParameter(since?: DateTime): string;

  generateUntilParameter(until?: DateTime): string;

  generateGeoCodeParameter(geoCode: IGeoCode): string;

  createUserSearchParameters(query: string): ISearchUsersParameters;
}

export class SearchQueryParameterGenerator implements ISearchQueryParameterGenerator {
  public createSearchTweetParameter(query: string): ISearchTweetsParameters {
    return new SearchTweetsParameters(query);
  }

  public createSearchTweetParameter(geoCode: IGeoCode): ISearchTweetsParameters {
    return new SearchTweetsParameters(geoCode);
  }

  public createSearchTweetParameter(coordinates: ICoordinates, radius: number, measure: DistanceMeasure): ISearchTweetsParameters {
    return new SearchTweetsParameters(coordinates, radius, measure);
  }

  public createSearchTweetParameter(latitude: number, longitude: number, radius: number, measure: DistanceMeasure): ISearchTweetsParameters {
    return new SearchTweetsParameters(latitude, longitude, radius, measure);
  }

  public generateSinceParameter(since?: DateTime): string {
    if (since == null) {
      return WorldFeedConsts.EMPTY;
    }

    return `since=${since.toString("yyyy-MM-dd")}`;
  }

  public generateUntilParameter(until?: DateTime): string {
    if (until == null) {
      return WorldFeedConsts.EMPTY;
    }

    return `until=${until.toString("yyyy-MM-dd")}`;
  }

  public generateGeoCodeParameter(geoCode: IGeoCode): string {
    if (geoCode?.coordinates == null) {
      return null;
    }

    let latitude = geoCode.coordinates.latitude.toString(CultureInfo.InvariantCulture);
    let longitude = geoCode.coordinates.longitude.toString(CultureInfo.InvariantCulture);
    let radius = geoCode.radius.toString(CultureInfo.InvariantCulture);
    let measure = geoCode.distanceMeasure === DistanceMeasure.Kilometers ? "km" : "mi";

    return `${latitude},${longitude},${radius}${measure}`;
  }

  public createUserSearchParameters(query: string): ISearchUsersParameters {
    return new SearchUsersParameters(query);
  }
}
