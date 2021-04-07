import {IMediaEntitySize} from "./interfaces/IMediaEntitySize";

// Object storing information related with media size on Twitter
export class MediaEntitySize implements IMediaEntitySize {
  // [JsonProperty("w")]
  public width: number; // int?

  // [JsonProperty("h")]
  public height: number; // int?

  // [JsonProperty("resize")]
  public resize: string;
}
