export class AccountActivityUserIsTypingMessageDTO extends BaseAccountActivityMessageEventDTO {
  // [JsonProperty("direct_message_indicate_typing_events")]
  public TypingEvents: ActivityStreamDirectMessageConversationEventDTO[];
}
