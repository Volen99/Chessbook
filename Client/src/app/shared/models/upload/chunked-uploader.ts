import {IChunkUploadInitParameters} from "./chunk-upload-init-parameters";
import {IChunkUploadAppendParameters} from "./chunk-upload-append-parameters";
import {ICustomRequestParameters} from "../query/custom-request-parameters";
import {IChunkUploadResult} from "../../../pages/modal-overlays/dialog/compose/upload/chunked-upload/core/chunk-uploader-result";

export interface IChunkedUploader {
  mediaId?: number;

  nextSegmentIndex: number;

  uploadedSegments: Map<number, Uint8Array>;

  result: IChunkUploadResult;

  initAsync(initParameters: IChunkUploadInitParameters): Promise<boolean>;

  appendAsync(parameters: IChunkUploadAppendParameters): Promise<boolean>;

  finalizeAsync(customRequestParameters: ICustomRequestParameters): Promise<boolean>;
}
