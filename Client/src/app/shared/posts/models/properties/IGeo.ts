import {ICoordinates} from "./ICoordinates";

// Geographic information of a location
export interface IGeo {
  // Type of geographic location.
  type: string;

  // Collection of coordinates forming a polygone representing a location.
  coordinates: Array<ICoordinates>;
}
