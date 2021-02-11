
// Basic information related with a User and provided in twitter objects like Tweets
export interface IUserMentionEntity /*extends IEquatable<IUserMentionEntity> */{
  // ID of the mentioned users
  id: number; // long?

  // User Id as a string
  idStr: string;

  // Screen name of the referenced users
  screenName: string;

  // User displayed name
  name: string;

  // An array of integers indicating the offsets within the TwitterObject where the hashtag begins and ends.
  indices: Array<number>;
}
