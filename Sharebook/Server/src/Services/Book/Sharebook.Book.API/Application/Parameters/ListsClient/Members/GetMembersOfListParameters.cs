namespace Sharebook.Book.Application.Parameters.ListsClient.Members
{
    using Sharebook.Book.Models;
    using Sharebook.Common.Parameters;
    using Sharebook.Common.Public.Models;
    using Sharebook.Common.Public.Models.Interfaces;
    using Sharebook.Common.Settings;

    /// <summary>
    /// For more information visit : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-members
    /// </summary>
    public interface IGetMembersOfListParameters : IBaseGetUsersOfListParameters
    {
    }

    /// <inheritdoc />
    public class GetMembersOfListParameters : BaseGetUsersOfListParameters, IGetMembersOfListParameters
    {
        public GetMembersOfListParameters(long listId)
            : this(new TwitterListIdentifier(listId))
        {
        }

        public GetMembersOfListParameters(ITwitterListIdentifier list) 
            : base(list)
        {
            PageSize = WorldFeedLimits.DEFAULTS.LISTS_GET_MEMBERS_MAX_PAGE_SIZE;
        }

        public GetMembersOfListParameters(IGetMembersOfListParameters parameters) 
            : base(parameters)
        {
            if (parameters == null)
            {
                PageSize = WorldFeedLimits.DEFAULTS.LISTS_GET_MEMBERS_MAX_PAGE_SIZE;
            }
        }
    }
}
