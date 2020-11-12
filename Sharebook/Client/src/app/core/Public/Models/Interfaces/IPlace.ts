import {PlaceType} from 'src/app/components/models/settings/place-type.model';
import {IGeo} from "./IGeo";
import Dictionary from "typescript-dotnet-commonjs/System/Collections/Dictionaries/Dictionary";

export interface IPlace {
  idStr: string; // ID representing this place. Note that this is represented as a string, not an integer
  name: string;  // Short human-readable representation of the place’s name // "name":"Manhattan"
  fullName: string; // Full human-readable representation of the place’s name: "full_name":"Manhattan, NY"

  url: string; // URL representing the location of additional place metadata for this place: "https://api.twitter.com/1.1/geo/id/{id}.json"
  placeType: PlaceType; // The type of location represented by this place: "place_type":"city"
  country: string; // Name of the country containing this place: "country":"United States"
  countryCode: string; // Shortened country code representing the country containing this place: "country_code":"US"

  attributes: Dictionary<string, string>; // When using PowerTrack, 30-Day and Full-Archive Search APIs, and Volume Streams this hash is null

  containedWithin: Array<IPlace>;

  boundingBox: IGeo; // A bounding box of coordinates which encloses this place
  geometry: IGeo;
}
