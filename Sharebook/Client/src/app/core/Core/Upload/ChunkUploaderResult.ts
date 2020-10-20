import {ITwitterResult} from "../Web/TwitterResult";
import {IUploadInitModel} from "./UploadInitModel";
import {IMedia} from "../../Public/Models/Interfaces/IMedia";
import {IUploadedMediaInfo} from "../../Public/Models/Interfaces/DTO/IUploadedMediaInfo";

export interface IChunkUploadResult {
  init: ITwitterResult<IUploadInitModel>;
  appends: ITwitterResult[];
  finalize: ITwitterResult<IUploadedMediaInfo>;
  media: IMedia;
  successfullyUploaded: boolean;
}

export class ChunkUploadResult implements IChunkUploadResult {
  constructor() {
    this.appendsList = new Array<ITwitterResult>();
  }

  public appendsList: Array<ITwitterResult>;
  public init: ITwitterResult<IUploadInitModel>;

  get appends(): ITwitterResult[] {
    return this.appendsList;
  }

  public finalize: ITwitterResult<IUploadedMediaInfo>;

  get successfullyUploaded(): boolean {
    return this.finalize?.response?.isSuccessStatusCode === true;
  }

  public media: IMedia;
}
