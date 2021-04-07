import {IRelationshipDetailsDTO} from "./IRelationshipDetailsDTO";

export interface IRelationshipDetails {
  // The source users of the relationship
  sourceId: number;

  // The source users of the relationship
  sourceIdStr: string;

  // The source users of the relationship
  sourceScreenName: string;

  // The target users of the relationship
  targetId: number;

  // The target users of the relationship
  targetIdStr: string;

  // The target users of the relationship
  targetScreenName: string;

  // Informs if the source users following the target users.
  following: boolean;

  // Informs if the source users is followed by the target users.
  followedBy: boolean;

  // Informs if the private source users has received a request to be followed by the target users.
  followingRequestReceived: boolean;

  // Informs if the source users requested to follow the private target users.
  followingRequested: boolean;

  // Informs if the source users has requested to be notified when the target users publishes tweets.
  notificationsEnabled: boolean;

  // Informs if the source users can send private messages to the target.
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

  // Informs if the source has marked the users as being a spammer.
  markedSpam: boolean;

  relationshipDetailsDTO: IRelationshipDetailsDTO;
}
