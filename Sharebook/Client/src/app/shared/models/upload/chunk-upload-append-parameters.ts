import {CustomRequestParameters, ICustomRequestParameters} from "../query/custom-request-parameters";
import {TimeSpan} from "../../../compose/upload/shared/timespan";

export interface IChunkUploadAppendParameters {   // 23.09.2020, Wednesday, 22:06 | Deep Space Ambient Mix
  binary: Uint8Array;                          // 06.10.2020, Tuesday, 13:44 | 𝘧𝘭𝘰𝘳𝘢 𝘤𝘢𝘴𝘩 - 𝘠𝘰𝘶'𝘳𝘦 𝘚𝘰𝘮𝘦𝘣𝘰𝘥𝘺 𝘌𝘭𝘴𝘦 (𝘚𝘭𝘰𝘸𝘦𝘥 𝘋𝘰𝘸𝘯)
  mediaType: string;
  timeout: TimeSpan | null;
  segmentIndex: number | null;
  mediaId: number | null;
  uploadProgressChanged: (IMediaUploadProgressChangedEventArgs) => void;
  customRequestParameters: ICustomRequestParameters;
}

export class ChunkUploadAppendParameters implements IChunkUploadAppendParameters {
  constructor(binary: Uint8Array, mediaType: string, timeout?: TimeSpan) {
    this.binary = binary;
    this.mediaType = mediaType;
    this.timeout = timeout;
    this.customRequestParameters = new CustomRequestParameters();
  }

  public binary: Uint8Array;
  public mediaType: string;
  public timeout: TimeSpan | null;
  public segmentIndex: number | null;
  public mediaId: number | null;
  public uploadProgressChanged: (IMediaUploadProgressChangedEventArgs) => void;
  public customRequestParameters: ICustomRequestParameters;
}
