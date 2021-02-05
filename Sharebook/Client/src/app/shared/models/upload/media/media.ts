import {IUploadedMediaInfo} from "./uploaded-media-info";
import {Media} from "../../../../compose/upload/chunked-upload/core/media";

export interface IMedia {
  name: string;
  data: number[];
  id?: number;
  contentType: string;

  hasBeenUploaded: boolean;
  isReadyToBeUsed: boolean;

  uploadedMediaInfo: IUploadedMediaInfo;

  cloneWithoutMediaInfo(source: IMedia): IMedia;

  cloneWithoutUploadInfo(): IMedia;
}

