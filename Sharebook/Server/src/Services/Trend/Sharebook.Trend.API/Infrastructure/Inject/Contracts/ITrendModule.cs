namespace Sharebook.Trend.API.Infrastructure.Inject.Contracts
{
    /// <summary>
    /// Module used to initialize Tweetinvi dependency injection
    /// </summary>
    public interface ITrendModule
    {
        /// <summary>
        /// Initialize the module registration.
        /// </summary>
        void Initialize(ITrendContainer container);
    }
}
