import {inject, Inject, InjectionToken} from "@angular/core";

import {ICustomRequestParameters, CustomRequestParameters} from "../../Public/Parameters/CustomRequestParameters";
import TimeSpan from "typescript-dotnet-commonjs/System/Time/TimeSpan";
import {AppInjector} from "../../../sharebook/Injectinvi/app-injector";

export interface IChunkUploadAppendParameters {   // 23.09.2020, Wednesday, 22:06 | Deep Space Ambient Mix
  binary: ArrayBuffer[];                          // 06.10.2020, Tuesday, 13:44 | 𝘧𝘭𝘰𝘳𝘢 𝘤𝘢𝘴𝘩 - 𝘠𝘰𝘶'𝘳𝘦 𝘚𝘰𝘮𝘦𝘣𝘰𝘥𝘺 𝘌𝘭𝘴𝘦 (𝘚𝘭𝘰𝘸𝘦𝘥 𝘋𝘰𝘸𝘯)
  mediaType: string;
  timeout: TimeSpan | null;
  segmentIndex: number | null;
  mediaId: number | null;
  uploadProgressChanged: (IMediaUploadProgressChangedEventArgs) => void;
  customRequestParameters: ICustomRequestParameters;
}

export const IChunkUploadAppendParametersToken = new InjectionToken<IChunkUploadAppendParameters>('IChunkUploadAppendParameters', {
  providedIn: 'root',
  factory: () => AppInjector.get(ChunkUploadAppendParameters),
});

export class ChunkUploadAppendParameters implements IChunkUploadAppendParameters {
  constructor(binary: ArrayBuffer[], mediaType: string, timeout?: TimeSpan) {
    this.binary = binary;
    this.mediaType = mediaType;
    this.timeout = timeout;
    this.customRequestParameters = new CustomRequestParameters();
  }

  public binary: ArrayBuffer[];
  public mediaType: string;
  public timeout: TimeSpan | null;
  public segmentIndex: number | null;
  public mediaId: number | null;
  public uploadProgressChanged: (IMediaUploadProgressChangedEventArgs) => void;
  public customRequestParameters: ICustomRequestParameters;
}
