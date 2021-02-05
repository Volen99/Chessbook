import {IRelationshipStateDTO} from "./IRelationshipStateDTO";

export class RelationshipStateDTO implements IRelationshipStateDTO {
  private _connections: Array<string>;

  // [JsonProperty("id")]
  public targetUserId: number;

  // [JsonProperty("id_str")]
  public targetUserIdStr: string;

  // [JsonProperty("name")]
  public targetUserName: string;

  // [JsonProperty("screen_name")]
  public targetUserScreenName: string;

  // [JsonIgnore]
  public following: boolean;

  // [JsonIgnore]
  public followedBy: boolean;

  // [JsonIgnore]
  public followingRequested: boolean;

  // [JsonIgnore]
  public followingRequestReceived: boolean;

  // [JsonProperty("connections")]
  get connections(): Array<string> {
    return this._connections;
  }

  set connections(value: Array<string>) {
    this._connections = value;
    this.UpdateConnectionInfos();
  }

  private UpdateConnectionInfos(): void {
    this.following = this._connections.includes("following");
    this.followedBy = this._connections.includes("followed_by");
    this.followingRequested = this._connections.includes("following_requested");
    this.followingRequestReceived = this._connections.includes("following_received");
  }
}
