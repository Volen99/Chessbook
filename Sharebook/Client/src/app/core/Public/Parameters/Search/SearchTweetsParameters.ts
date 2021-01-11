import {inject, Inject, Injectable, InjectionToken} from "@angular/core";

import {IMinMaxQueryParameters, MinMaxQueryParameters} from "../MaxAndMinBaseQueryParameters";
import {ITweetModeParameter} from "../ITweetModeParameter";
import {IGeoCode} from "../../Models/Interfaces/IGeoCode";
import {SearchResultType} from "../../Models/Enum/SearchResultType";
import {TweetSearchFilters} from "../Enum/TweetSearchFilters";
import {DistanceMeasure} from "../../Models/Enum/DistanceMeasure";
import {ICoordinates} from "../../Models/Interfaces/ICoordinates";
import {SharebookLimits} from "../../Settings/SharebookLimits";
import {GeoCode} from "../../Models/GeoCode";
import {TweetMode} from '../../Settings/SharebookSettings';
import {LanguageFilter} from "../../Models/Enum/LanguageFilter";
import {Coordinates} from "../../Models/Coordinates";
import DateTime from "typescript-dotnet-commonjs/System/Time/DateTime";
import Type from "typescript-dotnet-commonjs/System/Types";

/// <summary>
/// For more information read : https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets
/// <para>Learn more about query here : https://developer.twitter.com/en/docs/tweets/search/guides/standard-operators</para>
/// </summary>
export interface ISearchTweetsParameters extends IMinMaxQueryParameters, ITweetModeParameter {
  // Query to search tweets.
  query: string;

  // Specify the language of the query you are sending (only ja is currently effective).
  // This is intended for language-specific consumers and the default should work in the majority of cases.
  locale: string;

  // Languages.ts identified for the tweet.
  lang?: LanguageFilter;

  // Restrict your query to a given location.
  geoCode: IGeoCode;

  // Choose if the result set will be represented by recent or popular Tweets, or even a mix of both
  searchType?: SearchResultType;

  // Search will only return tweets published after this 1.
  since?: DateTime;

  // Search will only return tweets published before this 1.
  until?: DateTime;

  // Filters tweets based on metadata.
  filters: TweetSearchFilters;

  // Include tweet entities.
  includeEntities?: boolean;

  // Set the geo location where the search have to be performed.
  setGeoCodeWithSource(coordinates: ICoordinates, radius: number, measure: DistanceMeasure): void;

  // Set the geo location where the search have to be performed.
  setGeoCode(latitude: number, longitude: number, radius: number, measure: DistanceMeasure): void;
}

export const ISearchTweetsParametersToken = new InjectionToken<ISearchTweetsParameters>('ISearchTweetsParameters', {
  providedIn: 'root',
  factory: () => new SearchTweetsParameters(null, 0, 0, null),
});

@Injectable({
  providedIn: 'root',
})
// https://dev.twitter.com/rest/reference/get/search/tweets
export class SearchTweetsParameters extends MinMaxQueryParameters implements ISearchTweetsParameters {
  constructor(searchQueryOrGeoCodeOrCoordinatesOrLatitudeParameters: string | IGeoCode | ICoordinates | number | ISearchTweetsParameters,
              longitude?: number,
              radius?: number,
              measure?: DistanceMeasure) {
    if (SearchTweetsParameters.isISearchTweetsParameters(searchQueryOrGeoCodeOrCoordinatesOrLatitudeParameters)) {
      super(searchQueryOrGeoCodeOrCoordinatesOrLatitudeParameters);

      this.query = searchQueryOrGeoCodeOrCoordinatesOrLatitudeParameters.query;
      this.locale = searchQueryOrGeoCodeOrCoordinatesOrLatitudeParameters.locale;
      this.lang = searchQueryOrGeoCodeOrCoordinatesOrLatitudeParameters.lang;
      this.geoCode = new GeoCode(undefined, undefined, undefined, undefined, undefined, searchQueryOrGeoCodeOrCoordinatesOrLatitudeParameters.geoCode);
      this.searchType = searchQueryOrGeoCodeOrCoordinatesOrLatitudeParameters.searchType;
      this.since = searchQueryOrGeoCodeOrCoordinatesOrLatitudeParameters.since;
      this.until = searchQueryOrGeoCodeOrCoordinatesOrLatitudeParameters.until;
      this.filters = searchQueryOrGeoCodeOrCoordinatesOrLatitudeParameters.filters;
      this.includeEntities = searchQueryOrGeoCodeOrCoordinatesOrLatitudeParameters.includeEntities;
      this.tweetMode = searchQueryOrGeoCodeOrCoordinatesOrLatitudeParameters.tweetMode;
    } else {
      super();

      this.filters = TweetSearchFilters.None;
      this.pageSize = SharebookLimits.DEFAULTS.SEARCH_TWEETS_MAX_PAGE_SIZE;

      if (Type.isString(searchQueryOrGeoCodeOrCoordinatesOrLatitudeParameters)) {
        this.query = searchQueryOrGeoCodeOrCoordinatesOrLatitudeParameters;
      } else if (SearchTweetsParameters.isIGeoCode(searchQueryOrGeoCodeOrCoordinatesOrLatitudeParameters)) {
        this.geoCode = searchQueryOrGeoCodeOrCoordinatesOrLatitudeParameters;
      } else if (Type.isNumber(searchQueryOrGeoCodeOrCoordinatesOrLatitudeParameters)) {
        this.geoCode = new GeoCode(searchQueryOrGeoCodeOrCoordinatesOrLatitudeParameters, longitude, undefined, radius, measure);
      } else {
        this.geoCode = new GeoCode(undefined, undefined, searchQueryOrGeoCodeOrCoordinatesOrLatitudeParameters, radius, measure);
      }
    }
  }

  public query: string;
  public locale: string;

  public lang?: LanguageFilter;
  public geoCode: IGeoCode;
  public searchType?: SearchResultType;

  public since?: DateTime;
  public until?: DateTime;

  public filters: TweetSearchFilters;

  public includeEntities?: boolean;

  public tweetMode?: TweetMode;

  public setGeoCodeWithSource(coordinates: ICoordinates, radius: number, measure: DistanceMeasure): void {
    this.geoCode = new GeoCode(undefined, undefined, coordinates, radius, measure);
  }

  public setGeoCode(latitude: number, longitude: number, radius: number, measure: DistanceMeasure): void {
    this.geoCode = new GeoCode(latitude, longitude, undefined, radius, measure);
  }

  private static isISearchTweetsParameters(searchQueryOrGeoCodeOrParameters: any): searchQueryOrGeoCodeOrParameters is ISearchTweetsParameters {
    return (searchQueryOrGeoCodeOrParameters as ISearchTweetsParameters).filters !== undefined;
  }

  private static isIGeoCode(searchQueryOrGeoCodeOrParameters: any): searchQueryOrGeoCodeOrParameters is IGeoCode {
    return (searchQueryOrGeoCodeOrParameters as IGeoCode).coordinates !== undefined;
  }
}


// private SearchTweetsParameters()
// {
//     Filters = TweetSearchFilters.None;
//     PageSize = TwitterLimits.DEFAULTS.SEARCH_TWEETS_MAX_PAGE_SIZE;
// }
//
// public SearchTweetsParameters(string searchQuery) : this()
// {
//     Query = searchQuery;
// }

// public SearchTweetsParameters(IGeoCode geoCode) : this()
// {
//     GeoCode = geoCode;
// }

// public SearchTweetsParameters(ICoordinates coordinates, int radius, DistanceMeasure measure) : this()
// {
//     GeoCode = new GeoCode(coordinates, radius, measure);
// }

// public SearchTweetsParameters(double latitude, double longitude, int radius, DistanceMeasure measure) : this()
// {
//     GeoCode = new GeoCode(latitude, longitude, radius, measure);
// }

// public SearchTweetsParameters(ISearchTweetsParameters source) : base(source)
// {
//     if (source == null)
//     {
//         Filters = TweetSearchFilters.None;
//         PageSize = TwitterLimits.DEFAULTS.SEARCH_TWEETS_MAX_PAGE_SIZE;
//         return;
//     }
//
//     Query = source.Query;
//     Locale = source.Locale;
//     Lang = source.Lang;
//     GeoCode = new GeoCode(source.GeoCode);
//     SearchType = source.SearchType;
//     Since = source.Since;
//     Until = source.Until;
//     Filters = source.Filters;
//     IncludeEntities = source.IncludeEntities;
//     TweetMode = source.TweetMode;
// }
