import {ICoordinates} from "./ICoordinates";
import {Inject, InjectionToken} from "@angular/core";
import { Location } from '../../../Public/Models/Location';
import {Coordinates} from "../Coordinates";

// A rectangle box area defined by two coordinates.
export interface ILocation {
  // First coordinate of the box. For simplicity use (top, left).
  coordinate1: ICoordinates;

  // Second coordinate of the box. For simplicity use (bottom, right).
  coordinate2: ICoordinates;
}

export const ILocationToken = new InjectionToken<ILocation>('ILocation', {
  providedIn: 'root',
  factory: () => new Location(Inject(Number), Inject(Number), Inject(Number), Inject(Number),
  Inject(Coordinates), Inject(Coordinates)),
});
