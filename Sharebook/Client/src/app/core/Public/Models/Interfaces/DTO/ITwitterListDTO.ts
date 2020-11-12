import {InjectionToken} from "@angular/core";

import {ITwitterListIdentifier} from "../ITwitterListIdentifier";
import {IUserDTO} from "./IUserDTO";
import { PrivacyMode } from '../../Enum/PrivacyMode';
import {TwitterListDTO} from "../../../../Core/DTO/TwitterListDTO";
import DateTime from "typescript-dotnet-commonjs/System/Time/DateTime";

export interface ITwitterListDTO extends ITwitterListIdentifier {
  idStr: string;

  name: string;
  fullName: string;

  owner: IUserDTO;
  createdAt: DateTime; // DateTimeOffset;
  uri: string;
  description: string;
  following: boolean;
  privacyMode: PrivacyMode;

  memberCount: number;
  subscriberCount: number;
}

export const ITwitterListDTOToken = new InjectionToken<ITwitterListDTO>('ITwitterListDTO', {
  providedIn: 'root',
  factory: () => new TwitterListDTO(),
});
