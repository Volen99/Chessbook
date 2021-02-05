import {IRelationshipDetails} from "./IRelationshipDetails";
import {IRelationshipDetailsDTO} from "./IRelationshipDetailsDTO";

export class RelationshipDetails implements IRelationshipDetails {
  constructor(relationshipDetailsDTO: IRelationshipDetailsDTO) {
    this.relationshipDetailsDTO = relationshipDetailsDTO;
  }

  public relationshipDetailsDTO: IRelationshipDetailsDTO;

  get sourceId(): number {
    return this.relationshipDetailsDTO.sourceId;
  }

  get sourceIdStr(): string {
    return this.relationshipDetailsDTO.sourceIdStr;
  }

  get sourceScreenName(): string {
    return this.relationshipDetailsDTO.sourceScreenName;
  }

  get targetId(): number {
    return this.relationshipDetailsDTO.targetId;
  }

  get targetIdStr(): string {
    return this.relationshipDetailsDTO.targetIdStr;
  }

  get targetScreenName(): string {
    return this.relationshipDetailsDTO.targetScreenName;
  }

  get following(): boolean {
    return this.relationshipDetailsDTO.following;
  }

  get followedBy(): boolean {
    return this.relationshipDetailsDTO.followedBy;
  }

  get followingRequestReceived(): boolean {
    return this.relationshipDetailsDTO.followingReceived;
  }

  get followingRequested(): boolean {
    return this.relationshipDetailsDTO.followingRequested;
  }

  get notificationsEnabled(): boolean {
    return this.relationshipDetailsDTO.notificationsEnabled;
  }

  get canSendDirectMessage(): boolean {
    return this.relationshipDetailsDTO.canSendDirectMessage;
  }

  get blocking(): boolean {
    return this.relationshipDetailsDTO.blocking;
  }

  get blockedBy(): boolean {
    return this.relationshipDetailsDTO.blockedBy;
  }

  get muting(): boolean {
    return this.relationshipDetailsDTO.muting;
  }

  get wantRetweets(): boolean {
    return this.relationshipDetailsDTO.wantRetweets;
  }

  get allReplies(): boolean {
    return this.relationshipDetailsDTO.allReplies;
  }

  get markedSpam(): boolean {
    return this.relationshipDetailsDTO.markedSpam;
  }
}
