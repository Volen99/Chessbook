namespace WorldFeed.Message.Infrastructure.Inject
{
    /// <summary>
    /// Module used to initialize Tweetinvi dependency injection
    /// </summary>
    public interface IMessageModule
    {
        /// <summary>
        /// Initialize the module registration.
        /// </summary>
        void Initialize(IMessageContainer container);
    }
}
