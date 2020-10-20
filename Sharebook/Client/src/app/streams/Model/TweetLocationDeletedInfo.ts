export class TweetLocationDeletedInfo implements ITweetLocationDeletedInfo {
  // [JsonProperty("user_id")]
  public UserId: number;

  // [JsonProperty("user_id_str")]
  public UserIdStr: string;

  // [JsonProperty("up_to_status_id")]
  public UpToStatusId: number;

  // [JsonProperty("up_to_status_id_str")]
  public UpToStatusIdStr: string;
}
