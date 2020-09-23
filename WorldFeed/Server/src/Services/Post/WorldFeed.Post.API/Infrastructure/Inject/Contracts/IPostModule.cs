namespace WorldFeed.Post.API.Infrastructure.Inject.Contracts
{
    /// <summary>
    /// Module used to initialize Tweetinvi dependency injection
    /// </summary>
    public interface IPostModule
    {
        /// <summary>
        /// Initialize the module registration.
        /// </summary>
        void Initialize(IPostContainer container);
    }
}
