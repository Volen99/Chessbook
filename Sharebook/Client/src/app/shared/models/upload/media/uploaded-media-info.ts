import {IUploadedImageDetails} from "../uploaded-image-details";
import {IUploadedVideoDetails} from "../uploaded-video-details";
import {IUploadProcessingInfo} from "../upload-processing-info";

export interface IUploadedMediaInfo {
  createdDate: Date; // DateTimeOffset

  mediaId: number;
  mediaIdStr: string;
  mediaSize: number;

  imageDetails: IUploadedImageDetails;
  videoDetails: IUploadedVideoDetails;

  processingInfo: IUploadProcessingInfo;
}

export class UploadedMediaInfo implements IUploadedMediaInfo {
  constructor() {
    this.createdDate =  new Date();
  }

  // [JsonIgnore]
  public createdDate: Date; // DateTimeOffset;

  // [JsonProperty("media_id")]
  public mediaId: number;

  // [JsonProperty("media_id_string")]
  public mediaIdStr: string;

  // [JsonProperty("size")]
  public mediaSize: number;

  // [JsonProperty("image")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public imageDetails: IUploadedImageDetails;

  // [JsonProperty("video")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public videoDetails: IUploadedVideoDetails;

  // [JsonProperty("processing_info")]
  // [JsonConverter(typeof(JsonPropertyConverterRepository))]
  public processingInfo: IUploadProcessingInfo;
}
