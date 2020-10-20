import {ILocation} from "./Interfaces/ILocation";
import {ICoordinates} from './Interfaces/ICoordinates';
import {Coordinates} from "./Coordinates";

export class Location implements ILocation {
  public coordinate1: ICoordinates;
  public coordinate2: ICoordinates;

  constructor(latitude1: number, longitude1: number, latitude2: number, longitude2: number,
              coordinates1: ICoordinates, coordinates2: ICoordinates) {
    if (coordinates1 || coordinates2) {
      this.coordinate1 = coordinates1;
      this.coordinate2 = coordinates2;
    } else {
      this.coordinate1 = new Coordinates(latitude1, longitude1);
      this.coordinate2 = new Coordinates(latitude2, longitude2);
    }
  }

  // public static CoordinatesLocatedIn(coordinates: ICoordinates, location: ILocation): boolean {
  //   return Location.CoordinatesLocatedIn(coordinates, location.Coordinate1, location.Coordinate2);
  // }

  public static CoordinatesLocatedIn(coordinates: ICoordinates, boxCoordinates1OrLocation: ICoordinates | ILocation, boxCoordinates2?: ICoordinates): boolean {
    if (Location.isLocation(boxCoordinates1OrLocation)) {
     boxCoordinates2 = boxCoordinates1OrLocation.coordinate2;
     boxCoordinates1OrLocation = boxCoordinates1OrLocation.coordinate1;
    }

    let xIsBelowCoord1AndAboveCoord2: boolean = boxCoordinates1OrLocation.longitude >= coordinates.longitude &&
      coordinates.longitude >= boxCoordinates2.longitude;

    let xIsAboveCoord1AndBelowCoord2: boolean = boxCoordinates1OrLocation.longitude <= coordinates.longitude &&
      coordinates.longitude <= boxCoordinates2.longitude;

    let yIsRightCoord1AndLeftCoord2: boolean = boxCoordinates1OrLocation.latitude >= coordinates.latitude &&
      coordinates.latitude >= boxCoordinates2.latitude;

    let yIsLeftCoord1AndRightCoord2: boolean = boxCoordinates1OrLocation.latitude <= coordinates.latitude &&
      coordinates.latitude <= boxCoordinates2.latitude;

    return (xIsAboveCoord1AndBelowCoord2 || xIsBelowCoord1AndAboveCoord2) &&
      (yIsLeftCoord1AndRightCoord2 || yIsRightCoord1AndLeftCoord2);
  }

  private static isLocation(boxCoordinates1OrLocation: ICoordinates | ILocation): boxCoordinates1OrLocation is ILocation {
    return (boxCoordinates1OrLocation as ILocation).coordinate1 !== undefined;
  }
}

// public Location(ICoordinates coordinates1, ICoordinates coordinates2)
// {
//   Coordinate1 = coordinates1;
//   Coordinate2 = coordinates2;
// }
//
// public Location(double latitude1, double longitude1, double latitude2, double longitude2)
// {
//   Coordinate1 = new Coordinates(latitude1, longitude1);
//   Coordinate2 = new Coordinates(latitude2, longitude2);
// }
