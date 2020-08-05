namespace WorldFeed.Streams.Helpers
{
    using System;
    using System.Threading.Tasks;

    using WorldFeed.Common.Events;
    using WorldFeed.Common.Public.Events;
    using WorldFeed.Common.Public.Exceptions;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Streaming.Enums;
    using WorldFeed.Common.Public.Streaming.Events;
    using WorldFeed.Common.Streaming;
    using WorldFeed.Streams.Model;
    using WorldFeed.Streams.Properties;

    /// <summary>
    /// Extract objects from any kind of stream
    /// </summary>
    public class StreamResultGenerator : IStreamResultGenerator
    {
        public event EventHandler StreamStarted;
        public event EventHandler StreamResumed;
        public event EventHandler StreamPaused;
        public event EventHandler<StreamStoppedEventArgs> StreamStopped;
        public event EventHandler KeepAliveReceived;

        private IStreamTask currentStreamTask;
        private readonly IStreamTaskFactory streamTaskFactory;
        private readonly object lockStream = new object();

        public StreamResultGenerator(IStreamTaskFactory streamTaskFactory)
        {
            this.streamTaskFactory = streamTaskFactory;
        }

        private bool IsRunning => StreamState == StreamState.Running || StreamState == StreamState.Pause;

        public StreamState StreamState
        {
            get
            {
                lock (this.lockStream)
                {
                    if (this.currentStreamTask != null)
                    {
                        return this.currentStreamTask.StreamState;
                    }
                }

                return StreamState.Stop;
            }
        }

        public async Task StartAsync(Action<string> onJsonReceivedCallback, Func<ITwitterRequest> createTwitterRequest)
        {
            bool onJsonReceivedValidateCallback(string json)
            {
                onJsonReceivedCallback(json);
                return true;
            }

            await StartAsync(onJsonReceivedValidateCallback, createTwitterRequest).ConfigureAwait(false);
        }

        public async Task StartAsync(Func<string, bool> onJsonReceivedCallback, Func<ITwitterRequest> createTwitterRequest)
        {
            IStreamTask streamTask;

            lock (this.lockStream)
            {
                if (IsRunning)
                {
                    throw new OperationCanceledException(Resources.Stream_IllegalMultipleStreams);
                }

                if (onJsonReceivedCallback == null)
                {
                    throw new NullReferenceException(Resources.Stream_ObjectDelegateIsNull);
                }

                streamTask = this.streamTaskFactory.Create(onJsonReceivedCallback, createTwitterRequest);

                this.currentStreamTask = streamTask;
                this.currentStreamTask.StreamStarted += StreamTaskStarted;
                this.currentStreamTask.StreamStateChanged += StreamTaskStateChanged;
                this.currentStreamTask.KeepAliveReceived += KeepAliveReceived;
            }

            await streamTask.StartAsync().ConfigureAwait(false);
        }

        private void StreamTaskStarted(object sender, EventArgs eventArgs)
        {
            this.Raise(StreamStarted);
        }

        private void StreamTaskStateChanged(object sender, StreamTaskStateChangedEventArgs args)
        {
            var streamState = args.State;
            switch (streamState)
            {
                case StreamState.Running:
                    this.Raise(StreamResumed);
                    break;
                case StreamState.Pause:
                    this.Raise(StreamPaused);
                    break;
                case StreamState.Stop:
                    var streamStoppedEventArgs = new StreamStoppedEventArgs(args.Exception);

                    this.Raise(StreamStopped, streamStoppedEventArgs);
                    break;
            }
        }

        public void ResumeStream()
        {
            lock (this.lockStream)
            {
                this.currentStreamTask?.Resume();
            }
        }

        public void PauseStream()
        {
            lock (this.lockStream)
            {
                this.currentStreamTask?.Pause();
            }
        }

        public void StopStream()
        {
            lock (this.lockStream)
            {
                var stopEventArgs = StopStreamAndUnsubscribeFromEvents();
                this.Raise(StreamStopped, stopEventArgs);
            }
        }

        public void StopStream(Exception exception, IDisconnectMessage disconnectMessage)
        {
            lock (this.lockStream)
            {
                if (StreamState != StreamState.Stop)
                {
                    StopStreamAndUnsubscribeFromEvents();

                    if (exception is ITwitterTimeoutException && disconnectMessage == null)
                    {
                        disconnectMessage = new DisconnectMessage
                        {
                            Code = 503,
                            Reason = "Timeout"
                        };
                    }

                    var streamExceptionEventArgs = new StreamStoppedEventArgs(exception, disconnectMessage);
                    this.Raise(StreamStopped, streamExceptionEventArgs);
                }
            }
        }

        private StreamStoppedEventArgs StopStreamAndUnsubscribeFromEvents()
        {
            var streamTask = this.currentStreamTask;
            if (streamTask != null)
            {
                streamTask.StreamStarted -= StreamTaskStarted;
                streamTask.StreamStateChanged -= StreamTaskStateChanged;
                streamTask.KeepAliveReceived -= KeepAliveReceived;
                streamTask.Stop();

                if (this.currentStreamTask == streamTask)
                {
                    this.currentStreamTask = null;
                }

                return new StreamStoppedEventArgs();
            }

            return new StreamStoppedEventArgs(null);
        }
    }
}
