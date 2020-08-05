namespace WorldFeed.Common.Public.Parameters.ListsClient.Subscribers
{
    using WorldFeed.Common.Public.Models.Interfaces;

    /// <summary>
    /// For more information visit : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/post-lists-subscribers-destroy
    /// </summary>
    public interface IUnsubscribeFromListParameters : IListParameters
    {
    }

    /// <inheritdoc />
    public class UnsubscribeFromListParameters : TwitterListParameters, IUnsubscribeFromListParameters
    {
        public UnsubscribeFromListParameters(long listId) : base(listId)
        {
        }

        public UnsubscribeFromListParameters(ITwitterListIdentifier list) : base(list)
        {
        }
    }
}
