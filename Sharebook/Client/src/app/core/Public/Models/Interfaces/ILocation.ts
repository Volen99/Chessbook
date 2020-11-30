import {Inject, InjectionToken} from "@angular/core";

import {ICoordinates} from "./ICoordinates";
import { Location } from '../Location';
import {Coordinates} from "../Coordinates";
import {AppInjector} from "../../../../sharebook/Injectinvi/app-injector";

// A rectangle box area defined by two coordinates.
export interface ILocation {
  // First coordinate of the box. For simplicity use (top, left).
  coordinate1: ICoordinates;

  // Second coordinate of the box. For simplicity use (bottom, right).
  coordinate2: ICoordinates;
}

export const ILocationToken = new InjectionToken<ILocation>('ILocation', {
  providedIn: 'root',
  factory: () => AppInjector.get(Location),
});
