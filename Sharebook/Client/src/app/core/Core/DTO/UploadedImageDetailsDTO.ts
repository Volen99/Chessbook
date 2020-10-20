import {IUploadedImageDetails} from "../../Public/Models/Interfaces/DTO/IUploadedImageDetails";

export class UploadedImageDetailsDTO implements IUploadedImageDetails {
  // [JsonProperty("w")]
  public width?: number;

  // [JsonProperty("h")]
  public height?: number;

  // [JsonProperty("image_type")]
  public imageType: string;
}
