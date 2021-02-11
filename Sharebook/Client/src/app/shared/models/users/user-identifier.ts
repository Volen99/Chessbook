import {ISharebookIdentifier} from "./sharebook-identifier";

// Object containing information to uniquely identify a users.
export interface IUserIdentifier extends ISharebookIdentifier {
  // User screen name
  screenName: string;
}

