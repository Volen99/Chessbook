import {inject, Inject, InjectionToken} from "@angular/core";

import {IChunkUploadResult} from "./ChunkUploaderResult";
import {IChunkUploadInitParameters} from "./ChunkUploadInitParameters";
import {ITwitterRequest} from "../../Public/Models/Interfaces/ITwitterRequest";
import {IChunkUploadAppendParameters} from "./ChunkUploadAppendParameters";
import {ICustomRequestParameters} from "../../Public/Parameters/CustomRequestParameters";
import {ChunkedUploader} from "../../../controllers/Upload/ChunkedUploader";
import {UploadQueryGenerator} from "../../../controllers/Upload/UploadQueryGenerator";
import {Media} from "../Models/Media";
import {TwitterAccessor} from "../../../Tweetinvi.Credentials/TwitterAccessor";
import Dictionary from "typescript-dotnet-commonjs/System/Collections/Dictionaries/Dictionary";

export interface IChunkedUploader {
  mediaId?: number;

  nextSegmentIndex: number;

  uploadedSegments: Dictionary<number, number[]>;

  result: IChunkUploadResult;

  initAsync(initParameters: IChunkUploadInitParameters, request: ITwitterRequest): Promise<boolean>;

  appendAsync(parameters: IChunkUploadAppendParameters, request: ITwitterRequest): Promise<boolean>;

  finalizeAsync(customRequestParameters: ICustomRequestParameters, request: ITwitterRequest): Promise<boolean>;
}

export const IChunkedUploaderToken = new InjectionToken<IChunkedUploader>('IChunkedUploader', {
  providedIn: 'root',
  factory: () => new ChunkedUploader(inject(TwitterAccessor), inject(UploadQueryGenerator), inject(Media)),
});
