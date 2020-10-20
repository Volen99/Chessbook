import {ITwitterListIdentifier} from "../ITwitterListIdentifier";
import {IUserDTO} from "./IUserDTO";
import { PrivacyMode } from '../../Enum/PrivacyMode';
import DateTime from "../../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Time/DateTime";

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
