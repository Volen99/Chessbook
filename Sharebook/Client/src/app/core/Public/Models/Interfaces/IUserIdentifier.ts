import {InjectionToken} from "@angular/core";

import {ITwitterIdentifier} from "./ITwitterIdentifier";
import {UserIdentifier} from "../UserIdentifier";

// Object containing information to uniquely identify a user.
export interface IUserIdentifier extends ITwitterIdentifier {
  // User screen name
  screenName: string;
}

export const IUserIdentifierToken = new InjectionToken<IUserIdentifier>('IUserIdentifier', {
  providedIn: 'root',
  factory: () => new UserIdentifier(),
});
