import {IUser} from "./IUser";

// Set of methods to retrieve suggested users
export interface ISuggestedUserList {
  // List name
  name: string;

  // Name of the list or category
  slug: string;

  // Size of the list
  size: number;

  // Suggested users
  members: Array<IUser>;
}
