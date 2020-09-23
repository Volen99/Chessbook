namespace WorldFeed.Book.Application.Parameters.ListsClient
{
    using WorldFeed.Book.Models;
    using WorldFeed.Common.Public.Parameters;

    /// <inheritdoc />
    public interface IListParameters : ICustomRequestParameters
    {
        /// <summary>
        /// Identifier of a twitter list
        /// </summary>
        ITwitterListIdentifier List { get; set; }
    }

    /// <inheritdoc />
    public class TwitterListParameters : CustomRequestParameters, IListParameters
    {
        public TwitterListParameters(long listId) : this(new TwitterListIdentifier(listId))
        {
        }

        public TwitterListParameters(ITwitterListIdentifier list)
        {
            List = list;
        }

        /// <inheritdoc />
        public ITwitterListIdentifier List { get; set; }
    }
}
