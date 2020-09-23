namespace WorldFeed.Profile.Infrastructure.Inject
{
    /// <summary>
    /// Module used to initialize Tweetinvi dependency injection
    /// </summary>
    public interface IProfileModule
    {
        /// <summary>
        /// Initialize the module registration.
        /// </summary>
        void Initialize(IProfileContainer container);
    }
}
