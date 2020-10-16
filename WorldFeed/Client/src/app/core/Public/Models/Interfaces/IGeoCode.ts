﻿import {ICoordinates} from "./ICoordinates";
import {DistanceMeasure} from '../Enum/DistanceMeasure';

// GeoCode represent an area around a specific center coordinate.
export interface IGeoCode {
  // Center of the area.
  coordinates: ICoordinates;

  // Distance between the center and the end of the area.
  radius: number;

  // Type of measure used for the Radius.
  distanceMeasure: DistanceMeasure;
}