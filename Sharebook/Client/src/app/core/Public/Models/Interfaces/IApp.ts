import {InjectionToken} from "@angular/core";
import {App} from "../../../Core/Models/Properties/App";

export interface IApp {
  // Application id
  id: number;

  // Application name
  name: string;

  // Application url
  url: string;
}

export const IAppToken = new InjectionToken<IApp>('IApp', {
  providedIn: 'root',
  factory: () => new App(),
});
