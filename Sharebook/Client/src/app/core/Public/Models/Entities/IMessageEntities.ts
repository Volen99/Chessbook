import {IMediaEntity} from "./IMediaEntity";
import {IObjectEntities} from "./IObjectEntities";
import {InjectionToken} from "@angular/core";
import {MessageEntitiesDTO} from "../../../Core/DTO/MessageEntitiesDTO";

export interface IMessageEntities extends IObjectEntities {
  // Collection of medias associated with a Message. Note that this isn't considered an entity by Twitter on
  // a DM and is instead an attachment. It is included in Message.Entities for convenience.
  medias: /*new*/ Array<IMediaEntity>;
}

export const IMessageEntitiesToken = new InjectionToken<IMessageEntities>('IMessageEntities', {
  providedIn: 'root',
  factory: () => new MessageEntitiesDTO(),
});
