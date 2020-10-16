import {ICoordinates} from "./Interfaces/ICoordinates";

export class Coordinates implements ICoordinates {
  constructor(latitude: number, longitude: number) {
    this.longitude = longitude;
    this.latitude = latitude;
  }

  public longitude: number;
  public latitude: number;
}
