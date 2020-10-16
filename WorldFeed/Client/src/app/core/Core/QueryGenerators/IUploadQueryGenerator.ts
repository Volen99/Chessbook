import {IChunkUploadInitParameters} from "../Upload/ChunkUploadInitParameters";
import {IChunkUploadAppendParameters} from "../Upload/ChunkUploadAppendParameters";
import {ICustomRequestParameters} from "../../Public/Parameters/CustomRequestParameters";

export interface IUploadQueryGenerator {
  getChunkedUploadInitQuery(chunkUploadInitParameters: IChunkUploadInitParameters): string;

  getChunkedUploadAppendQuery(parameters: IChunkUploadAppendParameters): string;

  getChunkedUploadFinalizeQuery(mediaId: number, customRequestParameters: ICustomRequestParameters): string;
}
