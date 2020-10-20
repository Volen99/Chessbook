import {ITwitterListIdentifier} from "../../Public/Models/Interfaces/ITwitterListIdentifier";
import {IUserIdentifier} from "../../Public/Models/Interfaces/IUserIdentifier";

export interface ITwitterListIdentifierFactory {
  create(listId: number): ITwitterListIdentifier;

  create(slug: string, user: IUserIdentifier): ITwitterListIdentifier;

  create(slug: string, ownerId: number): ITwitterListIdentifier;

  create(slug: string, ownerScreenName: string): ITwitterListIdentifier;
}
