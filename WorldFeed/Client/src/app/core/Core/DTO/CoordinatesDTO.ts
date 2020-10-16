import {ICoordinates} from "../../Public/Models/Interfaces/ICoordinates";

// Coordinates of a geographical location
export class CoordinatesDTO implements ICoordinates {
  constructor(longitude?: number, latitude?: number) {
    if (longitude && latitude) {
      this.longitude = longitude;
      this.latitude = latitude;
    }
  }

  public latitude: number;

  public longitude: number;

  private set _coordinatesSetter(value: Array<number>) {
    if (value != null) {
      this.longitude = value[0];
      this.latitude = value[1];
    }
  }
}

// public CoordinatesDTO() { }

// public CoordinatesDTO(double longitude, double latitude)
// {
//   Longitude = longitude;
//   Latitude = latitude;
// }
