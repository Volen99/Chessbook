import {MessageEventDTO} from "../../../core/Core/DTO/Events/MessageEventDTO";

export class AccountActivityMessageCreatedEventDTO extends BaseAccountActivityMessageEventDTO
    {
        // [JsonProperty("direct_message_events")]
        public MessageEvents: MessageEventDTO[];
    }
