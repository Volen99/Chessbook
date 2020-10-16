import InvalidOperationException from 'src/app/c#-objects/TypeScript.NET-Core/packages/Core/source/Exceptions/InvalidOperationException';
import Regex from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Text/RegularExpressions";
import {ITwitterIterator} from "../../Public/Iterators/ITwitterIterator";
import {IUserIdentifier} from "../../Public/Models/Interfaces/IUserIdentifier";
import {Stream} from "stream";
import {ImageSize} from "../../Public/Models/Enum/ImageSize";
import {IUserEntities} from "../../Public/Models/Entities/IUserEntities";
import {IUserDTO} from "../../Public/Models/Interfaces/DTO/IUserDTO";
import {ITwitterClient} from "../../Public/ITwitterClient";
import {IUser} from "../../Public/Models/Interfaces/IUser";
import {ITweetDTO} from "../../Public/Models/Interfaces/DTO/ITweetDTO";
import DateTime from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Time/DateTime";
import {WorldFeedConsts} from "../../Public/worldFeed-consts";
import {GetFriendIdsParameters} from "../../Public/Parameters/UsersClient/GetFriendIdsParameters";
import {IMultiLevelCursorIterator} from "../../Public/Iterators/IMultiLevelCursorIterator";
import {GetFriendsParameters} from "../../Public/Parameters/UsersClient/GetFriendsParameters";
import {GetFollowerIdsParameters} from "../../Public/Parameters/UsersClient/GetFollowerIdsParameters";
import {GetFollowersParameters} from "../../Public/Parameters/UsersClient/GetFollowersParameters";
import {IRelationshipDetails} from "../../Public/Models/Interfaces/IRelationshipDetails";
import {ITweet} from "../../Public/Models/Interfaces/ITweet";
import {ITwitterList} from "../../Public/Models/Interfaces/ITwitterList";
import {GetListsOwnedByAccountByUserParameters} from "../../Public/Parameters/ListsClient/GetListsOwnedByUserParameters";
import {GetProfileImageParameters} from "../../Public/Parameters/UsersClient/GetProfileImageParameters";
import Type from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Types";

// Tweetinvi User.
export class User implements IUser {
  private const;
  REGEX_PROFILE_IMAGE_SIZE: string = "_[^\\W_]+(?=(?:\\.[a-zA-Z0-9_]+$))";
  public client: ITwitterClient;
  public userDTO: IUserDTO;

  constructor(userDTO: IUserDTO, client: ITwitterClient) {
    this.userDTO = userDTO;
    this.client = client;
  }

  // #region Public Attributes

  // #region Twitter API Attributes

  // This region represents the information accessible from a Twitter API when querying for a User

  get id(): number {
    return this.userDTO.id;
  }

  set id(value: number) {
    throw new InvalidOperationException("Cannot set the Id of a user");
  }

  get idStr(): string {
    return this.userDTO?.idStr;
  }

  set idStr(value: string) {
    throw new InvalidOperationException("Cannot set the Id of a user");
  }


  get screenName(): string {
    return this.userDTO?.screenName;
  }

  set screenName(value: string) {
    throw new InvalidOperationException("Cannot set the ScreenName of a user");
  }

  get name(): string {
    return this.userDTO.name;
  }

  get description(): string {
    return this.userDTO.description;
  }

  get status(): ITweetDTO {
    return this.userDTO.status;
  }

  get createdAt(): DateTime {   // DateTimeOffset
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

    return Regex.replace(profileImageURL, this.REGEX_PROFILE_IMAGE_SIZE, WorldFeedConsts.EMPTY);
  }

  get profileImageUrl400x400(): string {
    let profileImageURL = this.profileImageUrl;
    if (!profileImageURL) {
      return null;
    }

    return Regex.replace(profileImageURL, this.REGEX_PROFILE_IMAGE_SIZE, "_400x400");
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

  // #endregion

  // #endregion

  // Friends
  public getFriendIds(): ITwitterIterator<number> {
    return this.client?.Users.getFriendIdsIterator(new GetFriendIdsParameters(this));
  }

  public getFriends(): IMultiLevelCursorIterator<number, IUser> {
    return this.client?.Users.getFriendsIterator(new GetFriendsParameters(this));
  }

  // Followers
  public getFollowerIds(): ITwitterIterator<number> {
    return this.client?.Users.getFollowerIdsIterator(new GetFollowerIdsParameters(this));
  }

  public getFollowers(): IMultiLevelCursorIterator<number, IUser> {
    return this.client?.Users.getFollowersIterator(new GetFollowersParameters(this));
  }

  // Relationship
  public getRelationshipWithAsync(userIdOrUsernameOrUser: number | string | IUserIdentifier): Promise<IRelationshipDetails> {
    let typeCurrent;
    if (Type.isNumber(userIdOrUsernameOrUser)) {
      typeCurrent = userIdOrUsernameOrUser as number;
    } else if (Type.isString(userIdOrUsernameOrUser)) {
      typeCurrent = userIdOrUsernameOrUser as string;
    } else {
      typeCurrent = userIdOrUsernameOrUser as IUserIdentifier;
    }

    return this.client.Users.getRelationshipBetweenAsync(this, typeCurrent);
  }

  // Timeline
  public getUserTimelineAsync(): Promise<ITweet[]> {
    return this.client.Timelines.getUserTimelineAsync(this);
  }

  // Favorites
  public getFavoriteTweetsAsync(): Promise<ITweet[]> {
    return this.client.Tweets.getUserFavoriteTweetsAsync(this);
  }

  // Lists
  public getListSubscriptionsAsync(): Promise<ITwitterList[]> {
    return this.client.Lists.getUserListSubscriptionsAsync(this);
  }

  public getOwnedListsAsync(): Promise<ITwitterList[]> {
    return this.client.Lists.getListsOwnedByUserAsync(new GetListsOwnedByAccountByUserParameters(this));
  }

  // Block User
  public blockUserAsync(): Promise<IUser> {
    return this.client.Users.blockUserAsync(this);
  }

  public unblockUserAsync(): Promise<IUser> {
    return this.client.Users.unblockUserAsync(this);
  }

  // Spam
  public reportUserForSpamAsync(): Promise<IUser> {
    return this.client.Users.reportUserForSpamAsync(this);
  }

  // Stream Profile Image

  public getProfileImageStreamAsync(imageSize?: ImageSize): Promise<Stream> {
    let imageSizeCurrent: ImageSize;
    if (!ImageSize) {
      imageSizeCurrent = ImageSize.Normal;
    } else {
      imageSizeCurrent = imageSize;
    }

    let result = this.client.Users.getProfileImageStreamAsync(new GetProfileImageParameters(this));
    result.ImageSize = imageSizeCurrent;

    return result;
  }

  public equals(other: IUser): boolean {
    if (other == null) {
      return false;
    }

    return this.id === other.id || this.screenName === other.screenName;
  }

  public toString(): string {
    return this.userDTO?.screenName ?? "Undefined";
  }
}
