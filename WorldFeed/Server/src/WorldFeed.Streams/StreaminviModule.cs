namespace WorldFeed.Streams
{
    using WorldFeed.Common.InjectWorldFeed;
    using WorldFeed.Common.Public.Streaming;
    using WorldFeed.Common.Public.Streaming.Events;
    using WorldFeed.Common.Public.Streaming.Webhooks;
    using WorldFeed.Common.Streaming;
    using WorldFeed.Streams.Helpers;
    using WorldFeed.Streams.Model;
    using WorldFeed.Streams.Webhooks;

    public class StreaminviModule : ITweetinviModule
    {
        public void Initialize(ITweetinviContainer container)
        {
            container.RegisterType<ITweetStream, TweetStream>();
            container.RegisterType<ISampleStream, SampleStream>();
            container.RegisterType<ITrackedStream, TrackedStream>();
            container.RegisterType<IFilteredStream, FilteredStream>();

            container.RegisterType<AccountActivityStream, AccountActivityStream>();
            container.RegisterType<IAccountActivityStream, AccountActivityStream>();

            container.RegisterType<IFilterStreamTweetMatcher, FilterStreamTweetMatcher>();
            container.RegisterType<IFilterStreamTweetMatcherFactory, FilterStreamTweetMatcherFactory>(RegistrationLifetime.InstancePerApplication);

            container.RegisterType<IWarningMessage, WarningMessage>();
            container.RegisterType<IWarningMessageTooManyFollowers, WarningMessageTooManyFollowers>();
            container.RegisterType<IWarningMessageFallingBehind, WarningMessageFallingBehind>();

            container.RegisterType<IStreamTask, StreamTask>();
            container.RegisterType<IStreamResultGenerator, StreamResultGenerator>();

            container.RegisterGeneric(typeof(IStreamTrackManager<>), typeof(StreamTrackManager<>));

            container.RegisterType<IWebhookDispatcher, WebhookDispatcher>();
            container.RegisterType<IStreamTaskFactory, StreamTaskFactory>(RegistrationLifetime.InstancePerApplication);
        }
    }
}
