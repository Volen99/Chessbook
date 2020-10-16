import {IRelationshipStateDTO} from "../../../Public/Models/Interfaces/DTO/IRelationshipStateDTO";
import {IRelationshipState} from "../../../Public/Models/Interfaces/IRelationshipState";

export class RelationshipState implements IRelationshipState {
  constructor(relationshipStateDTO: IRelationshipStateDTO) {
    this.relationshipStateDTO = relationshipStateDTO;
  }

  public relationshipStateDTO: IRelationshipStateDTO;

  get targetId(): number {
    return this.relationshipStateDTO.targetUserId;
  }

  get targetIdStr(): string {
    return this.relationshipStateDTO.targetUserIdStr;
  }

  get targetName(): string {
    return this.relationshipStateDTO.targetUserName;
  }

  get targetScreenName(): string {
    return this.relationshipStateDTO.targetUserScreenName;
  }

  get following(): boolean {
    return this.relationshipStateDTO.following;
  }

  get followedBy(): boolean {
    return this.relationshipStateDTO.followedBy;
  }

  get followingRequested(): boolean {
    return this.relationshipStateDTO.followingRequested;
  }

  get followingRequestReceived(): boolean {
    return this.relationshipStateDTO.followingRequestReceived;
  }
}
