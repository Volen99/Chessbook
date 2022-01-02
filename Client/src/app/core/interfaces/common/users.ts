import {Observable} from 'rxjs';
import {DataSource} from 'ng2-smart-table/lib/lib/data-source/data-source';

import {Settings} from './settings';
import {getAbsoluteAPIUrl} from "../../../helpers/utils";
import {IPost} from "../../../shared/posts/models/post.model";
import {IUserEntities} from "../../../shared/post-object/Entities/interfaces/IUserEntities";
import {IUserIdentifier} from "../../../shared/models/users/user-identifier";
import {UserUpdate} from "../../../shared/models/users/user-update.model";
import {UserCreate} from "../../../shared/models/users/user-create.model";
import {UserAdminFlag} from "../../../shared/models/users/user-flag.model";
import {UserRole} from "../../../shared/models/users/user-role";
import {UserRight} from "../../../shared/models/users/user-right.enum";
import {UserNotificationSetting} from "../../../shared/models/users/user-notification-setting.model";
import {ComponentPaginationLight} from "../../rest/component-pagination.model";

export interface IUser extends IUserIdentifier {
  displayName: string;

  status: IPost;

  description: string;

  createdOn: Date;

  age: number;
  settings: Settings;

  location: string;

  theme: string;

  geoEnabled?: boolean;

  url: string;

  email: string;

  statusesCount: number;

  followersCount: number;

  followingCount: number;

  following?: boolean;

  protected: boolean;

  verified: boolean;

  entities: IUserEntities;

  notifications?: boolean;

  profileImageUrlHttps: string;

  followRequestSent?: boolean;

  defaultProfile: boolean;

  defaultProfileImage: boolean;

  favoritesCount?: number;

  listedCount?: number;

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

  followedBy: boolean;

  lastLoginDate: Date | null;

  // TODO: Make a separate interface?!

  pendingEmail: string | null;

  emailVerified: boolean;

  adminFlags?: UserAdminFlag;

  roles: UserRole[];
  roleLabel: string[];

  blocked: boolean;
  blockedReason?: string;

  blocking: boolean;

  suspended: boolean;
  suspendedReason?: string;

  mutedByUser: boolean;
  blockedBy: boolean;

  hasRight(right: UserRight);

  canManage(user: IUser);

  notificationSettings?: UserNotificationSetting;

  websiteLink: string;

  twitterLink: string;

  twitchLink: string;

  youtubeLink: string;

  facebookLink: string;

  unreadPrivateMessages: number;

  active: boolean;
}

export abstract class UserData {
  abstract get gridDataSource(): DataSource;

  abstract getCurrentUser(): Observable<IUser>;

  abstract list(pageNumber: number, pageSize: number): Observable<IUser[]>;

  abstract get(id: number): Observable<IUser>;

  abstract update(user: IUser): Observable<IUser>;

  abstract updateCurrent(user: IUser): Observable<IUser>;

  abstract updateCurrentPersonal(body: any): Observable<IUser>;

  abstract create(user: IUser): Observable<IUser>;

  abstract delete(id: number): Observable<boolean>;

  /* ### Admin methods ### */

  abstract addUser(userCreate: UserCreate);

  abstract banUsers(usersArg: IUser | IUser[], reason?: string);

  abstract unbanUsers(usersArg: IUser | IUser[]);

  abstract removeUser(usersArg: IUser | IUser[]);

  abstract updateUser(userId: number, userUpdate: UserUpdate);

  abstract updateUsers(users: IUser[], userUpdate: UserUpdate);

  abstract getUserWithCache(userId: number);

  abstract getUser(userId: number, withStats: boolean);

  abstract getAnonymousUser();

  abstract getUsers(parameters: { pagination: ComponentPaginationLight });

  abstract getYourBirthday(userId: number);

  // end

  static GET_ACTOR_AVATAR_URL(actor: { avatar?: { url?: string, path: string } }) {
    if (actor?.avatar?.url) return actor.avatar.url;

    if (actor && actor.avatar) {
      const absoluteAPIUrl = getAbsoluteAPIUrl();

      return absoluteAPIUrl + actor.avatar.path;
    }
  }

  static CREATE_BY_STRING(screenName: string) {
    return screenName.substring(1);
  }

}
