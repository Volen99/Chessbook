import {Injectable, InjectionToken} from "@angular/core";

import {Resources} from "../../properties/resources";
import {GetTrendsExclude, IGetTrendsAtParameters} from "../../core/Public/Parameters/TrendsClient/GetTrendsAtParameters";
import {IGetTrendsLocationParameters} from "../../core/Public/Parameters/TrendsClient/GetTrendsLocationParameters";
import {IGetTrendsLocationCloseToParameters} from "../../core/Public/Parameters/TrendsClient/GetTrendsLocationCloseToParameters";
import StringBuilder from "typescript-dotnet-commonjs/System/Text/StringBuilder";
import {StringBuilderExtensions} from "../../core/Core/Extensions/stringBuilder-extensions";

export interface ITrendsQueryGenerator {
  getTrendsAtQuery(parameters: IGetTrendsAtParameters): string;

  getTrendsLocationQuery(parameters: IGetTrendsLocationParameters): string;

  getTrendsLocationCloseToQuery(parameters: IGetTrendsLocationCloseToParameters): string;
}

export const ITrendsQueryGeneratorToken = new InjectionToken<ITrendsQueryGenerator>('ITrendsQueryGenerator', {
  providedIn: 'root',
  factory: () => new TrendsQueryGenerator(),
});

@Injectable({
  providedIn: 'root',
})
export class TrendsQueryGenerator implements ITrendsQueryGenerator {
  public getTrendsAtQuery(parameters: IGetTrendsAtParameters): string {
    let query = new StringBuilder(Resources.Trends_GetTrendsFromWoeId);
    StringBuilderExtensions.addParameterToQuery(query, "id", parameters.woeid);

    if (parameters.exclude != null && parameters.exclude !== GetTrendsExclude.Nothing) {
      StringBuilderExtensions.addParameterToQuery(query, "exclude", parameters.exclude.toString().toLocaleLowerCase());
    }

    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);
    return query.toString();
  }

  public getTrendsLocationQuery(parameters: IGetTrendsLocationParameters): string {
    let query = new StringBuilder(Resources.Trends_GetAvailableTrendsLocations);
    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);
    return query.toString();
  }

  public getTrendsLocationCloseToQuery(parameters: IGetTrendsLocationCloseToParameters): string {
    let coordinates = parameters.coordinates;
    let query = new StringBuilder(Resources.Trends_GetTrendsLocationCloseTo);

    StringBuilderExtensions.addParameterToQuery(query, "lat", coordinates.latitude);
    StringBuilderExtensions.addParameterToQuery(query, "long", coordinates.longitude);
    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }
}
