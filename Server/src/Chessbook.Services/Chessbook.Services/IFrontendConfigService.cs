namespace Chessbook.Services
{
    /// <summary>
    /// Frontend environment configuration service.
    /// </summary>
    public interface IFrontendConfigService
    {
        /// <summary>
        /// Searches for index.html frontend file and updates its contents to have the correct configuration options.
        /// </summary>
        string GetConfiguredIndexContent(string wwwRootPath);
    }
}
