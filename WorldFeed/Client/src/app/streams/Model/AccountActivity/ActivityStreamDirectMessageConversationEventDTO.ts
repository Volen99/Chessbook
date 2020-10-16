export class ActivityStreamTargetRecipientDTO {
  // [JsonProperty("recipient_id")]
  public RecipientId: number;
}

export class ActivityStreamDirectMessageConversationEventDTO {
  // [JsonProperty("created_timestamp")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public CreatedAt: DateTimeOffset;

  // [JsonProperty("sender_id")]
  public SenderId: number;

  // [JsonProperty("target")]
  public Target: ActivityStreamTargetRecipientDTO;

  // [JsonProperty("last_read_event_id")]
  public LastReadEventId: string;
}
