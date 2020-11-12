import InvalidOperationException from "typescript-dotnet-commonjs/System/Exceptions/InvalidOperationException";

import {ITwitterQuery} from "./Models/Interfaces/ITwitterQuery";
import {TwitterQuery} from "./TwitterQuery";
import {HttpMethod} from "./Models/Enum/HttpMethod";
import {ProgressableStreamContent} from "../Core/Upload/ProgressableStreamContent";
import {IUploadProgressChanged} from "./Events/UploadProgressChangedEventArgs";
import {HttpHeaders} from "@angular/common/http";
import {HttpContent} from "./http-content";

export interface IMultipartTwitterQuery extends ITwitterQuery {
  // Binary to be send via HttpRequest
  binaries: number[][];    // byte[][]

  // Content Id
  contentId: string;

  // Action invoked to show the progress of the upload. {current / total}
  uploadProgressChanged: (uploadProgressChanged: IUploadProgressChanged) => void;
}

export class MultipartTwitterQuery extends TwitterQuery implements IMultipartTwitterQuery {
  private _binaries: ArrayBuffer[];

  constructor(source?: ITwitterQuery | IMultipartTwitterQuery) {
    if (source) {
      super(undefined, undefined, source);
      if (this.isMultipartTwitterQuery(source)) {
        this._binaries = source.binaries;
        this.contentId = source.contentId;
        this.uploadProgressChanged = source.uploadProgressChanged;

        return;
      }
    } else {
      super();
    }

    this.contentId = "media";
    this.httpMethod = HttpMethod.POST;
  }

  get binaries(): ArrayBuffer[] {
    return this._binaries;
  }

  set binaries(value: ArrayBuffer[]) {
    this._binaries = value;
  }

  public contentId: string;

  public uploadProgressChanged: (uploadProgressChanged: IUploadProgressChanged) => void;

  get HttpContent(): HttpContent {
    debugger
    return this.GetMultipartFormDataContent(this.contentId, this._binaries);
  }

  set HttpContent(value: HttpContent) {
    throw new InvalidOperationException("Multipart HttpContent is created based on the binaries of the MultipartRequest.");
  }

  public static CreateHttpContent(contentId: string, binaries: ArrayBuffer[]): any /*MultipartFormDataContent*/ {
    let multiPartContent = new HttpContent(); // new MultipartFormDataContent();

    let i = 0;
    debugger
    for (let binary of binaries) {
      multiPartContent.headers.set("Content-Type", "application/octet-stream");
      multiPartContent.binary = binary;
    }

    return multiPartContent;
  }

  private GetMultipartFormDataContent(contentId: string, binaries: ArrayBuffer[]): HttpContent {
     let multiPartContent = MultipartTwitterQuery.CreateHttpContent(contentId, binaries);

    // let progressableContent: ProgressableStreamContent = new ProgressableStreamContent(multiPartContent, (args) => {
    //   UploadProgressChanged?.Invoke(args);
    // });
    //
     return multiPartContent;
  }

  private isMultipartTwitterQuery(source: ITwitterQuery | IMultipartTwitterQuery): source is MultipartTwitterQuery {
    return (source as IMultipartTwitterQuery).url !== undefined;
  }
}
