
    import {IStreamResultGenerator} from "../../core/Core/Streaming/IStreamResultGenerator";
    import {Action, Func} from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/FunctionTypes";
    import {ITwitterRequest} from "../../core/Public/Models/Interfaces/ITwitterRequest";
    import Exception from "../../c#-objects/TypeScript.NET-Core/packages/Core/source/Exception";

    // Extract objects from any kind of stream
    export class StreamResultGenerator implements IStreamResultGenerator
    {
        public event EventHandler StreamStarted;
        public event EventHandler StreamResumed;
        public event EventHandler StreamPaused;
        public event EventHandler<StreamStoppedEventArgs> StreamStopped;
        public event EventHandler KeepAliveReceived;

        private _currentStreamTask: IStreamTask;
        private readonly _streamTaskFactory: IStreamTaskFactory;
        private readonly _lockStream: object = new Object();

        constructor(streamTaskFactory: IStreamTaskFactory)
        {
            this._streamTaskFactory = streamTaskFactory;
        }

        get IsRunning(): boolean {
          return this.StreamState === this.StreamState.Running || this.StreamState === this.StreamState.Pause;
        }

      get StreamState(): StreamState {
        lock(this._lockStream);
        {
          if (this._currentStreamTask != null) {
            return this._currentStreamTask.StreamState;
          }
        }

        return this.StreamState.Stop;
      }

        public async  StartAsync(onJsonReceivedCallback: Action<string>, createTwitterRequest: Func<ITwitterRequest>): Promise<void>
        {
            bool onJsonReceivedValidateCallback(string json)
            {
                onJsonReceivedCallback(json);
                return true;
            }

            await StartAsync(onJsonReceivedValidateCallback, createTwitterRequest).ConfigureAwait(false);
        }

        public async  StartAsync(onJsonReceivedCallback: Func<string, boolean>, createTwitterRequest: Func<ITwitterRequest>): Promise<void>
        {
            IStreamTask streamTask;

            lock (_lockStream)
            {
                if (IsRunning)
                {
                    throw new OperationCanceledException(Resources.Stream_IllegalMultipleStreams);
                }

                if (onJsonReceivedCallback == null)
                {
                    throw new NullReferenceException(Resources.Stream_ObjectDelegateIsNull);
                }

                streamTask = _streamTaskFactory.Create(onJsonReceivedCallback, createTwitterRequest);

                _currentStreamTask = streamTask;
                _currentStreamTask.StreamStarted += StreamTaskStarted;
                _currentStreamTask.StreamStateChanged += StreamTaskStateChanged;
                _currentStreamTask.KeepAliveReceived += KeepAliveReceived;
            }

            await streamTask.StartAsync().ConfigureAwait(false);
        }

        private  StreamTaskStarted(sender: object, eventArgs: EventArgs): void
        {
            this.Raise(StreamStarted);
        }

        private  StreamTaskStateChanged(sender: object, args: StreamTaskStateChangedEventArgs): void
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

        public  ResumeStream(): void
        {
            lock (_lockStream)
            {
                this._currentStreamTask?.Resume();
            }
        }

        public  PauseStream(): void
        {
            lock (_lockStream)
            {
                this._currentStreamTask?.Pause();
            }
        }

        public  StopStream(): void
        {
            lock (_lockStream)
            {
                var stopEventArgs = StopStreamAndUnsubscribeFromEvents();
                this.Raise(StreamStopped, stopEventArgs);
            }
        }

        public  StopStream(exception: Exception, disconnectMessage: IDisconnectMessage): void
        {
            lock (this._lockStream)
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

        private  StopStreamAndUnsubscribeFromEvents(): StreamStoppedEventArgs
        {
            var streamTask = this._currentStreamTask;
            if (streamTask != null)
            {
                streamTask.StreamStarted -= StreamTaskStarted;
                streamTask.StreamStateChanged -= StreamTaskStateChanged;
                streamTask.KeepAliveReceived -= KeepAliveReceived;
                streamTask.Stop();

                if (this._currentStreamTask === streamTask)
                {
                    this._currentStreamTask = null;
                }

                return new StreamStoppedEventArgs();
            }

            return new StreamStoppedEventArgs(null);
        }
    }
