import {Settings} from "../../../core/interfaces/common/settings";
import {IPost} from "../../posts/models/post.model";
import {IUser, UserData} from "../../../core/interfaces/common/users";
import {IUserEntities} from "../../post-object/Entities/interfaces/IUserEntities";
import {UserRight} from "../../models/users/user-right.enum";
import {UserRole} from "../../models/users/user-role";
import {UserAdminFlag} from "app/shared/models/users/user-flag.model";
import {UserNotificationSetting} from "../../models/users/user-notification-setting.model";
import {hasUserRight} from "../../../core/utils/users/user-role";
import {ResultList} from "../../models";

// Sharebook User 😎
export class User implements IUser {
  private REGEX_PROFILE_IMAGE_SIZE: string = "_[^\\W_]+(?=(?:\\.[a-zA-Z0-9_]+$))";

  static GET_ACTOR_AVATAR_URL(actor: object) {
    return UserData.GET_ACTOR_AVATAR_URL(actor) || this.GET_DEFAULT_ANONYMOUS_AVATAR_URL();
  }

  static GET_DEFAULT_ANONYMOUS_AVATAR_URL() {
    return `assets/images/default_profile_200x200.png`;
  }

  static extractVideoChannels (result: ResultList<User>) {
    const videoChannels: User[] = [];

    for (const videoChannelJSON of result.data) {
      videoChannels.push(new User(videoChannelJSON));
    }

    return { data: videoChannels, total: result.total };
  }

  constructor(hash: Partial<IUser>) {
    if (!hash) return;
    this.id = hash.id;
    this.idStr = hash.idStr;
    this.displayName = hash.displayName;
    this.screenName = hash.screenName;
    this.email = hash.email;
    this.status = hash.status;
    this.description = hash.description;
    if (hash.createdOn) this.createdOn = new Date(hash.createdOn.toString());
    this.location = hash.location;
    this.geoEnabled = hash.geoEnabled;
    this.url = hash.url;
    this.statusesCount = hash.statusesCount;
    this.followersCount = hash.followersCount;
    this.followingCount = hash.followingCount;
    this.following = hash.following;
    this.verified = hash.verified;
    this.entities = hash.entities;
    this.notifications = hash.notifications;
    this.followRequestSent = hash.followRequestSent;
    this.defaultProfile = hash.defaultProfile;
    this.defaultProfileImage = hash.defaultProfileImage;
    this.favoritesCount = hash.favoritesCount;
    this.listedCount = hash.listedCount;
    this.profileBackgroundImageUrl = hash.profileBackgroundImageUrl;
    this.profileBackgroundImageUrlHttps = hash.profileBackgroundImageUrlHttps;
    this.profileBannerURL = hash.profileBannerURL;
    this.profileTextColor = hash.profileTextColor;
    this.profileLinkColor = hash.profileLinkColor;
    this.profileUseBackgroundImage = hash.profileUseBackgroundImage;
    this.isTranslator = hash.isTranslator;
    this.utcOffset = hash.utcOffset;
    this.contributorsEnabled = hash.contributorsEnabled;
    this.timeZone = hash.timeZone;
    this.withheldInCountries = hash.withheldInCountries;
    this.withheldScope = hash.withheldScope;

    this.theme = hash.theme; // or anonymous user

    this.suspended = hash.suspended;
    this.suspendedReason = hash.suspendedReason;

    this.pendingEmail = hash.pendingEmail;
    this.emailVerified = hash.emailVerified;
    this.adminFlags = hash.adminFlags;

    this.blocked = hash.blocked;
    this.blockedReason = hash.blockedReason;
    this.blocking = hash.blocking;

    this.roles = hash.roles;
    this.roleLabel = hash.roleLabel;

    this.age = hash.age;
    this.settings = hash.settings;

    this.lastLoginDate = hash.lastLoginDate;

    this.profileImageUrlHttps = hash.profileImageUrlHttps;

    this.followedBy = hash.followedBy;

    this.mutedByUser = hash.mutedByUser; // false;
    this.blockedBy = hash.blockedBy; // false;

    this.notificationSettings = hash.notificationSettings;

    this.websiteLink = hash.websiteLink;
    this.twitterLink = hash.twitterLink;
    this.twitchLink = hash.twitchLink;
    this.youtubeLink = hash.youtubeLink;
    this.facebookLink = hash.facebookLink;

    this.unreadPrivateMessages = hash.unreadPrivateMessages;

  }

  theme: string; // for anonymous user

  id: number;
  idStr: string;
  displayName: string;
  screenName: string;
  email: string;
  status: IPost;
  description: string;
  createdOn: Date;
  location: string;
  geoEnabled?: boolean;
  url: string;
  statusesCount: number = 0;
  followersCount: number;
  followingCount: number;
  following?: boolean;
  protected: boolean;
  verified: boolean;
  entities: IUserEntities;
  notifications?: boolean;
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
  withheldInCountries: string[];
  withheldScope: string;

  suspended: boolean;
  suspendedReason?: string;

  pendingEmail: string;
  emailVerified: boolean;
  adminFlags?: UserAdminFlag;

  blocked: boolean;
  blockedReason: string;

  roles: UserRole[];
  roleLabel: string[];

  age: number;
  settings: Settings;
  mutedByUser: boolean;
  blockedBy: boolean;
  blocking: boolean;

  lastLoginDate: Date | null;

  profileImageUrlHttps: string;

  notificationSettings?: UserNotificationSetting;
  followedBy: boolean;

  websiteLink: string;

  twitterLink: string;

  twitchLink: string;

  youtubeLink: string;

  facebookLink: string;

  unreadPrivateMessages: number;

  hasRight(right: UserRight) {
    return hasUserRight(this.roles, right);
  }

  canManage(user: IUser) {
    const myRoles = this.roles;

    if (myRoles.includes(UserRole.ADMINISTRATOR)) {
      return true;
    }

    // I'm a moderator: I can only manage users
    return this.roles.includes(UserRole.REGISTERED);

    // return user.role === UserRole.USER;
  }

}


// // added 22.03.2021, Monday, 20:09 PM | songs i listen to at 3am on a school night when it's raining.
// set displayName(value: string) {
//   this.userDTO.displayName = value;
// }


// get profileImageUrlFullSize(): string {
//   let profileImageURL = this.profileImageUrl;
//   if (!profileImageURL) {
//     return null;
//   }
//
//   return profileImageURL.replace(this.REGEX_PROFILE_IMAGE_SIZE, SharebookConsts.EMPTY);
// }
//
// get profileImageUrl400x400(): string {
//   let profileImageURL = this.profileImageUrl;
//   if (!profileImageURL) {
//     return null;
//   }
//
//   return profileImageURL.replace(this.REGEX_PROFILE_IMAGE_SIZE, "_400x400");
// }
