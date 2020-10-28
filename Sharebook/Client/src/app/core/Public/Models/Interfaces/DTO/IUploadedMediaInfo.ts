import {IUploadedImageDetails} from "./IUploadedImageDetails";
import {IUploadedVideoDetails} from "./IUploadedVideoDetails";
import {IUploadProcessingInfo} from "./IUploadProcessingInfo";
import DateTime from "../../../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Time/DateTime";

export interface IUploadedMediaInfo {
  createdDate: DateTime; // DateTimeOffset

  mediaId: number;
  mediaIdStr: string;
  mediaSize: number;

  imageDetails: IUploadedImageDetails;
  videoDetails: IUploadedVideoDetails;

  processingInfo: IUploadProcessingInfo;
}
