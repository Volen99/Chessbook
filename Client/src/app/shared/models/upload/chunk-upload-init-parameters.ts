import {CustomRequestParameters, ICustomRequestParameters} from "../query/custom-request-parameters";

export interface IChunkUploadInitParameters {
  mediaType: string;
  mediaCategory: string;
  totalBinaryLength: number;
  additionalOwnerIds: Array<number>;
  customRequestParameters: ICustomRequestParameters;
}

export class ChunkUploadInitParameters implements IChunkUploadInitParameters {
  constructor(mediaType: string) {
    this.mediaType = mediaType;
    this.additionalOwnerIds = new Array<number>();
    this.customRequestParameters = new CustomRequestParameters();
  }

  public mediaType: string;
  public mediaCategory: string;
  public totalBinaryLength: number;
  public additionalOwnerIds: Array<number>;
  public customRequestParameters: ICustomRequestParameters;
}
