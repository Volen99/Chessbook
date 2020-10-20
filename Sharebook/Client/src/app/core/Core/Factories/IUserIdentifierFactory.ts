import {IUserIdentifier} from "../../Public/Models/Interfaces/IUserIdentifier";

export interface IUserIdentifierFactory {
  create(userId: number): IUserIdentifier;

  create(userScreenName: string): IUserIdentifier;
}
