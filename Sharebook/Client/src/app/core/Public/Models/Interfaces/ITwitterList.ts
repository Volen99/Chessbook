﻿import {ITwitterListIdentifier} from "./ITwitterListIdentifier";
import {PrivacyMode} from '../Enum/PrivacyMode';
import {ITweet} from "./ITweet";
import {IUserIdentifier} from "./IUserIdentifier";
import IEnumerable from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Enumeration/IEnumerable";
import {ITwitterListDTO} from "./DTO/ITwitterListDTO";
import {IUser} from "./IUser";
import {ITwitterClient} from "../../ITwitterClient";
import {IListMetadataParameters} from "../../Parameters/ListsClient/IListMetadataParameters";
import DateTime from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Time/DateTime";

export interface ITwitterList extends ITwitterListIdentifier {
  twitterListDTO: ITwitterListDTO;

  // List Id as a string provided by Twitter.
  idStr: string;

  // List Name
  name: string;

  // List Fullname
  fullName: string;

  // User who owns the list.
  owner: IUser;

  // Date when the list was created.
  createdAt: DateTime; // DateTimeOffset;

  uri: string;

  // Description of the list.
  description: string;

  // Is the authenticated user following this list.
  following: boolean;

  // Whether this list is private or public.
  privacyMode: PrivacyMode;

  // Number of members in this list.
  memberCount: number;

  // Number of users who subscribed to this list.
  subscriberCount: number;

  // Client used by the instance to perform any request to Twitter
  client: ITwitterClient;

  // Get the tweets from this list.
  getTweetsAsync(): Promise<ITweet[]>;

  // Get the members of this list.
  getMembersAsync(): Promise<IUser[]>;

  // Add a member to this list. You must be the owner of the list to do so.
  addMemberAsync(userId: number): Promise<void>;

  // Add a member to this list. You must be the owner of the list to do so.
  addMemberAsync(username: string): Promise<void>;

  // Add a member to this list. You must be the owner of the list to do so.
  addMemberAsync(user: IUserIdentifier): Promise<void>;

  // Add a list of members to this list. You must be the owner of the list to do so.
  addMembersAsync(userIds: IEnumerable<number>): Promise<void>;

  // Add a list of members to this list. You must be the owner of the list to do so.
  addMembersAsync(userScreenNames: IEnumerable<string>): Promise<void>;

  // Add a list of members to this list. You must be the owner of the list to do so.
  addMembersAsync(users: IEnumerable<IUserIdentifier>): Promise<void>;

  // Remove a member from this list. You must be the owner of the list to do so.
  removeMemberAsync(userId: number): Promise<boolean>;

  // Remove a member from this list. You must be the owner of the list to do so.
  removeMemberAsync(username: string): Promise<boolean>;

  // Remove a member from this list. You must be the owner of the list to do so.
  removeMemberAsync(user: IUserIdentifier): Promise<boolean>;

  // Remove a list of members from this list. You must be the owner of the list to do so.
  removeMembersAsync(userIds: IEnumerable<number>): Promise<void>;

  // Remove a list of members from this list. You must be the owner of the list to do so.
  removeMembersAsync(usernames: IEnumerable<string>): Promise<void>;

  // Remove a list of members from this list. You must be the owner of the list to do so.
  removeMembersAsync(users: IEnumerable<IUserIdentifier>): Promise<void>;

  // Test if a user is a member of the list.
  checkUserMembershipAsync(userId: number): Promise<boolean>;

  // Test if a user is a member of the list.
  checkUserMembershipAsync(userScreenName: string): Promise<boolean>;

  // Test if a user is a member of the list.
  checkUserMembershipAsync(user: IUserIdentifier): Promise<boolean>;

  // Get the subscribers of the list.
  getSubscribersAsync(): Promise<IUser[]>;

  // Subscribe the authenticated user to the list.
  subscribeAsync(): Promise<ITwitterList>;

  // Unsubscribe the authenticated user from the list.
  unsubscribeAsync(): Promise<ITwitterList>;

  // Check whether a user has subscribed to the list.
  checkUserSubscriptionAsync(userId: number): Promise<boolean>;

  // Check whether a user has subscribed to the list.
  checkUserSubscriptionAsync(username: string): Promise<boolean>;

  // Check whether a user has subscribed to the list.
  checkUserSubscriptionAsync(user: IUserIdentifier): Promise<boolean>;

  // Update the list.
  updateAsync(parameters: IListMetadataParameters): Promise<void>;

  // Destroy the list.
  destroyAsync(): Promise<void>;
}