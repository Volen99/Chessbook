import {IUploadedImageDetails} from "./IUploadedImageDetails";
import {IUploadedVideoDetails} from "./IUploadedVideoDetails";
import {IUploadProcessingInfo} from "./IUploadProcessingInfo";
import DateTime from "typescript-dotnet-commonjs/System/Time/DateTime";

export interface IUploadedMediaInfo {
  createdDate: DateTime; // DateTimeOffset

  mediaId: number;
  mediaIdStr: string;
  mediaSize: number;

  imageDetails: IUploadedImageDetails;
  videoDetails: IUploadedVideoDetails;

  processingInfo: IUploadProcessingInfo;
}
