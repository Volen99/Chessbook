import ArgumentNullException from "src/app/c#-objects/TypeScript.NET-Core/packages/Core/source/Exceptions/ArgumentNullException";
import ArgumentOutOfRangeException from 'src/app/c#-objects/TypeScript.NET-Core/packages/Core/source/Exceptions/ArgumentOutOfRangeException';
import {Stream} from "stream";
import {IUploadProgressChanged, UploadProgressChangedEventArgs} from "../../Public/Events/UploadProgressChangedEventArgs";

// This code has been reusing the following code : https://stackoverflow.com/questions/41378457/c-httpclient-file-upload-progress-when-uploading-multiple-file-as-multipartfo
export class ProgressableStreamContent extends HttpContent {
  private readonly DEFAULT_BUFFER_SIZE: number = 5 * 4096;      // const

  private readonly _content: HttpContent;
  private readonly _bufferSize: number;
  private _progressChanged: () => IUploadProgressChanged;

  constructor(content: HttpContent, bufferSize?: number, progressChanged: () => IUploadProgressChanged) {
    super();

    if (!bufferSize) {
      bufferSize = this.DEFAULT_BUFFER_SIZE;
    }

    if (content == null) {
      throw new ArgumentNullException(nameof(content));
    }

    if (bufferSize <= 0) {
      throw new ArgumentOutOfRangeException(nameof(bufferSize));
    }

    this._content = content;
    this._bufferSize = bufferSize;
    this._progressChanged = progressChanged;

    for (let h of content.Headers) {
      Headers.Add(h.Key, h.Value);        // System.Net.Http
    }
  }

        protected async SerializeToStreamAsync(stream: Stream, context: TransportContext) {
            let result = await (async () => {
                let buffer = new Buffer(this._bufferSize);
                let uploaded: number = 0;

                let size = this.TryComputeLength();

                // using ()
                // {
                  let contentStream: Stream = await this._content.ReadAsStreamAsync().ConfigureAwait(false);
                    while (true) {
                        let length: number = contentStream.Read(buffer, 0, buffer.length);
                        if (length <= 0) {
                          break;
                        }

                        uploaded += length;
                        this._progressChanged?.Invoke(new UploadProgressChangedEventArgs(uploaded, size));

                        stream.Write(buffer, 0, length);
                        stream.Flush();
                    }
                //}

                stream.Flush();
            });
        }

        public GetLength(): number
        {
            this.TryComputeLength(out var length);
            return length;
        }

        protected TryComputeLength(out long length): boolean    // out length number
        {
            let length = this._content.Headers.ContentLength.GetValueOrDefault();
            return true;
        }

  protected Dispose(disposing: boolean): void {
    if (disposing) {
      this._content.Dispose();
      this._progressChanged = null;
    }

    super.Dispose(disposing);
  }
    }
