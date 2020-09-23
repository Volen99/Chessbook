namespace WorldFeed.Book.Application.Parameters.ListsClient.Members
{
    using WorldFeed.Book.Models;
    using WorldFeed.Common.Public.Models;
    using WorldFeed.Common.Public.Models.Interfaces;

    /// <summary>
    /// For more information visit : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/post-lists-members-create
    /// </summary>
    /// <inheritdoc />
    public interface IAddMemberToListParameters : IListParameters
    {
        /// <summary>
        /// User to add as a member of the list
        /// </summary>
        IUserIdentifier User { get; set; }
    }

    /// <inheritdoc />
    public class AddMemberToListParameters : TwitterListParameters, IAddMemberToListParameters
    {
        public AddMemberToListParameters(ITwitterListIdentifier list, long userId) : this(list, new UserIdentifier(userId))
        {
        }

        public AddMemberToListParameters(ITwitterListIdentifier list, string username) : this(list, new UserIdentifier(username))
        {
        }

        public AddMemberToListParameters(ITwitterListIdentifier list, IUserIdentifier user) : base(list)
        {
            User = user;
        }

        /// <inheritdoc />
        public IUserIdentifier User { get; set; }
    }
}
