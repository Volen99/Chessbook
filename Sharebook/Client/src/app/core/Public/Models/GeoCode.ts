import {Coordinates} from "./Coordinates";
import {ICoordinates} from "./Interfaces/ICoordinates";
import {DistanceMeasure} from './Enum/DistanceMeasure';
import {IGeoCode} from "./Interfaces/IGeoCode";

export class GeoCode implements IGeoCode {
  constructor(latitude?: number, longitude?: number, coordinates?: ICoordinates,
              radius?: number, distanceMeasure?: DistanceMeasure, source?: IGeoCode) {
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

