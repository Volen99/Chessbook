namespace WorldFeed.Streams
{
    using System;
    using System.IO;
    using System.Net;
    using System.Net.Http;
    using System.Text;
    using System.Threading;
    using System.Threading.Tasks;

    using WorldFeed.Common.Events;
    using WorldFeed.Common.Exceptions.Public;
    using WorldFeed.Common.Extensions;
    using WorldFeed.Common.Helpers;
    using WorldFeed.Common.Public.Events;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Streaming.Enums;
    using HttpMethod = System.Net.Http.HttpMethod;

    public interface IStreamTaskFactory
    {
        IStreamTask Create(Func<string, bool> onJsonReceivedCallback, Func<ITwitterRequest> createTwitterRequest);
    }

    public class StreamTaskFactory : IStreamTaskFactory
    {
        private readonly ITwitterExceptionFactory twitterExceptionFactory;
        private readonly IHttpClientWebHelper httpClientWebHelper;

        public StreamTaskFactory(ITwitterExceptionFactory twitterExceptionFactory, IHttpClientWebHelper httpClientWebHelper)
        {
            this.twitterExceptionFactory = twitterExceptionFactory;
            this.httpClientWebHelper = httpClientWebHelper;
        }

        public IStreamTask Create(Func<string, bool> onJsonReceivedCallback, Func<ITwitterRequest> createTwitterRequest)
        {
            return new StreamTask(onJsonReceivedCallback, createTwitterRequest, this.twitterExceptionFactory, this.httpClientWebHelper);
        }
    }

    public class StreamTaskStateChangedEventArgs
    {
        public StreamTaskStateChangedEventArgs(StreamState state)
        {
            State = state;
        }

        public StreamState State { get; set; }

        public Exception Exception { get; set; }
    }

    public interface IStreamTask
    {
        event EventHandler StreamStarted;
        event EventHandler<StreamTaskStateChangedEventArgs> StreamStateChanged;
        event EventHandler KeepAliveReceived;

        StreamState StreamState { get; }

        Task StartAsync();
        void Resume();
        void Pause();
        void Stop();
    }

    public class StreamTask : IStreamTask
    {
        public event EventHandler StreamStarted;
        public event EventHandler<StreamTaskStateChangedEventArgs> StreamStateChanged;
        public event EventHandler KeepAliveReceived;

        // https://dev.twitter.com/streaming/overview/connecting#stalls
        private const int STREAM_DISCONNECTED_DELAY = 90000;
        private const int STREAM_RESUME_DELAY = 20;

        private readonly Func<string, bool> onJsonReceivedCallback;
        private readonly Func<ITwitterRequest> createTwitterRequest;
        private readonly ITwitterExceptionFactory twitterExceptionFactory;
        private readonly IHttpClientWebHelper httpClientWebHelper;

        private bool isNew;

        private ITwitterRequest twitterRequest;
        private StreamReader currentStreamReader;
        private HttpClient currentHttpClient;
        private int currentResponseHttpStatusCode = -1;

        public StreamTask(
            Func<string, bool> onJsonReceivedCallback,
            Func<ITwitterRequest> createTwitterRequest,
            ITwitterExceptionFactory twitterExceptionFactory,
            IHttpClientWebHelper httpClientWebHelper)
        {
            this.onJsonReceivedCallback = onJsonReceivedCallback;
            this.createTwitterRequest = createTwitterRequest;
            this.twitterExceptionFactory = twitterExceptionFactory;
            this.httpClientWebHelper = httpClientWebHelper;
            this.isNew = true;
        }

        public StreamState StreamState { get; private set; }

        public async Task StartAsync()
        {
            if (StreamState == StreamState.Stop && !this.isNew)
            {
                return;
            }

            this.Raise(StreamStarted);
            SetStreamState(StreamState.Running, null);

            this.twitterRequest = this.createTwitterRequest();

            if (this.twitterRequest.Query.TwitterCredentials == null)
            {
                throw new TwitterNullCredentialsException();
            }

            await RunStreamAsync().ConfigureAwait(false);
        }

        private async Task RunStreamAsync()
        {
            try
            {
                this.currentHttpClient = GetHttpClient(this.twitterRequest);
                this.currentStreamReader = await GetStreamReaderAsync(this.currentHttpClient, this.twitterRequest).ConfigureAwait(false);

                var numberOfRepeatedFailures = 0;

                while (StreamState != StreamState.Stop)
                {
                    if (StreamState == StreamState.Pause)
                    {
                        await Task.Delay(TimeSpan.FromMilliseconds(STREAM_RESUME_DELAY));
                        continue;
                    }

                    var json = await GetJsonResponseFromReaderAsync(this.currentStreamReader, this.twitterRequest).ConfigureAwait(false);

                    var isJsonResponseValid = json.IsMatchingJsonFormat();
                    if (!isJsonResponseValid)
                    {
                        if (json == string.Empty)
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

                    if (StreamState == StreamState.Running && !this.onJsonReceivedCallback(json))
                    {
                        SetStreamState(StreamState.Stop, null);
                        break;
                    }
                }
            }
            catch (Exception ex)
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
                this.currentStreamReader?.Dispose();
                this.currentHttpClient?.Dispose();
            }
        }

        private HttpClient GetHttpClient(ITwitterRequest request)
        {
            if (request.Query == null)
            {
                SetStreamState(StreamState.Stop, null);
                return null;
            }

            request.Query.Timeout = Timeout.InfiniteTimeSpan;

            var queryBeforeExecuteEventArgs = new BeforeExecutingRequestEventArgs(request.Query);
            request.ExecutionContext.Events.RaiseBeforeWaitingForQueryRateLimits(queryBeforeExecuteEventArgs);
            request.ExecutionContext.Events.RaiseBeforeExecutingQuery(queryBeforeExecuteEventArgs);

            if (queryBeforeExecuteEventArgs.Cancel)
            {
                SetStreamState(StreamState.Stop, null);
                return null;
            }

            return this.httpClientWebHelper.GetHttpClient(request.Query);
        }

        private async Task<StreamReader> GetStreamReaderAsync(HttpClient client, ITwitterRequest request)
        {
            try
            {
                var twitterQuery = request.Query;
                var uri = new Uri(twitterQuery.Url);
                var endpoint = uri.GetEndpointURL();
                var queryParameters = "";

                if (uri.Query.Length >  0)
                {
                    queryParameters = uri.Query.Remove(0, 1);
                }

                var httpMethod = new HttpMethod(twitterQuery.HttpMethod.ToString());

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
                    httpRequestMessage = new HttpRequestMessage(httpMethod, twitterQuery.Url);
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

        private static async Task<string> GetJsonResponseFromReaderAsync(StreamReader reader, ITwitterRequest request)
        {
            var requestTask = reader.ReadLineAsync();
            var resultingTask = await Task.WhenAny(requestTask, Task.Delay(STREAM_DISCONNECTED_DELAY)).ConfigureAwait(false);

            var timedOut = resultingTask != requestTask;
            if (timedOut)
            {
#pragma warning disable 4014
                requestTask.ContinueWith(json =>
#pragma warning restore 4014
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

        private bool TryHandleInvalidResponse(int numberOfRepeatedFailures)
        {
            if (numberOfRepeatedFailures == 0)
            {
                return true;
            }

            if (numberOfRepeatedFailures == 1)
            {
                this.currentStreamReader.Dispose();
                this.currentStreamReader = GetStreamReaderAsync(this.currentHttpClient, this.twitterRequest).Result;
                return true;
            }

            if (numberOfRepeatedFailures == 2)
            {
                this.currentStreamReader.Dispose();
                this.currentHttpClient.Dispose();

                this.currentHttpClient = GetHttpClient(this.twitterRequest);
                this.currentStreamReader = GetStreamReaderAsync(this.currentHttpClient, this.twitterRequest).Result;
                return true;
            }

            return false;
        }

        private Exception GetExceptionToThrow(Exception ex)
        {
            if (ex is AggregateException aex)
            {
                ex = aex.InnerException;
            }

            if (ex is WebException webException)
            {
                return this.twitterExceptionFactory.Create(webException, this.twitterRequest, this.currentResponseHttpStatusCode);
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
            this.currentStreamReader?.Dispose();
            this.currentHttpClient?.Dispose();

            SetStreamState(StreamState.Stop, null);
        }

        private void SetStreamState(StreamState state, Exception exception)
        {
            if (StreamState == state)
            {
                return;
            }

            if (this.isNew && state == StreamState.Running)
            {
                this.isNew = false;
            }

            StreamState = state;

            this.Raise(StreamStateChanged, new StreamTaskStateChangedEventArgs(state)
            {
                Exception = exception
            });
        }
    }
}
