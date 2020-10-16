import {ITwitterIdentifier} from "./ITwitterIdentifier";

// Object containing information to uniquely identify a user.
export interface IUserIdentifier extends ITwitterIdentifier {
  // User screen name
  screenName: string;
}
