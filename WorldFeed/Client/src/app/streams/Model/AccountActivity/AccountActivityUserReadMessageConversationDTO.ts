import { ActivityStreamDirectMessageConversationEventDTO } from './ActivityStreamDirectMessageConversationEventDTO';

    export class AccountActivityUserReadMessageConversationDTO extends BaseAccountActivityMessageEventDTO
    {
        // [JsonProperty("direct_message_mark_read_events")]
        public MessageConversationReadEvents: ActivityStreamDirectMessageConversationEventDTO[];
    }
