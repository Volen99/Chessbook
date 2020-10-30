import {Inject, Injectable} from "@angular/core";

import {Coordinates} from "./Coordinates";
import {ICoordinates, ICoordinatesToken} from "./Interfaces/ICoordinates";
import {DistanceMeasure} from './Enum/DistanceMeasure';
import {IGeoCode, IGeoCodeToken} from "./Interfaces/IGeoCode";

@Injectable()
export class GeoCode implements IGeoCode {
  constructor(latitude?: number,
              longitude?: number,
              @Inject(ICoordinatesToken) coordinates?: ICoordinates,
              radius?: number,
              @Inject(IGeoCodeToken) distanceMeasure?: DistanceMeasure,
              @Inject(IGeoCodeToken) source?: IGeoCode) {
    if (coordinates || source) {
      if (source) {
        this.coordinates = new Coordinates(source.coordinates.latitude, source.coordinates.longitude);
        this.radius = source.radius;
        this.distanceMeasure = source.distanceMeasure;
      } else {
        this.coordinates = coordinates;
        this.radius = radius;
        this.distanceMeasure = distanceMeasure;
      }
    } else {
      this.coordinates = new Coordinates(latitude, longitude);
      this.radius = radius;
      this.distanceMeasure = distanceMeasure;
    }
  }

  public coordinates: ICoordinates;
  public radius: number;
  public distanceMeasure: DistanceMeasure;
}

// public GeoCode(ICoordinates coordinates, double radius, DistanceMeasure distanceMeasure)
// {
//     Coordinates = coordinates;
//     Radius = radius;
//     DistanceMeasure = distanceMeasure;
// }

// public GeoCode(double latitude, double longitude, double radius, DistanceMeasure distanceMeasure)
// {
//     Coordinates = new Coordinates(latitude, longitude);
//     Radius = radius;
//     DistanceMeasure = distanceMeasure;
// }

// public GeoCode(IGeoCode source)
// {
//     if (source == null)
//     {
//         return;
//     }
//
//     Coordinates = new Coordinates(source.Coordinates.Latitude, source.Coordinates.Longitude);
//     Radius = source.Radius;
//     DistanceMeasure = source.DistanceMeasure;
// }
