import {CustomRequestParameters, ICustomRequestParameters} from "../CustomRequestParameters";
import {IMediaMetadata} from "../../Models/Interfaces/DTO/IMediaMetadata";

// For more description visit : https://dev.twitter.com/en/docs/media/upload-media/api-reference/post-media-metadata-create
export interface IAddMediaMetadataParameters extends IMediaMetadata, ICustomRequestParameters {
}

export class AddMediaMetadataParameters extends CustomRequestParameters implements IAddMediaMetadataParameters {
  constructor(mediaId?: number) {
    super();

    this.mediaId = mediaId;
  }

  // [JsonProperty("media_id")]
  public mediaId?: number;

  // [JsonProperty("alt_text")]
  // [JsonConverter(typeof(JsonUploadMetadataAltTextConverter))]
  public altText: string;
}
