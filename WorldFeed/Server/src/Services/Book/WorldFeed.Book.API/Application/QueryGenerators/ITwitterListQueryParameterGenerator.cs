namespace WorldFeed.Book.Application.QueryGenerators
{
    using System.Text;

    using WorldFeed.Book.Application.Parameters.ListsClient;
    using WorldFeed.Book.Models;

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
