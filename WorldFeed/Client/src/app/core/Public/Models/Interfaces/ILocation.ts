import {ICoordinates} from "./ICoordinates";

// A rectangle box area defined by two coordinates.
export interface ILocation {
  // First coordinate of the box. For simplicity use (top, left).
  coordinate1: ICoordinates;

  // Second coordinate of the box. For simplicity use (bottom, right).
  coordinate2: ICoordinates;
}
