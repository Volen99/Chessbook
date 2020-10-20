namespace Sharebook.Identity.API.Credentials.RateLimit
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Reflection;
    using System.Text.RegularExpressions;

    using Sharebook.Common.Attributes;
    using Sharebook.Common.Extensions;
    using Sharebook.Common.Helpers;
    using Sharebook.Common.Models;
    using Sharebook.Common.Public.Models.RateLimits;
    using Sharebook.Common.RateLimit;

    public class RateLimitHelper : IRateLimitHelper
    {
        private readonly IWebHelper webHelper;
        private readonly IAttributeHelper attributeHelper;

        public RateLimitHelper(IWebHelper webHelper, IAttributeHelper attributeHelper)
        {
            this.webHelper = webHelper;
            this.attributeHelper = attributeHelper;
        }

        public IEndpointRateLimit GetEndpointRateLimitFromQuery(string query, ICredentialsRateLimits rateLimits, bool createIfNotExist)
        {
            var queryBaseURL = this.webHelper.GetBaseURL(query);
            if (rateLimits == null || queryBaseURL == null)
            {
                return null;
            }

            var tokenAttributes = this.attributeHelper.GetAllPropertiesAttributes<ICredentialsRateLimits, TwitterEndpointAttribute>();
            var matchingAttribute = tokenAttributes.Keys.JustOneOrDefault(x => IsEndpointURLMatchingQueryURL(queryBaseURL, x));

            // In the default list of rate limits
            if (matchingAttribute != null)
            {
                var matchingProperty = tokenAttributes[matchingAttribute];
                return GetRateLimitFromProperty(matchingProperty, rateLimits);
            }

            // In the other endpoint rate limits
            var matchingKeyPair = rateLimits.OtherEndpointRateLimits.FirstOrDefault(x => IsEndpointURLMatchingQueryURL(queryBaseURL, x.Key));
            if (!matchingKeyPair.Equals(default(KeyValuePair<TwitterEndpointAttribute, IEndpointRateLimit>)))
            {
                return matchingKeyPair.Value;
            }

            if (!createIfNotExist)
            {
                return null;
            }

            // Other endpoint rate limits do not yet exist.
            // Therefore we create a new one and return it.
            var attribute = new TwitterEndpointAttribute(queryBaseURL);
            var endpointRateLimit = new EndpointRateLimit
            {
                IsCustomHeaderRateLimit = true
            };

            rateLimits.OtherEndpointRateLimits.Add(attribute, endpointRateLimit);

            return endpointRateLimit;
        }

        private IEndpointRateLimit GetRateLimitFromProperty(PropertyInfo propertyInfo, ICredentialsRateLimits rateLimits)
        {
            var rateLimit = propertyInfo.GetValue(rateLimits, null) as IEndpointRateLimit;
            return rateLimit;
        }

        private bool IsEndpointURLMatchingQueryURL(string queryURL, TwitterEndpointAttribute twitterEndpoint)
        {
            if (twitterEndpoint.IsRegex)
            {
                return Regex.IsMatch(queryURL, twitterEndpoint.EndpointURL);
            }
            else
            {
                return queryURL == twitterEndpoint.EndpointURL;
            }
        }
    }
}
