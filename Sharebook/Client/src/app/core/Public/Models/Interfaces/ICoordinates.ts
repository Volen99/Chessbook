import {InjectionToken} from "@angular/core";
import {CoordinatesDTO} from "../../../Core/DTO/CoordinatesDTO";

// Coordinates of a geographical location.
export interface ICoordinates {
  // Longitude of the coordinate (X).
  longitude: number;

  // Latitude of the coordinate (Y).
  latitude: number;
}

export const ICoordinatesToken = new InjectionToken<ICoordinates>('ICoordinates', {
  providedIn: 'root',
  factory: () => new CoordinatesDTO(),
});
