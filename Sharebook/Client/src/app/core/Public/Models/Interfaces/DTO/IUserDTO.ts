import {InjectionToken} from "@angular/core";

import {IUserIdentifier} from "../IUserIdentifier";
import {ITweetDTO} from "./ITweetDTO";
import {IUserEntities} from "../../Entities/IUserEntities";
import DateTime from "../../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Time/DateTime";
import {UserDTO} from "../../../../Core/DTO/UserDTO";

export interface IUserDTO extends IUserIdentifier {
  name: string;

  status: ITweetDTO;

  description: string;

  createdAt: DateTime; // DateTimeOffset;

  location: string;

  geoEnabled?: boolean;

  url: string;

  email: string;

  statusesCount: number;

  followersCount: number;

  friendsCount: number;

  following?: boolean;

  protected: boolean;

  verified: boolean;

  entities: IUserEntities;

  notifications?: boolean;

  profileImageUrlHttp: string;

  profileImageUrl: string;

  followRequestSent?: boolean;

  defaultProfile: boolean;

  defaultProfileImage: boolean;

  favoritesCount?: number;

  listedCount?: number;

  profileSidebarFillColor: string;

  profileSidebarBorderColor: string;

  profileBackgroundTile: boolean;

  profileBackgroundColor: string;

  profileBackgroundImageUrl: string;

  profileBackgroundImageUrlHttps: string;

  profileBannerURL: string;

  profileTextColor: string;

  profileLinkColor: string;

  profileUseBackgroundImage: boolean;

  isTranslator?: boolean;

  utcOffset?: number;

  contributorsEnabled?: boolean;

  timeZone: string;

  // The withheld properties are not always provided in the json result
  withheldInCountries: Iterable<string>;

  withheldScope: string;
}

export const IUserDTOToken = new InjectionToken<IUserDTO>('IUserDTO', {
  providedIn: 'root',
  factory: () => new UserDTO(),
});
