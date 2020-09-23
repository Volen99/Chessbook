namespace WorldFeed.Upload.Infrastructure.Inject.Contracts
{
    /// <summary>
    /// Module used to initialize Tweetinvi dependency injection
    /// </summary>
    public interface IUploadModule
    {
        /// <summary>
        /// Initialize the module registration.
        /// </summary>
        void Initialize(IUploadContainer container);
    }
}
