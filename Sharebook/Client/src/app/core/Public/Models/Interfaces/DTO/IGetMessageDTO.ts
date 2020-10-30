import {InjectionToken} from "@angular/core";

import {IMessageEventDTO} from "./Events/IMessageEventDTO";
import {IApp} from "../IApp";
import Dictionary from "../../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Dictionaries/Dictionary";
import {GetMessageDTO} from "../../../../Core/DTO/GetMessageDTO";

export interface IGetMessageDTO {
  messageEvent: IMessageEventDTO;
  apps: Dictionary<number, IApp>;
}

export const IGetMessageDTOToken = new InjectionToken<IGetMessageDTO>('IGetMessageDTO', {
  providedIn: 'root',
  factory: () => new GetMessageDTO(),
});
