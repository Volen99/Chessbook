namespace WorldFeed.Book.Infrastructure.Inject
{
    /// <summary>
    /// Module used to initialize Tweetinvi dependency injection
    /// </summary>
    public interface IBookModule
    {
        /// <summary>
        /// Initialize the module registration.
        /// </summary
        void Initialize(IBookContainer container);
    }
}
