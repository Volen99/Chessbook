import {Settings} from "../../../core/interfaces/common/settings";
import {IUser, UserData} from "../../../core/interfaces/common/users";
import {IPost} from "../../posts/models/tweet";
import {SharebookConsts} from "../../../helpers/sharebook-consts";
import {IUserEntities} from "../../post-object/Entities/interfaces/IUserEntities";
import {UserRight} from "../../models/users/user-right.enum";
import {hasUserRight} from "../../../core/utils/users/user-role";
import {UserRole} from "../../models/users/user-role";
import {Avatar} from "primeng/avatar";
import {UserAdminFlag} from "app/shared/models/users/user-flag.model";
import {UserNotificationSetting} from "../../models/users/user-notification-setting.model";

// Sharebook User 😎
export class User implements IUser {
  REGEX_PROFILE_IMAGE_SIZE: string = "_[^\\W_]+(?=(?:\\.[a-zA-Z0-9_]+$))";
  private const;
  public userDTO: Partial<IUser>;

  static GET_ACTOR_AVATAR_URL(actor: object) {
    return UserData.GET_ACTOR_AVATAR_URL(actor) || this.GET_DEFAULT_AVATAR_URL();
  }

  static GET_DEFAULT_AVATAR_URL() {
    return `${window.location.origin}/client/assets/images/default-avatar-account.png`;
  }

  constructor(userDTO: Partial<IUser>) {
    this.userDTO = userDTO;

    this.mutedByUser = false;
  }

  suspended: boolean;
    suspendedReason?: string;

  pendingEmail: string;
  emailVerified: boolean;
  adminFlags?: UserAdminFlag;

  blocked: boolean;
  blockedReason: string;

  role: UserRole;
  roleLabel: string;
  age: number;
  picture: string;
  settings: Settings;
  email: string;
  profileImageUrlHttp: string;
  mutedByUser: boolean;

  // #region Public Attributes

  // #region Twitter API Attributes

  // This region represents the information accessible from a Twitter API when querying for a User

  get id(): number {
    return this.userDTO.id;
  }

  set id(value: number) {
    throw new Error("Cannot set the Id of a users");
  }

  get idStr(): string {
    return this.userDTO?.idStr;
  }

  set idStr(value: string) {
    throw new Error("Cannot set the Id of a users");
  }


  get screenName(): string {
    return this.userDTO?.screenName;
  }

  set screenName(value: string) {
    throw new Error("Cannot set the ScreenName of a users");
  }

  get name(): string {
    return this.userDTO.name;
  }

  // added 22.03.2021, Monday, 20:09 PM | songs i listen to at 3am on a school night when it's raining.
  set name(value: string) {
    this.userDTO.name = value;
  }

  get description(): string {
    return this.userDTO.description;
  }

  set description(value: string) {
    this.userDTO.description = value;
  }

  get status(): IPost {
    return this.userDTO.status;
  }

  get createdAt(): Date {   // DateTimeOffset
    return this.userDTO.createdAt;
  }

  get location(): string {
    return this.userDTO.location;
  }

  get geoEnabled(): boolean {
    return this.userDTO.geoEnabled;
  }

  get url(): string {
    return this.userDTO.url;
  }

  get statusesCount(): number {
    return this.userDTO.statusesCount;
  }

  get followersCount(): number {
    return this.userDTO.followersCount;
  }

  get friendsCount(): number {
    return this.userDTO.friendsCount;
  }

  get following(): boolean {
    return this.userDTO.following;
  }

  get protected(): boolean {
    return this.userDTO.protected;
  }

  get verified(): boolean {
    return this.userDTO.verified;
  }

  get entities(): IUserEntities {
    return this.userDTO.entities;
  }

  get profileImageUrl(): string {
    return this.userDTO.profileImageUrl;
  }

  get profileImageUrlFullSize(): string {
    let profileImageURL = this.profileImageUrl;
    if (!profileImageURL) {
      return null;
    }

    return profileImageURL.replace(this.REGEX_PROFILE_IMAGE_SIZE, SharebookConsts.EMPTY);
  }

  get profileImageUrl400x400(): string {
    let profileImageURL = this.profileImageUrl;
    if (!profileImageURL) {
      return null;
    }

    return profileImageURL.replace(this.REGEX_PROFILE_IMAGE_SIZE, "_400x400");
  }

  get followRequestSent(): boolean {  // bool?
    return this.userDTO.followRequestSent;
  }

  get defaultProfile(): boolean {
    return this.userDTO.defaultProfile;
  }

  get defaultProfileImage(): boolean {
    return this.userDTO.defaultProfileImage;
  }

  get favoritesCount(): number {
    return this.userDTO.favoritesCount ?? 0;
  }

  get listedCount(): number {
    return this.userDTO.listedCount ?? 0;
  }

  get profileSidebarFillColor(): string {
    return this.userDTO.profileSidebarFillColor;
  }

  get profileSidebarBorderColor(): string {
    return this.userDTO.profileSidebarBorderColor;
  }

  get profileBackgroundTile(): boolean {
    return this.userDTO.profileBackgroundTile;
  }

  get profileBackgroundColor(): string {
    return this.userDTO.profileBackgroundColor;
  }

  get profileBackgroundImageUrl(): string {
    return this.userDTO.profileBackgroundImageUrl;
  }

  get profileBackgroundImageUrlHttps(): string {
    return this.userDTO.profileBackgroundImageUrlHttps;
  }

  get profileBannerURL(): string {
    return this.userDTO.profileBannerURL;
  }

  get profileTextColor(): string {
    return this.userDTO.profileTextColor;
  }

  get profileLinkColor(): string {
    return this.userDTO.profileLinkColor;
  }

  get profileUseBackgroundImage(): boolean {
    return this.userDTO.profileUseBackgroundImage;
  }

  get isTranslator(): boolean {  // bool?
    return this.userDTO.isTranslator;
  }

  get contributorsEnabled(): boolean {  // bool?
    return this.userDTO.contributorsEnabled;
  }

  get utcOffset(): number { // int?
    return this.userDTO.utcOffset;
  }

  get timeZone(): string {
    return this.userDTO.timeZone;
  }

  get withheldInCountries(): Array<string> {
    return this.userDTO.withheldInCountries;
  }

  get withheldScope(): string {
    return this.userDTO.withheldScope;
  }

  get notifications(): boolean {  // bool?
    return this.userDTO.notifications;
  }

  profileImageUrlHttps: string;


  hasRight(right: UserRight) {
    return hasUserRight(this.role, right);
  }

  patch(obj: IUser) {
    // for (const key of Object.keys(obj)) {
    //   this[key] = obj[key];
    // }
    //
    // if (obj.account !== undefined) {
    //   this.account = new Account(obj.account);
    // }
  }

  // updateAccountAvatar(newAccountAvatar?: Avatar) {
    // if (newAccountAvatar) {
    //   this.account.updateAvatar(newAccountAvatar);
    // } else {
    //   this.account.resetAvatar();
    // }
  // }

  updateAccountAvatar(newAccountAvatarUrl?: string) {
    if (newAccountAvatarUrl) {
      this.profileImageUrlHttps = newAccountAvatarUrl;
    }
  }

  // #endregion

  // #endregion

  // Friends
  // public getFriendIds(): ITwitterIterator<number> {
  //   return this.client?.users.getFriendIdsIterator(new GetFriendIdsParameters(this));
  // }
  //
  // public getFriends(): IMultiLevelCursorIterator<number, IUser> {
  //   return this.client?.users.getFriendsIterator(new GetFriendsParameters(this));
  // }
  //
  // // Followers
  // public getFollowerIds(): ITwitterIterator<number> {
  //   return this.client?.users.getFollowerIdsIterator(new GetFollowerIdsParameters(this));
  // }
  //
  // public getFollowers(): IMultiLevelCursorIterator<number, IUser> {
  //   return this.client?.users.getFollowersIterator(new GetFollowersParameters(this));
  // }
  //
  // // Relationship
  // public getRelationshipWithAsync(userIdOrUsernameOrUser: number | string | IUserIdentifier): Promise<IRelationshipDetails> {
  //   let typeCurrent;
  //   if (Type.isNumber(userIdOrUsernameOrUser)) {
  //     typeCurrent = userIdOrUsernameOrUser as number;
  //   } else if (Type.isString(userIdOrUsernameOrUser)) {
  //     typeCurrent = userIdOrUsernameOrUser as string;
  //   } else {
  //     typeCurrent = userIdOrUsernameOrUser as IUserIdentifier;
  //   }
  //
  //   return this.client.users.getRelationshipBetweenAsync(this, typeCurrent);
  // }
  //
  // // Timeline
  // public getUserTimelineAsync(): Promise<ITweet[]> {
  //   return this.client.timelines.getUserTimelineAsync(this);
  // }
  //
  // // Favorites
  // public getFavoriteTweetsAsync(): Promise<ITweet[]> {
  //   return this.client.tweets.getUserFavoriteTweetsAsync(this);
  // }
  //
  // // Lists
  // public getListSubscriptionsAsync(): Promise<ITwitterList[]> {
  //   return this.client.lists.getUserListSubscriptionsAsync(this);
  // }
  //
  // public getOwnedListsAsync(): Promise<ITwitterList[]> {
  //   return this.client.lists.getListsOwnedByUserAsync(new GetListsOwnedByAccountByUserParameters(this));
  // }
  //
  // // Block User
  // public blockUserAsync(): Promise<any> {
  //   return this.client.users.blockUserAsync(this);
  // }
  //
  // public unblockUserAsync(): Promise<any> {
  //   return this.client.users.unblockUserAsync(this);
  // }
  //
  // // Spam
  // public reportUserForSpamAsync(): Promise<any> {
  //   return this.client.users.reportUserForSpamAsync(this);
  // }
  //
  // // Stream Profile Image
  //
  // public getProfileImageStreamAsync(imageSize?: ImageSize): Promise<null> { // stream
  //   let imageSizeCurrent: ImageSize;
  //   if (!ImageSize) {
  //     imageSizeCurrent = ImageSize.Normal;
  //   } else {
  //     imageSizeCurrent = imageSize;
  //   }
  //
  //   let parameters = new GetProfileImageParameters(this);  // TODO: might bug
  //   parameters.imageSize = imageSizeCurrent;
  //
  //   return this.client.users.getProfileImageStreamAsync(parameters);
  // }

  public equals(other: IUser): boolean {
    if (other == null) {
      return false;
    }

    return this.id === other.id || this.screenName === other.screenName;
  }

  public toString(): string {
    return this.userDTO?.screenName ?? "Undefined";
  }

  notificationSettings?: UserNotificationSetting;
  followedBy: boolean;

}
