import {Inject, InjectionToken} from "@angular/core";

import {IRelationshipStateDTO} from "./DTO/IRelationshipStateDTO";
import {RelationshipState} from "../../../Core/Models/TwitterEntities/RelationshipState";
import {RelationshipStateDTO} from "../../../Core/DTO/RelationshipStateDTO";

export interface IRelationshipState {
  // User id of the relationship target.
  targetId: number;

  // User id of the relationship target.
  targetIdStr: string;

  // User display name of the relationship target.
  targetName: string;

  // User screen name of the relationship target.
  targetScreenName: string;

  // Is the source target following the target.
  following: boolean;

  // Is the source target followed by the target.
  followedBy: boolean;

  // Has a following request been sent to the target.
  followingRequested: boolean;

  // Has a following request been received by the source.
  followingRequestReceived: boolean;

  // DTO
  relationshipStateDTO: IRelationshipStateDTO;
}

export const IRelationshipStateToken = new InjectionToken<IRelationshipState>('IRelationshipState', {
  providedIn: 'root',
  factory: () => new RelationshipState(Inject(RelationshipStateDTO)),
});
