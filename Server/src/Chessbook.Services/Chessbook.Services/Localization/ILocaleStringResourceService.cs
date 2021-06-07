using System.Threading.Tasks;

namespace Chessbook.Services.Localization
{
    public interface ILocaleStringResourceService
    {
        /// <summary>
        /// Gets a resource string based on the specified ResourceKey property.
        /// </summary>
        /// <param name="resourceKey">A string representing a ResourceKey.</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains a string representing the requested resource string.
        /// </returns>
        Task<string> GetResourceAsync(string resourceKey);

        /// <summary>
        /// Gets a resource string based on the specified ResourceKey property.
        /// </summary>
        /// <param name="resourceKey">A string representing a ResourceKey.</param>
        /// <param name="languageId">Language identifier</param>
        /// <param name="logIfNotFound">A value indicating whether to log error if locale string resource is not found</param>
        /// <param name="defaultValue">Default value</param>
        /// <param name="returnEmptyIfNotFound">A value indicating whether an empty string will be returned if a resource is not found and default value is set to empty string</param>
        /// <returns>
        /// A task that represents the asynchronous operation
        /// The task result contains a string representing the requested resource string.
        /// </returns>
        Task<string> GetResourceAsync(string resourceKey, int languageId, bool logIfNotFound = true, string defaultValue = "", bool returnEmptyIfNotFound = false);

    }
}
