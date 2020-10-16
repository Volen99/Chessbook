import {IUserIdentifier} from '../../Public/Models/Interfaces/IUserIdentifier';
import {PrivacyMode} from '../../Public/Models/Enum/PrivacyMode';
import {ITwitterList} from "../../Public/Models/Interfaces/ITwitterList";
import {ITwitterListDTO} from "../../Public/Models/Interfaces/DTO/ITwitterListDTO";
import {IUser} from "../../Public/Models/Interfaces/IUser";
import {ITwitterClient} from "../../Public/ITwitterClient";
import {ITweet} from "../../Public/Models/Interfaces/ITweet";
import {GetMembersOfListParameters} from "../../Public/Parameters/ListsClient/Members/GetMembersOfListParameters";
import {UpdateListParameters} from "../../Public/Parameters/ListsClient/UpdateListParameters";
import {IListMetadataParameters} from "../../Public/Parameters/ListsClient/IListMetadataParameters";
import DateTime from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Time/DateTime";

export class TwitterList implements ITwitterList {
  private _twitterListDTO: ITwitterListDTO;
  private _owner: IUser;

  constructor(twitterListDTO: ITwitterListDTO, client: ITwitterClient) {
    // ! order is important, client should be at the top so that `UpdateOwner`
    // can use the client factories to create the owner user.
    this.client = client;

    this._twitterListDTO = twitterListDTO;
    this.updateOwner();
  }

  get twitterListDTO(): ITwitterListDTO {
    return this._twitterListDTO;
  }

  set twitterListDTO(value: ITwitterListDTO) {
    this._twitterListDTO = value;
    this.updateOwner();
  }

  public client: ITwitterClient;

  get id(): number {
    return this._twitterListDTO.id;
  }

  get idStr(): string {
    return this._twitterListDTO.idStr;
  }

  get slug(): string {
    return this._twitterListDTO.slug;
  }

  get ownerId(): number {
    return this._twitterListDTO.ownerId;
  }

  get ownerScreenName(): string {
    return this._twitterListDTO.ownerScreenName;
  }

  get name(): string {
    return this._twitterListDTO.name;
  }

  get fullName(): string {
    return this._twitterListDTO.fullName;
  }

  get owner(): IUser {
    return this._owner;
  }

  get createdAt(): DateTime {  // DateTimeOffset
    return this._twitterListDTO.createdAt;
  }

  get uri(): string {
    return this._twitterListDTO.uri;
  }

  get description(): string {
    return this._twitterListDTO.description;
  }

  get following(): boolean {
    return this._twitterListDTO.following;
  }

  get privacyMode(): PrivacyMode {
    return this._twitterListDTO.privacyMode;
  }

  get memberCount(): number {
    return this._twitterListDTO.memberCount;
  }

  get subscriberCount(): number {
    return this._twitterListDTO.subscriberCount;
  }

  public getTweetsAsync(): Promise<ITweet[]> {
    return this.client.Lists.getTweetsFromListAsync(this);
  }

  // Members
  public getMembersAsync(): Promise<IUser[]> {
    return this.client.Lists.getMembersOfListAsync(new GetMembersOfListParameters(this));
  }

  public addMemberAsync(userId: number): Promise<void> {
    return this.client.Lists.addMemberToListAsync(this, userId);
  }

  public addMemberAsync(username: string): Promise<void> {
    return this.client.Lists.addMemberToListAsync(this, username);
  }

  public addMemberAsync(user: IUserIdentifier): Promise<void> {
    return this.client.Lists.addMemberToListAsync(this, user);
  }

  public addMembersAsync(userIds: Array<number>): Promise<void> {
    return this.client.Lists.addMembersToListAsync(this, userIds);
  }

  public addMembersAsync(usernames: Array<string>): Promise<void> {
    return this.client.Lists.addMembersToListAsync(this, usernames);
  }

  public addMembersAsync(users: Array<IUserIdentifier>): Promise<void> {
    return this.client.Lists.addMembersToListAsync(this, users);
  }

  public removeMemberAsync(userId: number): Promise<boolean> {
    return this.client.Lists.checkIfUserIsMemberOfListAsync(this, userId);
  }

  public removeMemberAsync(username: string): Promise<boolean> {
    return this.client.Lists.checkIfUserIsMemberOfListAsync(this, username);
  }

  public removeMemberAsync(user: IUserIdentifier): Promise<boolean> {
    return this.client.Lists.checkIfUserIsMemberOfListAsync(this, user);
  }

  public removeMembersAsync(userIds: Array<number>): Promise<void> {
    return this.client.Lists.removeMembersFromListAsync(this, userIds);
  }

  public removeMembersAsync(usernames: Array<string>): Promise<void> {
    return this.client.Lists.removeMembersFromListAsync(this, usernames);
  }

  public removeMembersAsync(users: Array<IUserIdentifier>): Promise<void> {
    return this.client.Lists.removeMembersFromListAsync(this, users);
  }

  public checkUserMembershipAsync(userId: number): Promise<boolean> {
    return this.client.Lists.checkIfUserIsMemberOfListAsync(this, userId);
  }

  public checkUserMembershipAsync(userScreenName: string): Promise<boolean> {
    return this.client.Lists.checkIfUserIsMemberOfListAsync(this, userScreenName);
  }

  public checkUserMembershipAsync(user: IUserIdentifier): Promise<boolean> {
    return this.client.Lists.checkIfUserIsMemberOfListAsync(this, user);
  }

  // Subscribers
  public getSubscribersAsync(): Promise<IUser[]> {
    return this.client.Lists.getListSubscribersAsync(this);
  }

  public subscribeAsync(): Promise<ITwitterList> {
    return this.client.Lists.subscribeToListAsync(this);
  }

  public unsubscribeAsync(): Promise<ITwitterList> {
    return this.client.Lists.unsubscribeFromListAsync(this);
  }

  public checkUserSubscriptionAsync(userId: number): Promise<boolean> {
    return this.client.Lists.checkIfUserIsSubscriberOfListAsync(this, userId);
  }

  public checkUserSubscriptionAsync(username: string): Promise<boolean> {
    return this.client.Lists.checkIfUserIsSubscriberOfListAsync(this, username);
  }

  public checkUserSubscriptionAsync(user: IUserIdentifier): Promise<boolean> {
    return this.client.Lists.checkIfUserIsSubscriberOfListAsync(this, user);
  }

  public async updateAsync(parameters: IListMetadataParameters): Promise<void> {
    let updateListParams = new UpdateListParameters(this);
    updateListParams.name = parameters?.name;
    updateListParams.description = parameters?.description;
    updateListParams.privacyMode = parameters?.privacyMode;

    let updateList = await this.client.Lists.updateListAsync(updateListParams); // .ConfigureAwait(false);

    if (updateList != null) {
      this._twitterListDTO = updateList.twitterListDTO;
    }
  }

  public destroyAsync(): Promise<void> {
    return this.client.Lists.destroyListAsync(this);
  }

  private updateOwner(): void {
    if (this._twitterListDTO != null) {
      this._owner = this.client.Factories.createUser(this._twitterListDTO.owner);
    }
  }
}
