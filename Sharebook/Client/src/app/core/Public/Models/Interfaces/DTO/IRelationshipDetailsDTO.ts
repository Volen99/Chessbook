import {InjectionToken} from "@angular/core";
import {RelationshipDetailsDTO} from "../../../../Core/DTO/RelationshipDetailsDTO";


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

export const IRelationshipDetailsDTOToken = new InjectionToken<IRelationshipDetailsDTO>('IRelationshipDetailsDTO', {
  providedIn: 'root',
  factory: () => new RelationshipDetailsDTO(),
});
