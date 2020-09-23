namespace WorldFeed.Book.Application.Parameters.ListsClient.Subscribers
{
    using WorldFeed.Book.Models;

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
