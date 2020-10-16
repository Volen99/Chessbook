import {IUploadProcessingError} from "../../Public/Models/Interfaces/DTO/IUploadProcessingError";

export class UploadProcessingError implements IUploadProcessingError {
  // [JsonProperty("code")];
  public code: number;

  // [JsonProperty("name")];
  public name: string;

  // [JsonProperty("message")];
  public message: string;
}
