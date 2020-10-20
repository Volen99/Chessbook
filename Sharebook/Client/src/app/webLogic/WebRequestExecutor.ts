import {IWebRequestExecutor} from "../core/Core/Web/IWebRequestExecutor";
import {ITwitterExceptionFactory} from "../core/Public/Exceptions/TwitterException";
import {IHttpClientWebHelper} from '../core/Core/Helpers/IHttpClientWebHelper';
import {ITwitterResponse} from "../core/Core/Web/ITwitterResponse";
import {ITwitterRequest} from "../core/Public/Models/Interfaces/ITwitterRequest";
import {ITwitterClientHandler} from "../core/Core/Web/ITwitterClientHandler";
import {HttpResponseMessage} from "../core/Core/Web/HttpResponseMessage";
import {Stream} from "stream";

// Generate a Token that can be used to perform OAuth queries
export class WebRequestExecutor implements IWebRequestExecutor {
  private readonly _twitterExceptionFactory: ITwitterExceptionFactory;
  private readonly _httpClientWebHelper: IHttpClientWebHelper;
  private readonly _webRequestResultFactory: IFactory<ITwitterResponse>;

  constructor(twitterExceptionFactory: ITwitterExceptionFactory, httpClientWebHelper: IHttpClientWebHelper,
              webRequestResultFactory: IFactory<ITwitterResponse>) {
    this._twitterExceptionFactory = twitterExceptionFactory;
    this._httpClientWebHelper = httpClientWebHelper;
    this._webRequestResultFactory = webRequestResultFactory;
  }

        // Simple Query
        public executeQueryAsync(request: ITwitterRequest, handler: ITwitterClientHandler = null): Promise<ITwitterResponse> {
            return this.ExecuteTwitterQuerySafelyAsync(request, async () => {
                let httpResponseMessage: HttpResponseMessage = null;
                try {
                    httpResponseMessage = await this._httpClientWebHelper.getHttpResponseAsync(request.query, handler); // .ConfigureAwait(false);

                    let result: ITwitterResponse = this.GetWebResultFromResponse(request.query.url, httpResponseMessage);

                    if (!result.isSuccessStatusCode) {
                        throw this._twitterExceptionFactory.create(result, request);
                    }

                    let stream = result.resultStream;

                    if (stream != null) {
                        result.binary = StreamToBinary(stream);
                        result.content = Encoding.UTF8.GetString(result.binary);
                    }

                    return result;
                } catch (Exception) {
                    httpResponseMessage?.Dispose();

                    throw Error;
                }
            });
        }

        // Multipart

        private static StreamToBinary(stream: Stream): number[] {
            if (stream == null) {
                return null;
            }

            let binary: number[];

            using (var tempMemStream = new MemoryStream())
            {
                byte[] buffer = new byte[128];

                while (true)
                {
                    int read = stream.Read(buffer, 0, buffer.Length);

                    if (read <= 0)
                    {
                        binary = tempMemStream.ToArray();
                        break;
                    }

                    tempMemStream.Write(buffer, 0, read);
                }
            }

            return binary;
        }

        public executeMultipartQueryAsync(request: ITwitterRequest): Promise<ITwitterResponse>
    {
            return ExecuteTwitterQuerySafelyAsync(request, async () =>
            {
                HttpResponseMessage httpResponseMessage = null;

                try
                {
                    httpResponseMessage = await _httpClientWebHelper.GetHttpResponseAsync(request.query).ConfigureAwait(false);

                    var result = GetWebResultFromResponse(request.query.url, httpResponseMessage);

                    var stream = result.ResultStream;

                    if (stream != null)
                    {
                        result.Binary = StreamToBinary(stream);
                        result.Content = Encoding.UTF8.GetString(result.Binary);
                    }

                    return result;
                }
                catch (Exception)
                {
                    httpResponseMessage?.Dispose();

                    throw;
                }
            });
        }

        // Helpers
        private  GetWebResultFromResponse(url: string, httpResponseMessage: HttpResponseMessage): ITwitterResponse {
            let stream = httpResponseMessage.Content.ReadAsStreamAsync().Result;

            let webRequestResult: ITwitterResponse = this._webRequestResultFactory.Create();

            webRequestResult.resultStream = stream;
            webRequestResult.statusCode = httpResponseMessage.StatusCode as number;

            const TON_API_SUCCESS_STATUS_CODE: number = 308;

            let isTonApiRequest = url.StartsWith("https://ton.twitter.com");
            let isTonApiRequestSuccess = httpResponseMessage.StatusCode as number === TON_API_SUCCESS_STATUS_CODE;

            webRequestResult.isSuccessStatusCode = httpResponseMessage.IsSuccessStatusCode || (isTonApiRequest && isTonApiRequestSuccess);

            webRequestResult.URL = url;
            webRequestResult.headers = httpResponseMessage.Headers.ToDictionary(x => x.Key, x => x.Value);

            return webRequestResult;
        }

        private async ExecuteTwitterQuerySafelyAsync<T>(request: ITwitterRequest, action: () => Promise<T>): Promise<T>
    {
            try
            {
                return await action().ConfigureAwait(false);
            }
            catch (AggregateException aex)
            {
                var webException = aex.InnerException as WebException;
                var httpRequestMessageException = aex.InnerException as HttpRequestException;
                var taskCanceledException = aex.InnerException as TaskCanceledException;

                if (httpRequestMessageException != null)
                {
                    webException = httpRequestMessageException.InnerException as WebException;
                }

                if (webException != null)
                {
                    throw _twitterExceptionFactory.Create(webException, request);
                }

                if (taskCanceledException != null)
                {
                    throw new TwitterTimeoutException(request);
                }

                throw;
            }
        }
    }
