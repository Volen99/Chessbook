import {IUploadedMediaInfo} from "./DTO/IUploadedMediaInfo";

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
