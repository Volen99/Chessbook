import {ITwitterRequest} from "../core/Public/Models/Interfaces/ITwitterRequest";
import {ITwitterExceptionFactory} from "../core/Public/Exceptions/TwitterException";
import {IHttpClientWebHelper} from "../core/Core/Helpers/IHttpClientWebHelper";
import {StreamState} from "../core/Public/Streaming/StreamState";
import Exception from '../c#-objects/TypeScript.NET-Core/packages/Core/source/Exception';
import {TwitterNullCredentialsException} from "../core/Public/Exceptions/TwitterNullCredentialsException";
import Timeout = NodeJS.Timeout;
import Uri from "../c#-objects/TypeScript.NET-Core/packages/Web/source/Uri/Uri";
import {TwitterTimeoutException} from "../core/Public/Exceptions/TwitterTimeoutException";
import TimeSpan from "../c#-objects/TypeScript.NET-Core/packages/Core/source/Time/TimeSpan";
import {WorldFeedConsts} from "../core/Public/worldFeed-consts";

// using HttpMethod = System.Net.Http.HttpMethod;

export interface IStreamTaskFactory {
  Create(onJsonReceivedCallback: (str: string) => boolean, createTwitterRequest: () => ITwitterRequest): IStreamTask;
}

export class StreamTaskFactory implements IStreamTaskFactory {
  private readonly _twitterExceptionFactory: ITwitterExceptionFactory;
  private readonly _httpClientWebHelper: IHttpClientWebHelper;

  constructor(twitterExceptionFactory: ITwitterExceptionFactory, httpClientWebHelper: IHttpClientWebHelper) {
    this._twitterExceptionFactory = twitterExceptionFactory;
    this._httpClientWebHelper = httpClientWebHelper;
  }

  public Create(onJsonReceivedCallback: (string) => boolean, createTwitterRequest: () => ITwitterRequest): IStreamTask {
    return new StreamTask(onJsonReceivedCallback, createTwitterRequest, this._twitterExceptionFactory, this._httpClientWebHelper);
  }
}

export class StreamTaskStateChangedEventArgs {
  constructor(state: StreamState) {
    this.State = state;
  }

  public State: StreamState;
  public Exception: Exception;
}

    export interface IStreamTask
    {
        event EventHandler StreamStarted;
        event EventHandler<StreamTaskStateChangedEventArgs> StreamStateChanged;
        event EventHandler KeepAliveReceived;

      StreamState: StreamState;

         StartAsync(): Task<void>
         Resume(): void;
         Pause(): void;
         Stop(): void;
    }

    export class StreamTask implements IStreamTask
    {
        public event EventHandler StreamStarted;
        public event EventHandler<StreamTaskStateChangedEventArgs> StreamStateChanged;
        public event EventHandler KeepAliveReceived;

        // https://dev.twitter.com/streaming/overview/connecting#stalls
        private static STREAM_DISCONNECTED_DELAY: number = 90000;
        private static STREAM_RESUME_DELAY: number = 20;

        private readonly _onJsonReceivedCallback: (string) => boolean;
        private readonly _createTwitterRequest: () => ITwitterRequest;
        private readonly _twitterExceptionFactory: ITwitterExceptionFactory;
        private readonly _httpClientWebHelper: IHttpClientWebHelper;

        private _isNew: boolean;

        private _twitterRequest: ITwitterRequest;
        private _currentStreamReader: StreamReader;
        private _currentHttpClient: HttpClient;
        private _currentResponseHttpStatusCode: number = -1;

        constructor(
          onJsonReceivedCallback: (string) => boolean,
          createTwitterRequest: () => ITwitterRequest,
          twitterExceptionFactory: ITwitterExceptionFactory,
          httpClientWebHelper: IHttpClientWebHelper)
        {
            this._onJsonReceivedCallback = onJsonReceivedCallback;
            this._createTwitterRequest = createTwitterRequest;
            this._twitterExceptionFactory = twitterExceptionFactory;
            this._httpClientWebHelper = httpClientWebHelper;
            this._isNew = true;
        }

        public StreamState: StreamState;

        public async  StartAsync(): Promise<void> {
            if (StreamState === StreamState.Stop && !this._isNew) {
                return;
            }

            this.Raise(StreamStarted);
            SetStreamState(StreamState.Running, null);

            this._twitterRequest = this._createTwitterRequest();

            if (this._twitterRequest.query.twitterCredentials == null) {
                throw new TwitterNullCredentialsException();
            }

            await RunStreamAsync().ConfigureAwait(false);
        }

        private async  RunStreamAsync(): Promise<void>
        {
            try
            {
                this._currentHttpClient = GetHttpClient(this._twitterRequest);
                this._currentStreamReader = await GetStreamReaderAsync(this._currentHttpClient, this._twitterRequest).ConfigureAwait(false);

                let numberOfRepeatedFailures = 0;

                while (StreamState != StreamState.Stop)
                {
                    if (StreamState == StreamState.Pause)
                    {
                        await Task.Delay(TimeSpan.FromMilliseconds(STREAM_RESUME_DELAY));
                        continue;
                    }

                    let json = await GetJsonResponseFromReaderAsync(_currentStreamReader, _twitterRequest).ConfigureAwait(false);

                    let isJsonResponseValid = json.IsMatchingJsonFormat();
                    if (!isJsonResponseValid)
                    {
                        if (json === WorldFeedConsts.EMPTY)
                        {
                            this.Raise(KeepAliveReceived);
                            continue;
                        }

                        if (json != null)
                        {
                            throw new WebException(json);
                        }

                        if (TryHandleInvalidResponse(numberOfRepeatedFailures))
                        {
                            ++numberOfRepeatedFailures;
                            continue;
                        }

                        throw new WebException("Stream cannot be read.");
                    }

                    numberOfRepeatedFailures = 0;

                    if (StreamState == StreamState.Running && !this._onJsonReceivedCallback(json))
                    {
                        SetStreamState(StreamState.Stop, null);
                        break;
                    }
                }
            }
            catch (ex: Exception)
            {
                var exceptionToThrow = GetExceptionToThrow(ex);
                SetStreamState(StreamState.Stop, exceptionToThrow);

                if (exceptionToThrow != null)
                {
                    throw exceptionToThrow;
                }
            }
            finally
            {
                this._currentStreamReader?.Dispose();
                this._currentHttpClient?.Dispose();
            }
        }

        private  GetHttpClient(request: ITwitterRequest): HttpClient {
            if (request.query == null)
            {
                SetStreamState(StreamState.Stop, null);
                return null;
            }

            request.query.timeout = Timeout.InfiniteTimeSpan;

            var queryBeforeExecuteEventArgs = new BeforeExecutingRequestEventArgs(request.query);
            request.executionContext.events.RaiseBeforeWaitingForQueryRateLimits(queryBeforeExecuteEventArgs);
            request.executionContext.events.RaiseBeforeExecutingQuery(queryBeforeExecuteEventArgs);

            if (queryBeforeExecuteEventArgs.Cancel)
            {
                SetStreamState(StreamState.Stop, null);
                return null;
            }

            return this._httpClientWebHelper.getHttpClient(request.query);
        }

        private async GetStreamReaderAsync(client: HttpClient, request: ITwitterRequest): Task<StreamReader>
    {
            try
            {
                let twitterQuery = request.query;
                let uri = new Uri(twitterQuery.url);
                let endpoint = uri.GetEndpointURL();
                let queryParameters = "";

                if (uri.Query.Length >  0)
                {
                    queryParameters = uri.Query.Remove(0, 1);
                }

                var httpMethod = new HttpMethod(twitterQuery.httpMethod.ToString());

                HttpRequestMessage httpRequestMessage;

                if (httpMethod == HttpMethod.Post)
                {
                    httpRequestMessage = new HttpRequestMessage(httpMethod, endpoint)
                    {
                        Content = new StringContent(queryParameters, Encoding.UTF8, "application/x-www-form-urlencoded")
                    };
                }
                else
                {
                    httpRequestMessage = new HttpRequestMessage(httpMethod, twitterQuery.url);
                }

                var response = await client.SendAsync(httpRequestMessage, HttpCompletionOption.ResponseHeadersRead).ConfigureAwait(false);
                var body = await response.Content.ReadAsStreamAsync().ConfigureAwait(false);

                return new StreamReader(body, Encoding.GetEncoding("utf-8"));
            }
            catch (Exception)
            {
                client?.Dispose();
                throw;
            }
        }

        private static async  GetJsonResponseFromReaderAsync(reader: StreamReader, request: ITwitterRequest): Promise<string>
        {
            var requestTask = reader.ReadLineAsync();
            var resultingTask = await Task.WhenAny(requestTask, Task.Delay(STREAM_DISCONNECTED_DELAY)).ConfigureAwait(false);

            var timedOut = resultingTask != requestTask;
            if (timedOut)
            {
// #pragma warning disable 4014
                requestTask.ContinueWith(json =>
// #pragma warning restore 4014
                {
                    // We want to ensure that we are properly handling request Tasks exceptions
                    // so that no scheduler actually receive any exception received.
                }, TaskContinuationOptions.OnlyOnFaulted);

                var twitterTimeoutException = new TwitterTimeoutException(request);
                throw twitterTimeoutException;
            }

            var jsonResponse = await requestTask.ConfigureAwait(false);
            return jsonResponse;
        }

        private  TryHandleInvalidResponse(numberOfRepeatedFailures: number): boolean
        {
            if (numberOfRepeatedFailures == 0)
            {
                return true;
            }

            if (numberOfRepeatedFailures == 1)
            {
                this._currentStreamReader.Dispose();
                this._currentStreamReader = GetStreamReaderAsync(_currentHttpClient, _twitterRequest).Result;
                return true;
            }

            if (numberOfRepeatedFailures == 2)
            {
                this._currentStreamReader.Dispose();
                this._currentHttpClient.Dispose();

                this._currentHttpClient = GetHttpClient(_twitterRequest);
                this._currentStreamReader = GetStreamReaderAsync(_currentHttpClient, _twitterRequest).Result;
                return true;
            }

            return false;
        }

        private  GetExceptionToThrow(ex: Exception): Exception
        {
            if (ex is AggregateException aex)
            {
                ex = aex.InnerException;
            }

            if (ex is WebException webException)
            {
                return _twitterExceptionFactory.Create(webException, _twitterRequest, _currentResponseHttpStatusCode);
            }

            var exceptionThrownBecauseStreamIsBeingStoppedByUser = ex is IOException && StreamState == StreamState.Stop;
            if (exceptionThrownBecauseStreamIsBeingStoppedByUser)
            {
                return null;
            }

            return ex;
        }

        public void Resume()
        {
            SetStreamState(StreamState.Running, null);
        }

        public void Pause()
        {
            SetStreamState(StreamState.Pause, null);
        }

        public void Stop()
        {
            _currentStreamReader?.Dispose();
            _currentHttpClient?.Dispose();

            SetStreamState(StreamState.Stop, null);
        }

        private  SetStreamState(state: StreamState, exception: Exception): void
        {
            if (StreamState == state)
            {
                return;
            }

            if (_isNew && state == StreamState.Running)
            {
                _isNew = false;
            }

            StreamState = state;

            this.Raise(StreamStateChanged, new StreamTaskStateChangedEventArgs(state)
            {
                Exception = exception
            });
        }
    }
