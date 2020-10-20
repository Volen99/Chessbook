export class DisconnectMessage implements IDisconnectMessage {
  // [JsonProperty("code")]
  public Code: number;

  // [JsonProperty("stream_name")]
  public StreamName: string;

  // [JsonProperty("reason")]
  public Reason: string;
}
