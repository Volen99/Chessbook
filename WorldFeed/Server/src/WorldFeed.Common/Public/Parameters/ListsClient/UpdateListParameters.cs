namespace WorldFeed.Common.Public.Parameters.ListsClient
{
    using WorldFeed.Common.Public.Models;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Parameters.ListsClient.Interfaces;

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
