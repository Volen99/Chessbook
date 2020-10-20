import {IUploadedVideoDetails} from "../../Public/Models/Interfaces/DTO/IUploadedVideoDetails";

export class UploadedVideoDetailsDTO implements IUploadedVideoDetails {
  // [JsonProperty("video_type")];
  public videoType: string;
}
