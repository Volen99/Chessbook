﻿import {IMediaEntity} from "../../../Public/Models/Entities/IMediaEntity";
import Dictionary from "../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Dictionaries/Dictionary";
import {IMediaEntitySize} from "../../../Public/Models/Entities/IMediaEntitySize";
import {IVideoInformationEntity} from "../../../Public/Models/Entities/ExtendedEntities/IVideoInformationEntity";

// Object storing information related with a Media on Twitter
export class MediaEntity implements IMediaEntity {
  // [JsonProperty("id")]
  public id: number; // long?

  // [JsonProperty("id_str")]
  public idStr: string;

  // [JsonProperty("url")]
  public URL: string;

  // [JsonProperty("display_url")]
  public displayURL: string;

  // [JsonProperty("expanded_url")]
  public expandedURL: string;

  // [JsonProperty("media_url")]
  public mediaURL: string;

  // [JsonProperty("media_url_https")]
  public mediaURLHttps: string;

  // [JsonProperty("type")]
  public mediaType: string;

  // [JsonProperty("indices")]
  public indices: number[];

  // [JsonProperty("sizes")]
  public sizes: Dictionary<string, IMediaEntitySize>;

  // [JsonProperty("video_info")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public videoDetails: IVideoInformationEntity;

  public equals(other: IMediaEntity): boolean {
    if (this.id == null || other == null || this.id !== other.id) {
      return false;
    }

    if (this.indices == null || other.indices == null) {
      return this.indices === other.indices;
    }

    return this.indices.ContainsSameObjectsAs(other.indices, true);
  }
}