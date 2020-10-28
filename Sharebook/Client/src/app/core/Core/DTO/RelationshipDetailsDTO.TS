import {IRelationshipDetailsDTO} from "../../Public/Models/Interfaces/DTO/IRelationshipDetailsDTO";

export class RelationshipDetailsDTO implements IRelationshipDetailsDTO {
  // [JsonProperty("relationship")]
  private _relationship: any;  // TwitterRelationshipDTO

  private get _sourceAccessor(): any /*SourceRelationshipDTO*/ {
    return this._relationship.source;
  }

  private get _targetAccessor(): any /*TargetRelationshipDTO*/ {
    return this._relationship.target;
  }

  get sourceId(): number {
    return this._sourceAccessor.sourceId;
  }

  get sourceIdStr(): string {
    return this._sourceAccessor.sourceIdStr;
  }

  get sourceScreenName(): string {
    return this._sourceAccessor.sourceScreenName;
  }

  get targetId(): number {
    return this._targetAccessor.targetId;
  }

  get targetIdStr(): string {
    return this._targetAccessor.targetIdStr;
  }

  get targetScreenName(): string {
    return this._targetAccessor.targetScreenName;
  }

  // [JsonIgnore]
  get following(): boolean {
    return this._sourceAccessor.following;
  }

  // [JsonIgnore]
  get followedBy(): boolean {
    return this._sourceAccessor.followedBy;
  }


  // [JsonIgnore]
  get followingReceived(): boolean {
    return this._sourceAccessor.followingReceived;
  }

  // [JsonIgnore]
  get followingRequested(): boolean {
    return this._sourceAccessor.followingRequested;
  }

  // [JsonIgnore]
  get notificationsEnabled(): boolean {
    return this._sourceAccessor.notificationsEnabled;
  }

  // [JsonIgnore]
  get canSendDirectMessage(): boolean {
    return this._sourceAccessor.canSendDirectMessage;
  }

  // [JsonIgnore]
  get blocking(): boolean {
    return this._sourceAccessor.blocking;
  }

  // [JsonIgnore]
  get blockedBy(): boolean {
    return this._sourceAccessor.blockedBy;
  }


  // [JsonIgnore]
  get muting(): boolean {
    return this._sourceAccessor.muting;
  }

  // [JsonIgnore]
  get wantRetweets(): boolean {
    return this._sourceAccessor.wantRetweets;
  }

  // [JsonIgnore]
  get allReplies(): boolean {
    return this._sourceAccessor.allReplies;
  }

  // [JsonIgnore]
  get markedSpam(): boolean {
    return this._sourceAccessor.markedSpam;
  }

  private TwitterRelationshipDTO = class {
    // [JsonProperty("source")]
    public source: any;  // SourceRelationshipDTO

    // [JsonProperty("target")]
    public target: any; // TargetRelationshipDTO;
  };

  private SourceRelationshipDTO = class {
    // [JsonProperty("id")]
    public sourceId: number;

    // [JsonProperty("id_str")]
    public sourceIdStr: string;

    // [JsonProperty("screen_name")]
    public sourceScreenName: string;

    // [JsonProperty("following")]
    public following: boolean;

    // [JsonProperty("followed_by")]
    public followedBy: boolean;

    // [JsonProperty("following_received")]
    // [JsonConverter(typeof(JsonPropertyConverterRepository))]
    public followingReceived: boolean;

    // [JsonProperty("following_requested")]
    // [JsonConverter(typeof(JsonPropertyConverterRepository))]
    public followingRequested: boolean;

    // [JsonProperty("notifications_enabled")]
    // [JsonConverter(typeof(JsonPropertyConverterRepository))]
    public notificationsEnabled: boolean;

    // [JsonProperty("can_dm")]
    public canSendDirectMessage: boolean;

    // [JsonProperty("blocking")]
    // [JsonConverter(typeof(JsonPropertyConverterRepository))]
    public blocking: boolean;

    // [JsonProperty("blocked_by")]
    // [JsonConverter(typeof(JsonPropertyConverterRepository))]
    public blockedBy: boolean;

    // [JsonProperty("muting")]
    // [JsonConverter(typeof(JsonPropertyConverterRepository))]
    public muting: boolean;

    // [JsonProperty("want_retweets")]
    // [JsonConverter(typeof(JsonPropertyConverterRepository))]
    public wantRetweets: boolean;

    // [JsonProperty("all_replies")]
    // [JsonConverter(typeof(JsonPropertyConverterRepository))]
    public allReplies: boolean;

    // [JsonProperty("marked_spam")]
    // [JsonConverter(typeof(JsonPropertyConverterRepository))]
    public markedSpam: boolean;
  };

  private TargetRelationshipDTO = class {
    // [JsonProperty("id")]
    public targetId: number;

    // [JsonProperty("id_str")]
    public targetIdStr: string;

    // [JsonProperty("screen_name")]
    public targetScreenName: string;
  };
}
