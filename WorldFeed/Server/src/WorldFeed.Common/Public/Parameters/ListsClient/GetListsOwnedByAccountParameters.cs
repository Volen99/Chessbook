namespace WorldFeed.Common.Public.Parameters.ListsClient
{
    using WorldFeed.Common.Settings;

    /// <summary>
    /// For more information visit : https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-ownerships
    /// </summary>
    /// <inheritdoc />
    public interface IGetListsOwnedByAccountParameters : ICursorQueryParameters
    {
    }

    /// <inheritdoc />
    public class GetListsOwnedByAccountParameters : CursorQueryParameters, IGetListsOwnedByAccountParameters
    {
        public GetListsOwnedByAccountParameters()
        {
            PageSize = WorldFeedLimits.DEFAULTS.LISTS_GET_USER_OWNED_LISTS_MAX_SIZE;
        }

        public GetListsOwnedByAccountParameters(IGetListsOwnedByAccountParameters parameters) : base(parameters)
        {
            if (parameters == null)
            {
                PageSize = WorldFeedLimits.DEFAULTS.LISTS_GET_USER_OWNED_LISTS_MAX_SIZE;
            }
        }
    }
}
