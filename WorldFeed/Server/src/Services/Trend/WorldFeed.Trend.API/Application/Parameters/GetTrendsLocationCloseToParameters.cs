namespace WorldFeed.Trend.Application.Parameters
{
    using WorldFeed.Common.Public.Models;
    using WorldFeed.Common.Public.Models.Interfaces;

    /// <summary>
    /// For more information read : https://developer.twitter.com/en/docs/trends/locations-with-trending-topics/api-reference/get-trends-closest
    /// </summary>
    public interface IGetTrendsLocationCloseToParameters : ICustomRequestParameters
    {
        /// <summary>
        /// Coordinates from where to search trends
        /// </summary>
        ICoordinates Coordinates { get; set; }
    }

    /// <inheritdoc />
    public class GetTrendsLocationCloseToParameters : CustomRequestParameters, IGetTrendsLocationCloseToParameters
    {
        public GetTrendsLocationCloseToParameters(double latitude, double longitude) : this(new Coordinates(latitude, longitude))
        {
        }

        public GetTrendsLocationCloseToParameters(ICoordinates coordinates)
        {
            Coordinates = coordinates;
        }

        /// <inheritdoc />
        public ICoordinates Coordinates { get; set; }
    }
}
