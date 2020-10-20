namespace Sharebook.Book.Application.Parameters.ListsClient
{
    using Sharebook.Book.Application.Parameters.ListsClient.Interfaces;
    using Sharebook.Book.Models;
    using Sharebook.Common.Public.Models.Interfaces;

    /// <summary>
    /// For more information visit : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/post-lists-update
    /// </summary>
    /// <inheritdoc />
    public interface IUpdateListParameters : IListMetadataParameters, IListParameters
    {
    }

    /// <inheritdoc />
    public class UpdateListParameters : ListMetadataParameters, IUpdateListParameters
    {
        public UpdateListParameters(IUpdateListParameters parameters)
            : base(parameters)
        {
            this.List = parameters?.List;
        }

        public UpdateListParameters(long listId)
        {
            this.List = new TwitterListIdentifier(listId);
        }

        public UpdateListParameters(string slug, IUserIdentifier userId)
        {
            this.List = new TwitterListIdentifier(slug, userId);
        }

        public UpdateListParameters(ITwitterListIdentifier listId)
        {
            this.List = listId;
        }

        public ITwitterListIdentifier List { get; set; }
    }
}
