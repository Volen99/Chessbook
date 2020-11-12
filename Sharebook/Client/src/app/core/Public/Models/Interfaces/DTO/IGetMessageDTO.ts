import {InjectionToken} from "@angular/core";

import {IMessageEventDTO} from "./Events/IMessageEventDTO";
import {IApp} from "../IApp";
import {GetMessageDTO} from "../../../../Core/DTO/GetMessageDTO";
import Dictionary from "typescript-dotnet-commonjs/System/Collections/Dictionaries/Dictionary";

export interface IGetMessageDTO {
  messageEvent: IMessageEventDTO;
  apps: Dictionary<number, IApp>;
}

export const IGetMessageDTOToken = new InjectionToken<IGetMessageDTO>('IGetMessageDTO', {
  providedIn: 'root',
  factory: () => new GetMessageDTO(),
});
