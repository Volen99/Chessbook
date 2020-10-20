namespace Sharebook.Search.Extensions
{
    using System.Reflection;

    using Sharebook.Common.Attributes;
    using Sharebook.Search.Application.Parameters.Enums;

    public static class TweetSearchFiltersExtension
    {
        public static string GetQueryFilterName(this TweetSearchFilters tweetSearchFilters)
        {
            var field = tweetSearchFilters.GetType().GetField(tweetSearchFilters.ToString());
            var descriptionAttribute = (TweetSearchFilterAttribute)CustomAttributeExtensions.GetCustomAttribute(field, typeof(TweetSearchFilterAttribute));

            return descriptionAttribute != null ? descriptionAttribute.FilterName : tweetSearchFilters.ToString().ToLowerInvariant();
        }
    }
}
