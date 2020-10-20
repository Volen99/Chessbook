import {IUploadedMediaInfo} from "../../Public/Models/Interfaces/DTO/IUploadedMediaInfo";
import DateTime from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Time/DateTime";
import {IUploadedImageDetails} from "../../Public/Models/Interfaces/DTO/IUploadedImageDetails";
import {IUploadedVideoDetails} from "../../Public/Models/Interfaces/DTO/IUploadedVideoDetails";
import {IUploadProcessingInfo} from "../../Public/Models/Interfaces/DTO/IUploadProcessingInfo";

export class UploadedMediaInfo implements IUploadedMediaInfo {
  constructor() {
    this.createdDate = DateTime.now;
  }

  // [JsonIgnore]
  public createdDate: DateTime; // DateTimeOffset;

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
