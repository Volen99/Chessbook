import {Injectable, InjectionToken} from "@angular/core";

import {DistanceMeasure} from 'src/app/core/Public/Models/Enum/DistanceMeasure';
import {ICoordinates} from "../../core/Public/Models/Interfaces/ICoordinates";
import {IGeoCode} from "../../core/Public/Models/Interfaces/IGeoCode";
import DateTime from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Time/DateTime";
import {ISearchTweetsParameters, SearchTweetsParameters} from "../../core/Public/Parameters/Search/SearchTweetsParameters";
import {ISearchUsersParameters, SearchUsersParameters} from "../../core/Public/Parameters/Search/SearchUsersParameters";
import {SharebookConsts} from "../../core/Public/sharebook-consts";
import Type from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Types";

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

export const ISearchQueryParameterGeneratorToken = new InjectionToken<ISearchQueryParameterGenerator>('ISearchQueryParameterGenerator', {
  providedIn: 'root',
  factory: () => new SearchQueryParameterGenerator(),
});

@Injectable()
export class SearchQueryParameterGenerator implements ISearchQueryParameterGenerator {
  public createSearchTweetParameter(queryOrGeoCodeOrCoordinatesOrLatitude: string | IGeoCode | ICoordinates | number,
                                    longitude?: number, radius?: number, measure?: DistanceMeasure): ISearchTweetsParameters {
    if (Type.isString(queryOrGeoCodeOrCoordinatesOrLatitude) || this.isIGeoCode(queryOrGeoCodeOrCoordinatesOrLatitude)) {
      return new SearchTweetsParameters(queryOrGeoCodeOrCoordinatesOrLatitude);
    } else if (Type.isNumber(queryOrGeoCodeOrCoordinatesOrLatitude)) {
      return new SearchTweetsParameters(queryOrGeoCodeOrCoordinatesOrLatitude, longitude, radius, measure);
    } else {
      return new SearchTweetsParameters(queryOrGeoCodeOrCoordinatesOrLatitude, radius, measure);
    }
  }

  public generateSinceParameter(since?: DateTime): string {
    if (since == null) {
      return SharebookConsts.EMPTY;
    }

    return `since=${since.toString(/*"yyyy-MM-dd"*/)}`;
  }

  public generateUntilParameter(until?: DateTime): string {
    if (until == null) {
      return SharebookConsts.EMPTY;
    }

    return `until=${until.toString(/*"yyyy-MM-dd"*/)}`;
  }

  public generateGeoCodeParameter(geoCode: IGeoCode): string {
    if (geoCode?.coordinates == null) {
      return null;
    }

    let latitude = geoCode.coordinates.latitude.toString(/*CultureInfo.InvariantCulture*/);
    let longitude = geoCode.coordinates.longitude.toString(/*CultureInfo.InvariantCulture*/);
    let radius = geoCode.radius.toString(/*CultureInfo.InvariantCulture*/);
    let measure = geoCode.distanceMeasure === DistanceMeasure.Kilometers ? "km" : "mi";

    return `${latitude},${longitude},${radius}${measure}`;
  }

  public createUserSearchParameters(query: string): ISearchUsersParameters {
    return new SearchUsersParameters(query);
  }

  private isIGeoCode(queryOrGeoCodeOrCoordinatesOrLatitude: any): queryOrGeoCodeOrCoordinatesOrLatitude is IGeoCode {
    return (queryOrGeoCodeOrCoordinatesOrLatitude as IGeoCode).coordinates !== undefined;
  }
}
