namespace WorldFeed.Common.QueryGenerators
{
    using System.Text;

    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Parameters.ListsClient;

    public interface ITwitterListQueryParameterGenerator
    {
        string GenerateIdentifierParameter(ITwitterListIdentifier twitterListIdentifier);

        // User Parameters
        IGetTweetsFromListParameters CreateTweetsFromListParameters();

        // Query Parameters
        void AppendListIdentifierParameter(StringBuilder query, ITwitterListIdentifier listIdentifier);
        void AppendListIdentifierParameter(StringBuilder query, IListParameters parameters);
    }
}
