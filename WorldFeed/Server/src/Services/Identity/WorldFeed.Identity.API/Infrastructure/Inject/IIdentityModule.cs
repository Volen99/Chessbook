namespace WorldFeed.Identity.API.Infrastructure.Inject
{
    /// <summary>
    /// Module used to initialize Identity dependency injection
    /// </summary>
    public interface IIdentityModule
    {
        /// <summary>
        /// Initialize the module registration.
        /// </summary>
        void Initialize(IIdentityContainer container);
    }
}
