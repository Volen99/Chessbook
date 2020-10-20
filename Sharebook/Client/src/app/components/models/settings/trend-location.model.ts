import {PlaceType} from "./place-type.model";

export interface TrendLocation {
  country: string;
  countryCode: string;
  name: string;
  parentid: number;
  placeType: PlaceType;
  url: string;
  woeid: number;
}
