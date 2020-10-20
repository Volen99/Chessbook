namespace Sharebook.Search.Infrastructure.Inject.Contracts
{
    /// <summary>
    /// Module used to initialize Tweetinvi dependency injection
    /// </summary>
    public interface ISearchModule
    {
        /// <summary>
        /// Initialize the module registration.
        /// </summary>
        void Initialize(ISearchContainer container);
    }
}
