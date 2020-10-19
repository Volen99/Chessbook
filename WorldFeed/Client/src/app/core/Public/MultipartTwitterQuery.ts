import {ITwitterQuery} from "./Models/Interfaces/ITwitterQuery";
import {TwitterQuery} from "./TwitterQuery";
import {HttpMethod} from "./Models/Enum/HttpMethod";
import InvalidOperationException from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Exceptions/InvalidOperationException";
import {ProgressableStreamContent} from "../Core/Upload/ProgressableStreamContent";
import {IUploadProgressChanged} from "./Events/UploadProgressChangedEventArgs";

export interface IMultipartTwitterQuery extends ITwitterQuery {
  // Binary to be send via HttpRequest
  binaries: number[][];    // byte[][]

  // Content Id
  contentId: string;

  // Action invoked to show the progress of the upload. {current / total}
  uploadProgressChanged: (uploadProgressChanged: IUploadProgressChanged) => void;
}

export class MultipartTwitterQuery extends TwitterQuery implements IMultipartTwitterQuery {
  private _binaries: number[][];

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

  get binaries(): number[][] {
    return this._binaries;
  }

  set binaries(value: number[][]) {
    this._binaries = value;
  }

  public contentId: string;

  public uploadProgressChanged: (uploadProgressChanged: IUploadProgressChanged) => void;

  get HttpContent(): HttpContent {
    return this.GetMultipartFormDataContent(this.contentId, this._binaries);
  }

  set HttpContent(value: HttpContent) {
    throw new InvalidOperationException("Multipart HttpContent is created based on the binaries of the MultipartRequest.");
  }

  public static CreateHttpContent(contentId: string, binaries: number[][]): MultipartFormDataContent {
    let multiPartContent = new MultipartFormDataContent();

    let i = 0;
    for (let binary of binaries) {
      let byteArrayContent = new ByteArrayContent(binary);
      byteArrayContent.Headers.Add("Content-Type", "application/octet-stream");
      multiPartContent.Add(byteArrayContent, contentId, i.toString(CultureInfo.InvariantCulture));
    }

    return multiPartContent;
  }

  private GetMultipartFormDataContent(contentId: string, binaries: number[][]): ProgressableStreamContent {
    let multiPartContent = this.CreateHttpContent(contentId, binaries);

    let progressableContent: ProgressableStreamContent = new ProgressableStreamContent(multiPartContent, undefined, (args) => {
      this.uploadProgressChanged(args);
    });

    return progressableContent;
  }

  private isMultipartTwitterQuery(source: ITwitterQuery | IMultipartTwitterQuery): source is MultipartTwitterQuery {
    return (source as IMultipartTwitterQuery).url !== undefined;
  }
}
