import {Resources} from "../../properties/resources";
import StringBuilder from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Text/StringBuilder";
import {GetTrendsExclude, IGetTrendsAtParameters} from "../../core/Public/Parameters/TrendsClient/GetTrendsAtParameters";
import {IGetTrendsLocationParameters} from "../../core/Public/Parameters/TrendsClient/GetTrendsLocationParameters";
import {IGetTrendsLocationCloseToParameters} from "../../core/Public/Parameters/TrendsClient/GetTrendsLocationCloseToParameters";
import {InjectionToken} from "@angular/core";

export interface ITrendsQueryGenerator {
  getTrendsAtQuery(parameters: IGetTrendsAtParameters): string;

  getTrendsLocationQuery(parameters: IGetTrendsLocationParameters): string;

  getTrendsLocationCloseToQuery(parameters: IGetTrendsLocationCloseToParameters): string;
}

export const ITrendsQueryGeneratorToken = new InjectionToken<ITrendsQueryGenerator>('ITrendsQueryGenerator', {
  providedIn: 'root',
  factory: () => new TrendsQueryGenerator(),
});

export class TrendsQueryGenerator implements ITrendsQueryGenerator {
  public getTrendsAtQuery(parameters: IGetTrendsAtParameters): string {
    let query = new StringBuilder(Resources.Trends_GetTrendsFromWoeId);
    query.addParameterToQuery("id", parameters.woeid);

    if (parameters.exclude != null && parameters.exclude !== GetTrendsExclude.Nothing) {
      query.addParameterToQuery("exclude", parameters.exclude.toString().toLocaleLowerCase());
    }

    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);
    return query.toString();
  }

  public getTrendsLocationQuery(parameters: IGetTrendsLocationParameters): string {
    let query = new StringBuilder(Resources.Trends_GetAvailableTrendsLocations);
    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);
    return query.toString();
  }

  public getTrendsLocationCloseToQuery(parameters: IGetTrendsLocationCloseToParameters): string {
    let coordinates = parameters.coordinates;
    let query = new StringBuilder(Resources.Trends_GetTrendsLocationCloseTo);

    query.addParameterToQuery("lat", coordinates.latitude);
    query.addParameterToQuery("long", coordinates.longitude);
    query.addFormattedParameterToQuery(parameters.formattedCustomQueryParameters);

    return query.toString();
  }
}
