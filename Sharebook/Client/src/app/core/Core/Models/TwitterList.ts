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
import Type from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Types";

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
    return this.client.lists.getTweetsFromListAsync(this);
  }

  // Members
  public getMembersAsync(): Promise<IUser[]> {
    return this.client.lists.getMembersOfListAsync(new GetMembersOfListParameters(this));
  }

  public addMemberAsync(userIdOrUsernameOrIdentifier: number | string | IUserIdentifier): Promise<any> {
    let typeCurrent;
    if (Type.isNumber(userIdOrUsernameOrIdentifier)) {
      typeCurrent = userIdOrUsernameOrIdentifier as number;
    } else if (Type.isString(userIdOrUsernameOrIdentifier)) {
      typeCurrent = userIdOrUsernameOrIdentifier as string;
    } else {
      typeCurrent = userIdOrUsernameOrIdentifier as IUserIdentifier;
    }

    return this.client.lists.addMemberToListAsync(this, typeCurrent);
  }

  public addMembersAsync(userIdsOrUsernamesOrUsers: Array<number | string | IUserIdentifier>): Promise<any> {
    return this.client.lists.addMembersToListAsync(this, userIdsOrUsernamesOrUsers);
  }

  public removeMemberAsync(userIdOrUsernameOrIdentifier: number | string | IUserIdentifier): Promise<boolean> {
    let typeCurrent;
    if (Type.isNumber(userIdOrUsernameOrIdentifier)) {
      typeCurrent = userIdOrUsernameOrIdentifier as number;
    } else if (Type.isString(userIdOrUsernameOrIdentifier)) {
      typeCurrent = userIdOrUsernameOrIdentifier as string;
    } else {
      typeCurrent = userIdOrUsernameOrIdentifier as IUserIdentifier;
    }

    return this.client.lists.checkIfUserIsMemberOfListAsync(this, typeCurrent);
  }

  public removeMembersAsync(userIdsOrUsernamesOrUsers: Array<number | string | IUserIdentifier>): Promise<any> {
    return this.client.lists.removeMembersFromListAsync(this, userIdsOrUsernamesOrUsers);
  }

  public checkUserMembershipAsync(userIdOrScreenNameOrIdentifier: number | string | IUserIdentifier): Promise<boolean> {
    let typeCurrent;
    if (Type.isNumber(userIdOrScreenNameOrIdentifier)) {
      typeCurrent = userIdOrScreenNameOrIdentifier as number;
    } else if (Type.isString(userIdOrScreenNameOrIdentifier)) {
      typeCurrent = userIdOrScreenNameOrIdentifier as string;
    } else {
      typeCurrent = userIdOrScreenNameOrIdentifier as IUserIdentifier;
    }

    return this.client.lists.checkIfUserIsMemberOfListAsync(this, typeCurrent);
  }

  // Subscribers
  public getSubscribersAsync(): Promise<IUser[]> {
    return this.client.lists.getListSubscribersAsync(this);
  }

  public subscribeAsync(): Promise<ITwitterList> {
    return this.client.lists.subscribeToListAsync(this);
  }

  public unsubscribeAsync(): Promise<ITwitterList> {
    return this.client.lists.unsubscribeFromListAsync(this);
  }

  public checkUserSubscriptionAsync(userIdOrUsernameOrIdentifier: number | string | IUserIdentifier): Promise<boolean> {
    let typeCurrent;
    if (Type.isNumber(userIdOrUsernameOrIdentifier)) {
      typeCurrent = userIdOrUsernameOrIdentifier as number;
    } else if (Type.isString(userIdOrUsernameOrIdentifier)) {
      typeCurrent = userIdOrUsernameOrIdentifier as string;
    } else {
      typeCurrent = userIdOrUsernameOrIdentifier as IUserIdentifier;
    }

    return this.client.lists.checkIfUserIsSubscriberOfListAsync(this, typeCurrent);
  }

  public async updateAsync(parameters: IListMetadataParameters): Promise<void> {
    let updateListParams = new UpdateListParameters(this);
    updateListParams.name = parameters?.name;
    updateListParams.description = parameters?.description;
    updateListParams.privacyMode = parameters?.privacyMode;

    let updateList = await this.client.lists.updateListAsync(updateListParams); // .ConfigureAwait(false);

    if (updateList != null) {
      this._twitterListDTO = updateList.twitterListDTO;
    }
  }

  public destroyAsync(): Promise<void> {
    return this.client.lists.destroyListAsync(this);
  }

  private updateOwner(): void {
    if (this._twitterListDTO != null) {
      this._owner = this.client.factories.createUser(this._twitterListDTO.owner);
    }
  }
}
