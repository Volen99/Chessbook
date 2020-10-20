import {WarningMessage} from "./WarningMessage";

export class WarningMessageFallingBehind extends WarningMessage implements IWarningMessageFallingBehind
    {
        // [JsonProperty("percent_full")]
        public PercentFull: number;
    }
