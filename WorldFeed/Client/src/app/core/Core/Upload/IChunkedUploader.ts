import Dictionary from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/Dictionaries/Dictionary";
import {IChunkUploadResult} from "./ChunkUploaderResult";
import {IChunkUploadInitParameters} from "./ChunkUploadInitParameters";
import {ITwitterRequest} from "../../Public/Models/Interfaces/ITwitterRequest";
import {IChunkUploadAppendParameters} from "./ChunkUploadAppendParameters";
import {ICustomRequestParameters} from "../../Public/Parameters/CustomRequestParameters";

export interface IChunkedUploader {
  mediaId?: number;

  nextSegmentIndex: number;

  uploadedSegments: Dictionary<number, number[]>;

  result: IChunkUploadResult;

  initAsync(initParameters: IChunkUploadInitParameters, request: ITwitterRequest): Promise<boolean>;

  appendAsync(parameters: IChunkUploadAppendParameters, request: ITwitterRequest): Promise<boolean>;

  finalizeAsync(customRequestParameters: ICustomRequestParameters, request: ITwitterRequest): Promise<boolean>;
}
