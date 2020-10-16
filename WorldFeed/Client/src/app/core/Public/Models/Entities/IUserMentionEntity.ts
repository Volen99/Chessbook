import IEquatable from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/IEquatable";

// Basic information related with a User and provided in twitter objects like Tweets
export interface IUserMentionEntity extends IEquatable<IUserMentionEntity> {
  // User Id
  id: number; // long?

  // User Id as a string
  idStr: string;

  // User ScreenName
  screenName: string;

  // User displayed name
  name: string;

  // An array of integers indicating the offsets within the TwitterObject where the hashtag begins and ends.
  indices: Array<number>;
}
