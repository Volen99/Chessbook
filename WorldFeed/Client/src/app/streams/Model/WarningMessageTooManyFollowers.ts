import {WarningMessage} from "./WarningMessage";

export class WarningMessageTooManyFollowers extends WarningMessage implements IWarningMessageTooManyFollowers
    {
        // [JsonProperty("user_id")]
        public UserId: number;

        // [JsonProperty("timestamp_ms")]
        public TimestampInMs: string;
    }
}
