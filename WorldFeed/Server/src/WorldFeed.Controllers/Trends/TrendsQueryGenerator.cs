namespace WorldFeed.Controllers.Trends
{
    using System.Text;

    using WorldFeed.Common.Extensions;
    using WorldFeed.Common.Public.Parameters.TrendsClient;
    using WorldFeed.Controllers.Properties;

    public interface ITrendsQueryGenerator
    {
        string GetTrendsAtQuery(IGetTrendsAtParameters parameters);

        string GetTrendsLocationQuery(IGetTrendsLocationParameters parameters);

        string GetTrendsLocationCloseToQuery(IGetTrendsLocationCloseToParameters parameters);
    }

    public class TrendsQueryGenerator : ITrendsQueryGenerator
    {
        public string GetTrendsAtQuery(IGetTrendsAtParameters parameters)
        {
            var query = new StringBuilder(Resources.Trends_GetTrendsFromWoeId);
            query.AddParameterToQuery("id", parameters.Woeid);

            if (parameters.Exclude != null && parameters.Exclude != GetTrendsExclude.Nothing)
            {
                query.AddParameterToQuery("exclude", parameters.Exclude.ToString().ToLowerInvariant());
            }

            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);
            return query.ToString();
        }

        public string GetTrendsLocationQuery(IGetTrendsLocationParameters parameters)
        {
            var query = new StringBuilder(Resources.Trends_GetAvailableTrendsLocations);
            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);
            return query.ToString();
        }

        public string GetTrendsLocationCloseToQuery(IGetTrendsLocationCloseToParameters parameters)
        {
            var coordinates = parameters.Coordinates;
            var query = new StringBuilder(Resources.Trends_GetTrendsLocationCloseTo);

            query.AddParameterToQuery("lat", coordinates.Latitude);
            query.AddParameterToQuery("long", coordinates.Longitude);
            query.AddFormattedParameterToQuery(parameters.FormattedCustomQueryParameters);

            return query.ToString();
        }
    }
}
