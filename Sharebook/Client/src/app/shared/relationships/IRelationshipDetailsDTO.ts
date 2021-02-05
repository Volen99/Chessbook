export interface IRelationshipDetailsDTO {
  sourceId: number;
  sourceIdStr: string;
  sourceScreenName: string;

  targetId: number;
  targetIdStr: string;
  targetScreenName: string;

  following: boolean;
  followedBy: boolean;
  followingReceived: boolean;
  followingRequested: boolean;

  notificationsEnabled: boolean;
  canSendDirectMessage: boolean;

  blocking: boolean;
  blockedBy: boolean;
  muting: boolean;

  wantRetweets: boolean;
  allReplies: boolean;
  markedSpam: boolean;
}
