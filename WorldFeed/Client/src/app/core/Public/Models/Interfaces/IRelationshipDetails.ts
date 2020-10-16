import {IRelationshipDetailsDTO} from "./DTO/IRelationshipDetailsDTO";

export interface IRelationshipDetails {
  // The source user of the relationship
  sourceId: number;

  // The source user of the relationship
  sourceIdStr: string;

  // The source user of the relationship
  sourceScreenName: string;

  // The target user of the relationship
  targetId: number;

  // The target user of the relationship
  targetIdStr: string;

  // The target user of the relationship
  targetScreenName: string;

  // Informs if the source user following the target user.
  following: boolean;

  // Informs if the source user is followed by the target user.
  followedBy: boolean;

  // Informs if the private source user has received a request to be followed by the target user.
  followingRequestReceived: boolean;

  // Informs if the source user requested to follow the private target user.
  followingRequested: boolean;

  // Informs if the source user has requested to be notified when the target user publishes tweets.
  notificationsEnabled: boolean;

  // Informs if the source user can send private messages to the target.
  canSendDirectMessage: boolean;

  // Informs if the source has blocked the target.
  blocking: boolean;

  blockedBy: boolean;

  // Informs if the source has muted the target.
  muting: boolean;

  // Informs if the source wants to receive a notification for retweets published by the target.
  wantRetweets: boolean;

  // Informs if the source wants to receive a notification for each reply published by the target.
  allReplies: boolean;

  // Informs if the source has marked the user as being a spammer.
  markedSpam: boolean;

  relationshipDetailsDTO: IRelationshipDetailsDTO;
}
