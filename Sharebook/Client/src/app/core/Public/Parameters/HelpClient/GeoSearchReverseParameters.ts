import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";
import {ICoordinates} from "../../Models/Interfaces/ICoordinates";
import {Granularity} from './GeoSearchParameters';

// For more information read : https://developer.twitter.com/en/docs/geo/places-near-location/api-reference/get-geo-reverse_geocode
export interface IGeoSearchReverseParameters extends ICustomRequestParameters {
  // Coordinates of the geo location.
  coordinates: ICoordinates;

  // This is the minimal granularity of place types to return.
  granularity: Granularity;

  // A hint on the “region” in which to search. If a number, then this is a radius in meters,
  // but it can also take a string that is suffixed with ft to specify feet.
  accuracy?: number;

  // Maximum number of places to return.
  maximumNumberOfResults?: number;

  // If supplied, the response will use the JSONP format with a callback of the given name.
  callback: string;
}

// https://dev.twitter.com/rest/reference/get/geo/reverse_geocode
export class GeoSearchReverseParameters extends CustomRequestParameters implements IGeoSearchReverseParameters {
  constructor(coordinates: ICoordinates) {
    super();

    this.coordinates = coordinates;
  }

  public coordinates: ICoordinates;
  public granularity: Granularity;
  public accuracy?: number;
  public maximumNumberOfResults?: number;
  public callback: string;
}
