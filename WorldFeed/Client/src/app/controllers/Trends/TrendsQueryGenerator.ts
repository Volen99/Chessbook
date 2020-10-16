import {Resources} from "../../properties/resources";
import StringBuilder from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Text/StringBuilder";
import {GetTrendsExclude, IGetTrendsAtParameters} from "../../core/Public/Parameters/TrendsClient/GetTrendsAtParameters";

export interface ITrendsQueryGenerator {
  GetTrendsAtQuery(parameters: IGetTrendsAtParameters): string;

  GetTrendsLocationQuery(parameters: IGetTrendsLocationParameters): string;

  GetTrendsLocationCloseToQuery(parameters: IGetTrendsLocationCloseToParameters): string;
}

export class TrendsQueryGenerator implements ITrendsQueryGenerator {
  public GetTrendsAtQuery(parameters: IGetTrendsAtParameters): string {
    var query = new StringBuilder(Resources.Trends_GetTrendsFromWoeId);
    query.addParameterToQuery("id", parameters.Woeid);

    if (parameters.Exclude != null && parameters.Exclude !== GetTrendsExclude.Nothing) {
      query.addParameterToQuery("exclude", parameters.Exclude.ToString().ToLowerInvariant());
    }

    query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);
    return query.toString();
  }

  public GetTrendsLocationQuery(parameters: IGetTrendsLocationParameters): string {
    let query = new StringBuilder(Resources.Trends_GetAvailableTrendsLocations);
    query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);
    return query.toString();
  }

  public GetTrendsLocationCloseToQuery(parameters: IGetTrendsLocationCloseToParameters): string {
    let coordinates = parameters.Coordinates;
    let query = new StringBuilder(Resources.Trends_GetTrendsLocationCloseTo);

    query.addParameterToQuery("lat", coordinates.latitude);
    query.addParameterToQuery("long", coordinates.longitude);
    query.addFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

    return query.toString();
  }
}
