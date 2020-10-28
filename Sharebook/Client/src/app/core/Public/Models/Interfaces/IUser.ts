import IEquatable from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/IEquatable";
import {IUserIdentifier} from "./IUserIdentifier";
import {ITwitterIterator} from "../../Iterators/ITwitterIterator";
import {ITwitterList} from "./ITwitterList";
import {ITweet} from "./ITweet";
import {Stream} from "stream";
import {IMultiLevelCursorIterator} from "../../Iterators/IMultiLevelCursorIterator";
import {ImageSize} from "../Enum/ImageSize";
import {IRelationshipDetails} from "./IRelationshipDetails";
import IEnumerable from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Enumeration/IEnumerable";
import {IUserDTO} from "./DTO/IUserDTO";
import {ITwitterClient} from "../../ITwitterClient";
import {ITweetDTO} from "./DTO/ITweetDTO";
import {IUserEntities} from "../Entities/IUserEntities";
import DateTime from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Time/DateTime";
import {Inject, InjectionToken} from "@angular/core";
import {User} from "../../../Core/Models/User";
import {TwitterClient} from "../../../../sharebook/TwitterClient";
import {UserDTO} from "../../../Core/DTO/UserDTO";

// Contract defining what a user on twitter can do. For more information visit : https://dev.twitter.com/overview/api/users
export interface IUser extends IUserIdentifier, IEquatable<IUser> {
  // Client used by the instance to perform any request to Twitter
  client: ITwitterClient;

  // Property used to store the twitter properties
  userDTO: IUserDTO;

  // #region Twitter API Fields

  // The name of the user, as they’ve defined it.
  name: string;

  // Text describing the user account.
  description: string;

  // Latest tweet published by the user.
  status: ITweetDTO;

  // Date when the user account was created on Twitter.
  createdAt: DateTime; // DateTimeOffset;

  // The user-defined location for this account’s profile.
  location: string;

  // When true, indicates that the user has enabled the possibility of geo tagging their Tweets.
  // This field must be true for the current user to attach geographic data.
  geoEnabled?: boolean;

  // A URL provided by the user in association with their profile.
  url: string;

  // Number of tweets (including retweets) the user published.
  statusesCount: number;

  // Number of followers this user has
  followersCount: number;

  // The number of users this account is following (AKA their “followings”).
  friendsCount: number;

  // When true, indicates that the authenticated user is following this user.
  following?: boolean;

  // When true, indicates that this user has chosen to protect their Tweets.
  // For more information visit : https://support.twitter.com/articles/14016.
  protected: boolean;

  // When true, indicates that the user has a verified account.
  verified: boolean;

  // Entities which have been parsed out of the url or description fields defined by the user.
  entities: IUserEntities;

  // Indicates whether the authenticated user has chosen to receive this user’s tweets by SMS
  notifications?: boolean;

  // URL pointing to the user’s avatar image.
  profileImageUrl: string;

  // URL pointing to the user’s avatar image.
  profileImageUrlFullSize: string;

  // URL of the user 400x400 profile image
  profileImageUrl400x400: string;

  // When true, indicates that the authenticating user has issued a follow request to this protected user account.
  followRequestSent?: boolean;

  // Indicates whether the user is using Twitter default theme profile
  // When true, indicates that the user has not altered the theme or background of their user profile
  defaultProfile: boolean;

  // Indicates whether the user has uploaded his own profile image
  defaultProfileImage: boolean;

  // Number of tweets this user has Favorited in the account’s lifetime.
  favoritesCount: number;

  // The number of public lists that this user is a member of.
  listedCount: number;

  // The hexadecimal color the user has chosen to display sidebar backgrounds with in their Twitter UI.
  profileSidebarFillColor: string;

  // The hexadecimal color the user has chosen to display sidebar borders with in their Twitter UI.
  profileSidebarBorderColor: string;

  // When true, indicates that the user’s profile_background_image_url should be tiled when displayed.
  profileBackgroundTile: boolean;

  // The hexadecimal color chosen by the user for their background.
  profileBackgroundColor: string;

  // URL pointing to the background image the user has uploaded for their profile.
  profileBackgroundImageUrl: string;

  // URL pointing to the background image the user has uploaded for their profile.
  profileBackgroundImageUrlHttps: string;

  // URL pointing to the standard web representation of the user’s uploaded profile banner.
  // By adding a final path element of the URL, you can obtain different image sizes optimized for specific displays.
  profileBannerURL: string;

  // The hexadecimal color the user has chosen to display text with in their Twitter UI.
  profileTextColor: string;

  // The hexadecimal color the user has chosen to display links with in their Twitter UI.
  profileLinkColor: string;

  // When true, indicates the user wants their uploaded background image to be used.
  profileUseBackgroundImage: boolean;

  // When true, indicates that the user is a participant in Twitter’s translator community.
  isTranslator?: boolean;

  // Indicates that the account has the contributor mode enabled
  contributorsEnabled?: boolean;

  // The offset from GMT/UTC in seconds.
  utcOffset?: number;

  //  A string describing the Time Zone this user declares themselves within.
  timeZone: string;

  // The withheld properties are not always provided in the json result

  // If a user is withheld in a country, the information will be listed there
  withheldInCountries: IEnumerable<string>;

  // States whether the user or his tweets are being withheld in a specific country
  withheldScope: string;

  // #endregion

  // Friends

  // Get a list of the user's friend ids.
  getFriendIds(): ITwitterIterator<number>;

  // Get a list of the user's friends.
  getFriends(): IMultiLevelCursorIterator<number, IUser>;

  // Followers

  // Get a list of the user's follower ids.
  getFollowerIds(): ITwitterIterator<number>;

  getFollowers(): IMultiLevelCursorIterator<number, IUser>;

  // Friendship

  // Get the relationship details between the user and another one.
  getRelationshipWithAsync(user: IUserIdentifier): Promise<IRelationshipDetails>;

  // Get the relationship between the authenticated user (source) and another user (target).
  getRelationshipWithAsync(userId: number): Promise<IRelationshipDetails>;

  // Get the relationship between the authenticated user (source) and another user (target).
  getRelationshipWithAsync(username: string): Promise<IRelationshipDetails>;

  // Timeline

  getUserTimelineAsync(): Promise<ITweet[]>;

  // Get Favorites

  getFavoriteTweetsAsync(): Promise<ITweet[]>;

  // Lists

  getOwnedListsAsync(): Promise<ITwitterList[]>;

  getListSubscriptionsAsync(): Promise<ITwitterList[]>;

  // Block

  // Make the authenticated user block the user.
  blockUserAsync(): Promise<void>;

  // Make the authenticated user unblock the user.
  unblockUserAsync(): Promise<void>;

  // Spam

  // Report the user for spam.
  reportUserForSpamAsync(): Promise<void>;

  // Stream Profile Image

  // Get a stream to get the profile image of this user.
  getProfileImageStreamAsync(): Promise<Stream>;

  // Get a stream to get the profile image of this user.
  getProfileImageStreamAsync(imageSize: ImageSize): Promise<Stream>;
}


export const IUserToken = new InjectionToken<IUser>('IUser', {
  providedIn: 'root',
  factory: () => new User(Inject(UserDTO), Inject(TwitterClient)),
});
