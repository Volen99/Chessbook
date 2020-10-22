import {IChunkUploadInitParameters} from "../Upload/ChunkUploadInitParameters";
import {IChunkUploadAppendParameters} from "../Upload/ChunkUploadAppendParameters";
import {ICustomRequestParameters} from "../../Public/Parameters/CustomRequestParameters";
import {InjectionToken} from "@angular/core";
import {UploadQueryGenerator} from "../../../controllers/Upload/UploadQueryGenerator";

export interface IUploadQueryGenerator {
  getChunkedUploadInitQuery(chunkUploadInitParameters: IChunkUploadInitParameters): string;

  getChunkedUploadAppendQuery(parameters: IChunkUploadAppendParameters): string;

  getChunkedUploadFinalizeQuery(mediaId: number, customRequestParameters: ICustomRequestParameters): string;
}

export const IUploadQueryGeneratorToken = new InjectionToken<IUploadQueryGenerator>('IUploadQueryGenerator', {
  providedIn: 'root',
  factory: () => new UploadQueryGenerator(),
});
