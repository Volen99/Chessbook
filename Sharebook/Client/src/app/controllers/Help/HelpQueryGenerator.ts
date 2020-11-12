import {Injectable} from "@angular/core";

import {IHelpQueryGenerator} from "../../core/Core/QueryGenerators/IHelpQueryGenerator";
import {Resources} from "../../properties/resources";
import {ICoordinates} from "../../core/Public/Models/Interfaces/ICoordinates";
import {IGetRateLimitsParameters} from "../../core/Public/Parameters/HelpClient/GetRateLimitsParameters";
import {IGetTwitterConfigurationParameters} from "../../core/Public/Parameters/HelpClient/GetTwitterConfigurationParameters";
import {IGetSupportedLanguagesParameters} from "../../core/Public/Parameters/HelpClient/GetSupportedLanguagesParameters";
import {IGetPlaceParameters} from "../../core/Public/Parameters/HelpClient/GetPlaceParameters";
import {AccuracyMeasure, Granularity, IGeoSearchParameters} from "../../core/Public/Parameters/HelpClient/GeoSearchParameters";
import {IGeoSearchReverseParameters} from "../../core/Public/Parameters/HelpClient/GeoSearchReverseParameters";
import StringBuilder from "typescript-dotnet-commonjs/System/Text/StringBuilder";
import {StringBuilderExtensions} from "../../core/Core/Extensions/stringBuilder-extensions";
import {format} from "typescript-dotnet-commonjs/System/Text/Utility";
import ArgumentNullException from "typescript-dotnet-commonjs/System/Exceptions/ArgumentNullException";
import ArgumentException from "typescript-dotnet-commonjs/System/Exceptions/ArgumentException";

@Injectable({
  providedIn: 'root',
})
export class HelpQueryGenerator implements IHelpQueryGenerator {
  public getRateLimitsQuery(parameters: IGetRateLimitsParameters): string {
    let query = new StringBuilder(Resources.Help_GetRateLimit);
    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);
    return query.toString();
  }

  public getTwitterConfigurationQuery(parameters: IGetTwitterConfigurationParameters): string {
    let query = new StringBuilder(Resources.Help_GetTwitterConfiguration);
    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);
    return query.toString();
  }

  public getSupportedLanguagesQuery(parameters: IGetSupportedLanguagesParameters): string {
    let query = new StringBuilder(Resources.Help_GetSupportedLanguages);
    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);
    return query.toString();
  }

  public getPlaceQuery(parameters: IGetPlaceParameters): string {
    let query = new StringBuilder(format(Resources.Geo_GetPlaceFromId, parameters.placeId));
    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);
    return query.toString();
  }

  public GenerateGeoParameter(coordinates: ICoordinates): string {
    if (coordinates == null) {
      throw new ArgumentNullException(`nameof(coordinates)`);
    }

    let latitudeValue: string = coordinates.latitude.toString(/*CultureInfo.InvariantCulture*/);
    let longitudeValue: string = coordinates.longitude.toString(/*CultureInfo.InvariantCulture*/);

    return format(Resources.Geo_CoordinatesParameter, longitudeValue, latitudeValue);
  }

  public getSearchGeoQuery(parameters: IGeoSearchParameters): string {
    if (!(parameters.query) && !(parameters.ip) && parameters.coordinates == null && !parameters.attributes) {
      throw new ArgumentException("You must provide valid coordinates, Ip address, query, or attributes.");
    }

    let query = new StringBuilder(Resources.Geo_SearchGeo);

    StringBuilderExtensions.addParameterToQuery(query, "query", parameters.query);
    StringBuilderExtensions.addParameterToQuery(query, "ip", parameters.ip);

    if (parameters.coordinates != null) {
      StringBuilderExtensions.addParameterToQuery(query, "lat", parameters.coordinates.latitude);
      StringBuilderExtensions.addParameterToQuery(query, "long", parameters.coordinates.longitude);
    }

    for (let key of parameters.attributes.keys) {     // TODO: might bug like never before
      StringBuilderExtensions.addParameterToQuery(query, `attribute:${key}`, parameters.attributes[key]);
    }

    if (parameters.granularity !== Granularity.Undefined) {
      StringBuilderExtensions.addParameterToQuery(query, "granularity", parameters.granularity.toString().toLocaleLowerCase());
    }

    if (parameters.accuracy != null) {
      let accuracyMeasure = parameters.accuracyMeasure === AccuracyMeasure.Feets ? "ft" : "m";
      StringBuilderExtensions.addParameterToQuery(query, "accuracy", `${parameters.accuracy}${accuracyMeasure}`);
    }

    StringBuilderExtensions.addParameterToQuery(query, "max_results", parameters.maximumNumberOfResults);
    StringBuilderExtensions.addParameterToQuery(query, "contained_within", parameters.containedWithin);
    StringBuilderExtensions.addParameterToQuery(query, "callback", parameters.callback);

    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getSearchGeoReverseQuery(parameters: IGeoSearchReverseParameters): string {
    if (parameters.coordinates == null) {
      throw new ArgumentException("You must provide valid coordinates.");
    }

    let query = new StringBuilder(Resources.Geo_SearchGeoReverse);

    if (parameters.coordinates != null) {
      StringBuilderExtensions.addParameterToQuery(query, "lat", parameters.coordinates.latitude);
      StringBuilderExtensions.addParameterToQuery(query, "long", parameters.coordinates.longitude);
    }

    if (parameters.granularity !== Granularity.Undefined) {
      StringBuilderExtensions.addParameterToQuery(query, "granularity", parameters.granularity.toString().toLocaleLowerCase());
    }

    StringBuilderExtensions.addParameterToQuery(query, "accuracy", parameters.accuracy);
    StringBuilderExtensions.addParameterToQuery(query, "max_results", parameters.maximumNumberOfResults);
    StringBuilderExtensions.addParameterToQuery(query, "callback", parameters.callback);

    StringBuilderExtensions.addFormattedParameterToQuery(query, parameters.formattedCustomQueryParameters);

    return query.toString();
  }

  public getPlaceFromIdQuery(placeId: string): string {
    if (placeId == null) {
      throw new ArgumentNullException(`nameof(placeId)`);
    }

    if (placeId === "") {
      throw new ArgumentException("Cannot be empty", `nameof(placeId)`);
    }

    return format(Resources.Geo_GetPlaceFromId, placeId);
  }
}
