namespace WorldFeed.Trend.Application.Parameters
{
    using WorldFeed.Common.Public.Parameters;

    /// <summary>
    /// https://developer.twitter.com/en/docs/trends/locations-with-trending-topics/api-reference/get-trends-available
    /// </summary>
    public interface IGetTrendsLocationParameters : ICustomRequestParameters
    {
    }

    /// <inheritdoc />
    public class GetTrendsLocationParameters : CustomRequestParameters, IGetTrendsLocationParameters
    {
    }
}
