import {ICustomRequestParameters, CustomRequestParameters} from "../../Public/Parameters/CustomRequestParameters";
import TimeSpan from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Time/TimeSpan";
import {IMediaUploadProgressChangedEventArgs} from "../../Public/Events/MediaUploadProgressChangedEventArgs";
import {InjectionToken} from "@angular/core";

export interface IChunkUploadAppendParameters {   // 23.09.2020, Wednesday, 22:06 | Deep Space Ambient Mix
  binary: number[];                               // 06.10.2020, Tuesday, 13:44 | 𝘧𝘭𝘰𝘳𝘢 𝘤𝘢𝘴𝘩 - 𝘠𝘰𝘶'𝘳𝘦 𝘚𝘰𝘮𝘦𝘣𝘰𝘥𝘺 𝘌𝘭𝘴𝘦 (𝘚𝘭𝘰𝘸𝘦𝘥 𝘋𝘰𝘸𝘯)
  mediaType: string;
  timeout?: TimeSpan;
  segmentIndex?: number;
  mediaId?: number;
  uploadProgressChanged: (IMediaUploadProgressChangedEventArgs) => void;
  customRequestParameters: ICustomRequestParameters;
}

export const IChunkUploadAppendParametersToken = new InjectionToken<IChunkUploadAppendParameters>('IChunkUploadAppendParameters', {
  providedIn: 'root',
  factory: () => new ChunkUploadAppendParameters(),
});

export class ChunkUploadAppendParameters implements IChunkUploadAppendParameters {
  constructor(binary: number[], mediaType: string, timeout?: TimeSpan) {
    this.binary = binary;
    this.mediaType = mediaType;
    this.timeout = timeout;
    this.customRequestParameters = new CustomRequestParameters();
  }

  public binary: number[];
  public mediaType: string;
  public timeout?: TimeSpan;
  public segmentIndex?: number;
  public mediaId?: number;
  public uploadProgressChanged: (IMediaUploadProgressChangedEventArgs) => void;
  public customRequestParameters: ICustomRequestParameters;
}
