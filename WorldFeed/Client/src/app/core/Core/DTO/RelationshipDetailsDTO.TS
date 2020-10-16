import {IRelationshipDetailsDTO} from "../../Public/Models/Interfaces/DTO/IRelationshipDetailsDTO";

export class RelationshipDetailsDTO implements IRelationshipDetailsDTO {
  // [JsonProperty("relationship")]
  private _relationship: any;  // TwitterRelationshipDTO

  private get _sourceAccessor(): any /*SourceRelationshipDTO*/ {
    return this._relationship.Source;
  }

  private get _targetAccessor(): any /*TargetRelationshipDTO*/ {
    return this._relationship.Target;
  }

  get sourceId(): number {
    return this._sourceAccessor.SourceId;
  }

  get sourceIdStr(): string {
    return this._sourceAccessor.SourceIdStr;
  }

  get sourceScreenName(): string {
    return this._sourceAccessor.SourceScreenName;
  }

  get targetId(): number {
    return this._targetAccessor.TargetId;
  }

  get targetIdStr(): string {
    return this._targetAccessor.TargetIdStr;
  }

  get targetScreenName(): string {
    return this._targetAccessor.TargetScreenName;
  }

  // [JsonIgnore]
  get following(): boolean {
    return this._sourceAccessor.Following;
  }

  // [JsonIgnore]
  get followedBy(): boolean {
    return this._sourceAccessor.FollowedBy;
  }


  // [JsonIgnore]
  get followingReceived(): boolean {
    return this._sourceAccessor.FollowingReceived;
  }

  // [JsonIgnore]
  get followingRequested(): boolean {
    return this._sourceAccessor.FollowingRequested;
  }

  // [JsonIgnore]
  get notificationsEnabled(): boolean {
    return this._sourceAccessor.NotificationsEnabled;
  }

  // [JsonIgnore]
  get canSendDirectMessage(): boolean {
    return this._sourceAccessor.CanSendDirectMessage;
  }

  // [JsonIgnore]
  get blocking(): boolean {
    return this._sourceAccessor.Blocking;
  }

  // [JsonIgnore]
  get blockedBy(): boolean {
    return this._sourceAccessor.BlockedBy;
  }


  // [JsonIgnore]
  get muting(): boolean {
    return this._sourceAccessor.Muting;
  }

  // [JsonIgnore]
  get wantRetweets(): boolean {
    return this._sourceAccessor.WantRetweets;
  }

  // [JsonIgnore]
  get allReplies(): boolean {
    return this._sourceAccessor.AllReplies;
  }

  // [JsonIgnore]
  get markedSpam(): boolean {
    return this._sourceAccessor.MarkedSpam;
  }

  private TwitterRelationshipDTO = class {
    // [JsonProperty("source")]
    public Source: any;  // SourceRelationshipDTO

    // [JsonProperty("target")]
    public Target: any; // TargetRelationshipDTO;
  };

  private SourceRelationshipDTO = class {
    // [JsonProperty("id")]
    public SourceId: number;

    // [JsonProperty("id_str")]
    public SourceIdStr: string;

    // [JsonProperty("screen_name")]
    public SourceScreenName: string;

    // [JsonProperty("following")]
    public Following: boolean;

    // [JsonProperty("followed_by")]
    public FollowedBy: boolean;

    // [JsonProperty("following_received")]
    // [JsonConverter(typeof(JsonPropertyConverterRepository))]
    public FollowingReceived: boolean;

    // [JsonProperty("following_requested")]
    // [JsonConverter(typeof(JsonPropertyConverterRepository))]
    public FollowingRequested: boolean;

    // [JsonProperty("notifications_enabled")]
    // [JsonConverter(typeof(JsonPropertyConverterRepository))]
    public NotificationsEnabled: boolean;

    // [JsonProperty("can_dm")]
    public CanSendDirectMessage: boolean;

    // [JsonProperty("blocking")]
    // [JsonConverter(typeof(JsonPropertyConverterRepository))]
    public Blocking: boolean;

    // [JsonProperty("blocked_by")]
    // [JsonConverter(typeof(JsonPropertyConverterRepository))]
    public BlockedBy: boolean;

    // [JsonProperty("muting")]
    // [JsonConverter(typeof(JsonPropertyConverterRepository))]
    public Muting: boolean;

    // [JsonProperty("want_retweets")]
    // [JsonConverter(typeof(JsonPropertyConverterRepository))]
    public WantRetweets: boolean;

    // [JsonProperty("all_replies")]
    // [JsonConverter(typeof(JsonPropertyConverterRepository))]
    public AllReplies: boolean;

    // [JsonProperty("marked_spam")]
    // [JsonConverter(typeof(JsonPropertyConverterRepository))]
    public MarkedSpam: boolean;
  };

  private TargetRelationshipDTO = class {
    // [JsonProperty("id")]
    public TargetId: number;

    // [JsonProperty("id_str")]
    public TargetIdStr: string;

    // [JsonProperty("screen_name")]
    public TargetScreenName: string;
  };
}
