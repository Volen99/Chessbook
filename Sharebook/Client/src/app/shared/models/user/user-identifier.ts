import {ISharebookIdentifier} from "./sharebook-identifier";

// Object containing information to uniquely identify a user.
export interface IUserIdentifier extends ISharebookIdentifier {
  // User screen name
  screenName: string;
}

