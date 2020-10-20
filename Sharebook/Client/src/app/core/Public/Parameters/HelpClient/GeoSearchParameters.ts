import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";
import {ICoordinates} from "../../Models/Interfaces/ICoordinates";
import Dictionary from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Dictionaries/Dictionary";

export enum Granularity {
  Undefined,
  POI,
  Neighborhood,
  City,
  Admin,
  Country
}

export enum AccuracyMeasure {
  Meters,
  Feets
}

// For more information read: https://developer.twitter.com/en/docs/geo/places-near-location/api-reference/get-geo-search
export interface IGeoSearchParameters extends ICustomRequestParameters {
  // Coordinates of the geo location.
  coordinates: ICoordinates;

  // Free-form text to match against while executing a geo-based query, best suited for finding nearby locations by name.
  query: string;

  // An Ip address. Used when attempting to fix geolocation based off of the user’s Ip address.
  ip: string;

  // This is the minimal granularity of place types to return.
  granularity: Granularity;

  // A hint on the “region” in which to search. If a number, then this is a radius in meters,
  // but it can also take a string that is suffixed with ft to specify feet.
  accuracy?: number;

  // Maximum number of places to return.
  maximumNumberOfResults?: number;

  // This is the place_id which you would like to restrict the search results to.
  // Setting this value means only places within the given place_id will be found.
  containedWithin: string;

  // This parameter searches for places which have the given attributes.
  attributes: Dictionary<string, string>;

  // If supplied, the response will use the JSONP format with a callback of the given name.
  callback: string;

  // Type of measure used in pair with the Accuracy parameters
  accuracyMeasure: AccuracyMeasure;
}

// https://dev.twitter.com/rest/reference/get/geo/search
export class GeoSearchParameters extends CustomRequestParameters implements IGeoSearchParameters {
  constructor() {
    super();
    this.attributes = new Dictionary<string, string>();
  }

  public coordinates: ICoordinates;
  public query: string;
  public ip: string;
  public granularity: Granularity;
  public accuracy?: number;
  public maximumNumberOfResults?: number;
  public containedWithin: string;
  public attributes: Dictionary<string, string>;
  public callback: string;
  public accuracyMeasure: AccuracyMeasure;
}
