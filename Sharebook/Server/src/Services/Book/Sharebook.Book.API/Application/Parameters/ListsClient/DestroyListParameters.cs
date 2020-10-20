namespace Sharebook.Book.Application.Parameters.ListsClient
{
    using Sharebook.Book.Models;
    using Sharebook.Common.Public.Models.Interfaces;

    /// <summary>
    /// For more information visit : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/post-lists-destroy
    /// </summary>
    /// <inheritdoc />
    public interface IDestroyListParameters : IListParameters
    {

    }

    public class DestroyListParameters : TwitterListParameters, IDestroyListParameters
    {
        public DestroyListParameters(long listId) : this(new TwitterListIdentifier(listId))
        {
        }

        public DestroyListParameters(string slug, IUserIdentifier userId) : this(new TwitterListIdentifier(slug, userId))
        {
        }

        public DestroyListParameters(ITwitterListIdentifier list) : base(list)
        {
        }
    }
}
