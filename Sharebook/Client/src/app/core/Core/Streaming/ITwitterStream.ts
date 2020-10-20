import List from "../../../c#-objects/TypeScript.NET-Core/packages/Core/source/Collections/List";
import { TweetMode } from '../../Public/Settings/TweetinviSettings';

export interface ITwitterStream
    {
        // The stream has been started.
        event EventHandler StreamStarted;

        // The stream has been resumed after being paused.
        event EventHandler StreamResumed;

        // The stream has been paused.
        event EventHandler StreamPaused;

        // The stream has been stopped. This can be due to an exception.
        // You can verify this with the exception infos provided in the event args.
        event EventHandler<StreamStoppedEventArgs> StreamStopped;

        // A keep-alive message has been received.
        // Twitter sends these every 30s so we know the stream's still working.
        event EventHandler KeepAliveReceived;

        // A tweet has been deleted.
        event EventHandler<TweetDeletedEvent> TweetDeleted;

        // The location information of a tweet has been deleted.
        event EventHandler<TweetLocationDeletedEventArgs> TweetLocationInfoRemoved;

        // The stream has been disconnected. This is different from being stopped
        // as it is the Twitter stream endpoint that let you know that they are disconnecting
        // you from any reason available in the event args.
        event EventHandler<DisconnectedEventArgs> DisconnectMessageReceived;

        // A tweet matching your criteria has been identified by the stream api but it
        // could not be received because it has been forbidden in your country.
        event EventHandler<TweetWitheldEventArgs> TweetWitheld;

        // A user matching your criteria has been identified by the stream api but it
        // could not be received because he was blocked in your country.
        event EventHandler<UserWitheldEventArgs> UserWitheld;

        // Your stream has too broad parameters that result in receiving > 1% of the total tweets.
        // You can identify the number of tweets that Twitter has not sent to you in the event args.
        event EventHandler<LimitReachedEventArgs> LimitReached;

        /// <summary>
        /// Inform the user that the stream is not read fast enough and that if this continues,
        /// the stream will be disconnected when the buffered queue is full.
        ///
        /// The StallWarning parameter needs to be set to true for this event to be raised.
        /// </summary>
        event EventHandler<WarningFallingBehindEventArgs> WarningFallingBehindDetected;

        // An event that is not handled by Tweetinvi have just been received!
        event EventHandler<UnsupportedMessageReceivedEvent> UnmanagedEventReceived;

        // Informs that we have received some json from the Twitter stream.
        event EventHandler<StreamEventReceivedArgs> EventReceived;

        // Decide whether to use Extended or Compat mode
      TweetMode?: TweetMode;

        // Get the current state of the stream
        StreamState: StreamState

        // Resume a stopped Stream
         Resume(): void

        // Pause a running Stream
         Pause(): void

        // Stop a running or paused stream
         Stop(): void

        // Languages that you want to receive. If empty all languages will be matched.
        LanguageFilters: string[]

      // Add a language that you want the tweets to be filtered by.
         AddLanguageFilter(language: string): void

        // Add a language that you want the tweets to be filtered by.
         AddLanguageFilter(language: LanguageFilter): void

        // Tweets with the specified language will no longer be received.
         RemoveLanguageFilter(language: string): void

        // Tweets with the specified language will no longer be received.
         RemoveLanguageFilter(language: LanguageFilter): void

        // No filter on the languages will be applied.
         ClearLanguageFilters(): void

        // Give you information regarding your connection. Twitter could let you know
        // if the processing of the stream is too slow or if the connection is about to be dropped.
      StallWarnings?: boolean

        // Filter tweets containing violence, sex or any sensible subjects.
      FilterLevel?: StreamFilterLevel

        // Custom parameters that will be appended to the stream query url.
      CustomQueryParameters: List<Tuple<string, string>>

        // A formatted version of the custom query parameters.
         FormattedCustomQueryParameters: string

      ExecutionContext: ITwitterExecutionContext

        // Append a custom query parameter to the query url.
         AddCustomQueryParameter(name: string, value: string): void

        // Remove all custom query parameters.
         ClearCustomQueryParameters(): void
    }
