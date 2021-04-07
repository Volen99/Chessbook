import {Observable} from 'rxjs';
import {DataSource} from 'ng2-smart-table/lib/lib/data-source/data-source';
import {Settings} from './settings';
import {getAbsoluteAPIUrl} from "../../../helpers/utils";
import {IPost} from "../../../shared/posts/models/tweet";
import {IUserEntities} from "../../../shared/post-object/Entities/interfaces/IUserEntities";
import {IUserIdentifier} from "../../../shared/models/users/user-identifier";
import {UserUpdate} from "../../../shared/models/users/user-update.model";
import {UserCreate} from "../../../shared/models/users/user-create.model";
import {UserAdminFlag} from "../../../shared/models/users/user-flag.model";
import {UserRole} from "../../../shared/models/users/user-role";
import {RestPagination} from "../../rest/rest-pagination";
import {SortMeta} from "primeng/api";
import {ResultList} from "../../../shared/models";
import {UserRight} from "../../../shared/models/users/user-right.enum";
import {Avatar} from "primeng/avatar";

export interface IUser extends IUserIdentifier {
  name?: string;

  status: IPost;

  description: string;

  createdAt: Date;

  // role: string;
  age: number;
  picture: string;
  settings: Settings;

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

  withheldInCountries: Array<string>;   // The withheld properties are not always provided in the json result

  withheldScope: string;


  // id: number;
  // firstName: string;
  // lastName: string;
  // email: string;
  // name?: string;
  // login: string;
  // address: Address;


  // TODO: Make a separate interface?!


  pendingEmail: string | null;

  emailVerified: boolean;

  adminFlags?: UserAdminFlag;

  role: UserRole;
  roleLabel: string;

  blocked: boolean;
  blockedReason?: string;

  suspended: boolean;
  suspendedReason?: string;

  hasRight(right: UserRight);

  updateAccountAvatar(newAccountAvatar?: Avatar);
}

export interface Address {
  street: string;
  city: string;
  zipCode: string;
}

export abstract class UserData {
  abstract get gridDataSource(): DataSource;

  abstract getCurrentUser(): Observable<IUser>;

  abstract list(pageNumber: number, pageSize: number): Observable<IUser[]>;

  abstract get(id: number): Observable<IUser>;

  abstract update(user: IUser): Observable<IUser>;

  abstract updateCurrent(user: IUser): Observable<IUser>;

  abstract create(user: IUser): Observable<IUser>;

  abstract delete(id: number): Observable<boolean>;

  /* ### Admin methods ### */

  abstract addUser(userCreate: UserCreate);

  abstract banUsers(usersArg: IUser | IUser[], reason?: string);

  abstract unbanUsers(usersArg: IUser | IUser[]);

  abstract removeUser(usersArg: IUser | IUser[]);

  abstract updateUser(userId: number, userUpdate: UserUpdate);

  abstract updateUsers(users: IUser[], userUpdate: UserUpdate);

  abstract getUserWithCache (userId: number);

  abstract getUser (userId: number, withStats: boolean);

  abstract getAnonymousUser ();

  // abstract getUsers (parameters: { pagination: RestPagination, sort: SortMeta, search?: string }): Observable<ResultList<IUser>>;

  abstract getUsers(pageNumber: number, pageSize: number);

  // end


  static GET_ACTOR_AVATAR_URL(actor: { avatar?: { url?: string, path: string } }) {
    if (actor?.avatar?.url) return actor.avatar.url;

    if (actor && actor.avatar) {
      const absoluteAPIUrl = getAbsoluteAPIUrl();

      return absoluteAPIUrl + actor.avatar.path;
    }
  }

  static CREATE_BY_STRING(accountName: string /*host: string, forceHostname = false*/) {
    const absoluteAPIUrl = getAbsoluteAPIUrl();
    const thisHost = new URL(absoluteAPIUrl).host;

    // if (host.trim() === thisHost && !forceHostname) {
    //   return accountName;
    // }

    return '@' + accountName;  // accountName + '@' + host
  }

  static IS_LOCAL(host: string) {
    const absoluteAPIUrl = getAbsoluteAPIUrl();
    const thisHost = new URL(absoluteAPIUrl).host;

    return host.trim() === thisHost;
  }
}
