﻿import {IMinMaxQueryParameters, MinMaxQueryParameters} from "../MaxAndMinBaseQueryParameters";
import {ITweetModeParameter} from "../ITweetModeParameter";
import {IGeoCode} from "../../Models/Interfaces/IGeoCode";
import {SearchResultType} from "../../Models/Enum/SearchResultType";
import DateTime from 'src/app/c#-objects/TypeScript.NET-Core/packages/Core/source/Time/DateTime';
import {TweetSearchFilters} from "../Enum/TweetSearchFilters";
import {DistanceMeasure} from "../../Models/Enum/DistanceMeasure";
import {ICoordinates} from "../../Models/Interfaces/ICoordinates";
import {TwitterLimits} from "../../Settings/TwitterLimits";
import {GeoCode} from "../../Models/GeoCode";
import {TweetMode} from '../../Settings/TweetinviSettings';
import {LanguageFilter} from "../../Models/Enum/LanguageFilter";
import Type from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Types";

/// <summary>
/// For more information read : https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets
/// <para>Learn more about query here : https://developer.twitter.com/en/docs/tweets/search/guides/standard-operators</para>
/// </summary>
export interface ISearchTweetsParameters extends IMinMaxQueryParameters, ITweetModeParameter {
  // Query to search tweets.
  Query: string;

  // Specify the language of the query you are sending (only ja is currently effective).
  // This is intended for language-specific consumers and the default should work in the majority of cases.
  Locale: string;

  // Language identified for the tweet.
  Lang?: LanguageFilter;

  // Restrict your query to a given location.
  GeoCode: IGeoCode;

  // Choose if the result set will be represented by recent or popular Tweets, or even a mix of both
  SearchType?: SearchResultType;

  // Search will only return tweets published after this date.
  Since?: DateTime;

  // Search will only return tweets published before this date.
  Until?: DateTime;

  // Filters tweets based on metadata.
  Filters: TweetSearchFilters;

  // Include tweet entities.
  IncludeEntities?: boolean;

  // Set the geo location where the search have to be performed.
  SetGeoCodeWithSource(coordinates: ICoordinates, radius: number, measure: DistanceMeasure): void;

  // Set the geo location where the search have to be performed.
  SetGeoCode(latitude: number, longitude: number, radius: number, measure: DistanceMeasure): void;
}

// https://dev.twitter.com/rest/reference/get/search/tweets
export class SearchTweetsParameters extends MinMaxQueryParameters implements ISearchTweetsParameters {
  constructor(searchQueryOrGeoCodeOrParameters?: string | IGeoCode | ISearchTweetsParameters, latitude?: number, longitude?: number,
              coordinates?: ICoordinates, radius?: number, measure?: DistanceMeasure) {
    if (SearchTweetsParameters.isISearchTweetsParameters(searchQueryOrGeoCodeOrParameters)) {
      super(searchQueryOrGeoCodeOrParameters);

      this.Query = searchQueryOrGeoCodeOrParameters.Query;
      this.Locale = searchQueryOrGeoCodeOrParameters.Locale;
      this.Lang = searchQueryOrGeoCodeOrParameters.Lang;
      this.GeoCode = new GeoCode(undefined, undefined, undefined, undefined, undefined, searchQueryOrGeoCodeOrParameters.GeoCode);
      this.SearchType = searchQueryOrGeoCodeOrParameters.SearchType;
      this.Since = searchQueryOrGeoCodeOrParameters.Since;
      this.Until = searchQueryOrGeoCodeOrParameters.Until;
      this.Filters = searchQueryOrGeoCodeOrParameters.Filters;
      this.IncludeEntities = searchQueryOrGeoCodeOrParameters.IncludeEntities;
      this.TweetMode = searchQueryOrGeoCodeOrParameters.TweetMode;
    } else {
      super();

      this.Filters = TweetSearchFilters.None;
      this.PageSize = TwitterLimits.DEFAULTS.SEARCH_TWEETS_MAX_PAGE_SIZE;

      if (Type.isString(searchQueryOrGeoCodeOrParameters)) {
        this.Query = searchQueryOrGeoCodeOrParameters;
      } else if (SearchTweetsParameters.isIGeoCode(searchQueryOrGeoCodeOrParameters)) {
        this.GeoCode = searchQueryOrGeoCodeOrParameters;
      } else if (latitude && longitude) {
        this.GeoCode = new GeoCode(latitude, longitude, undefined, radius, measure);
      } else if (coordinates) {
        this.GeoCode = new GeoCode(undefined, undefined, coordinates, radius, measure);
      }
    }
  }

  public Query: string;
  public Locale: string;

  public Lang?: LanguageFilter;
  public GeoCode: IGeoCode;
  public SearchType?: SearchResultType;

  public Since?: DateTime;
  public Until?: DateTime;

  public Filters: TweetSearchFilters;

  public IncludeEntities?: boolean;

  public TweetMode?: TweetMode;

  public SetGeoCodeWithSource(coordinates: ICoordinates, radius: number, measure: DistanceMeasure): void {
    this.GeoCode = new GeoCode(undefined, undefined, coordinates, radius, measure);
  }

  public SetGeoCode(latitude: number, longitude: number, radius: number, measure: DistanceMeasure): void {
    this.GeoCode = new GeoCode(latitude, longitude, undefined, radius, measure);
  }

  private static isISearchTweetsParameters(searchQueryOrGeoCodeOrParameters: any): searchQueryOrGeoCodeOrParameters is ISearchTweetsParameters {
    return (searchQueryOrGeoCodeOrParameters as ISearchTweetsParameters).Filters !== undefined;
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