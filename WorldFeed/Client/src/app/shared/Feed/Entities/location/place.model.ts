import { BoundingBox } from './bounding-box.model';

export interface Place {
  id: string; // ID representing this place. Note that this is represented as a string, not an integer
  url: string; // URL representing the location of additional place metadata for this place: "https://api.twitter.com/1.1/geo/id/{id}.json"
  placeType: string; // The type of location represented by this place: "place_type":"city"
  name: string; // Short human-readable representation of the place’s name // "name":"Manhattan"
  fullName: string; // Full human-readable representation of the place’s name: "full_name":"Manhattan, NY"
  countryCode: string; // Shortened country code representing the country containing this place: "country_code":"US"
  country: string; // Name of the country containing this place: "country":"United States"
  boundingBox: BoundingBox; // A bounding box of coordinates which encloses this place
  attributes?: {}; // When using PowerTrack, 30-Day and Full-Archive Search APIs, and Volume Streams this hash is null
}
