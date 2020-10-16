import { PlaceType } from '../Enum/PlaceType';

export interface ITrendLocation {
  // Trend location : Where On Earth ID : https://developer.yahoo.com/geo/geoplanet/guide/concepts.html
  woeId: number;

  // Trend name.
  name: string;

  // Country where this trend is active.
  country: string;

  // Country code where this trend is active.
  countryCode: string;

  // Search url containing tweets with the trend.
  url: string;

  // WOEID of the parent location. E.G NewYork parentId would be United States
  parentId: number;

  // Type/Size of the referenced place.
  placeType: PlaceType;
}
