import {IUploadedMediaInfo} from "../../../../../../../shared/models/upload/media/uploaded-media-info";
import {IUploadInitModel} from "./upload-init-model";
import {IMedia} from "../../../../../../../shared/models/upload/media/media";

export interface IChunkUploadResult {
  init: IUploadInitModel;
  appends: [];
  finalize: IUploadedMediaInfo;
  media: IMedia;
  successfullyUploaded: boolean;
}

export class ChunkUploadResult implements IChunkUploadResult {
  constructor() {
    this.appendsList = [];
  }

  public appendsList: [];
  public init: IUploadInitModel;

  get appends(): [] {
    return this.appendsList;
  }

  public finalize: IUploadedMediaInfo;

  get successfullyUploaded(): boolean {
    return true; // this.finalize?.response?.isSuccessStatusCode === true;
  }

  public media: IMedia;
}
