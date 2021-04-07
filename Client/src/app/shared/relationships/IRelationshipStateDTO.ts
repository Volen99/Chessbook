export interface IRelationshipStateDTO {
  targetUserId: number;
  targetUserIdStr: string;

  targetUserName: string;
  targetUserScreenName: string;

  connections: Array<string>;

  following: boolean;
  followedBy: boolean;
  followingRequested: boolean;
  followingRequestReceived: boolean;
}
