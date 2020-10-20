namespace Sharebook.Identity.API.Application.Parameters.HelpClient
{
    /// <summary>
    /// For more information read : https://developer.twitter.com/en/docs/developer-utilities/rate-limit-status/api-reference/get-application-rate_limit_status
    /// </summary>
    public interface IGetEndpointRateLimitsParameters : IGetRateLimitsParameters
    {
        /// <summary>
        /// Url for which you want to get the rate limit
        /// </summary>
        string Url { get; set; }
    }

    /// <inheritdoc/>
    public class GetEndpointRateLimitsParameters : GetRateLimitsParameters, IGetEndpointRateLimitsParameters
    {
        public GetEndpointRateLimitsParameters(string url)
        {
            this.Url = url;
        }

        public GetEndpointRateLimitsParameters(string url, RateLimitsSource from)
        {
            this.Url = url;
            base.From = from;
        }

        public GetEndpointRateLimitsParameters(IGetEndpointRateLimitsParameters source) : base(source)
        {
            this.Url = source?.Url;
        }

        /// <inheritdoc/>
        public string Url { get; set; }
    }
}