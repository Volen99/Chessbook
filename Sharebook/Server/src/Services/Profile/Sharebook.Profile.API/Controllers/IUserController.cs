namespace Sharebook.Profile.API.Controllers
{
    using System.IO;
    using System.Threading.Tasks;

    using Sharebook.Common.Iterators;
    using Sharebook.Common.Public.Models.Interfaces.DTO;
    using Sharebook.Common.Public.Models.Interfaces.DTO.QueryDTO;
    using Sharebook.Common.Public.Parameters.AccountClient;
    using Sharebook.Common.Public.Parameters.UsersClient;
    using Sharebook.Common.Public.Parameters.UsersClients;
    using Sharebook.Profile.Application.Requesters;
    using Sharebook.Profile.Application.Web;
    using Sharebook.Profile.DTO;

    public interface IUserController
    {
        Task<ITwitterResult<IUserDTO>> GetAuthenticatedUserAsync(IGetAuthenticatedUserParameters parameters, ITwitterRequest request);

        // USERS
        Task<ITwitterResult<IUserDTO>> GetUserAsync(IGetUserParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<IUserDTO[]>> GetUsersAsync(IGetUsersParameters parameters, ITwitterRequest request);

        ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>> GetUserIdsRequestingFriendshipIterator(IGetUserIdsRequestingFriendshipParameters parameters, ITwitterRequest request);

        // FRIENDS
        ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>> GetFriendIdsIterator(IGetFriendIdsParameters parameters, ITwitterRequest request);

        ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>> GetFollowerIdsIterator(IGetFollowerIdsParameters parameters, ITwitterRequest request);

        // FOLLOWERS
        Task<ITwitterResult<IUserDTO>> FollowUserAsync(IFollowUserParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<IUserDTO>> UnfollowUserAsync(IUnfollowUserParameters parameters, ITwitterRequest request);

        // BLOCK
        Task<ITwitterResult<IUserDTO>> BlockUserAsync(IBlockUserParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<IUserDTO>> UnblockUserAsync(IUnblockUserParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<IUserDTO>> ReportUserForSpamAsync(IReportUserForSpamParameters parameters, ITwitterRequest request);

        ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>> GetBlockedUserIdsIterator(IGetBlockedUserIdsParameters parameters, ITwitterRequest request);

        ITwitterPageIterator<ITwitterResult<IUserCursorQueryResultDTO>> GetBlockedUsersIterator(IGetBlockedUsersParameters parameters, ITwitterRequest request);

        // FRIENDSHIPS
        Task<ITwitterResult<IRelationshipStateDTO[]>> GetRelationshipsWithAsync(IGetRelationshipsWithParameters parameters, ITwitterRequest request);

        ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>> GetUserIdsYouRequestedToFollowIterator(IGetUserIdsYouRequestedToFollowParameters parameters, ITwitterRequest request);

        // RELATIONSHIPS
        Task<ITwitterResult<IRelationshipDetailsDTO>> GetRelationshipBetweenAsync(IGetRelationshipBetweenParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<IRelationshipDetailsDTO>> UpdateRelationshipAsync(IUpdateRelationshipParameters parameters, ITwitterRequest request);

        // MUTE
        Task<ITwitterResult<long[]>> GetUserIdsWhoseRetweetsAreMutedAsync(IGetUserIdsWhoseRetweetsAreMutedParameters parameters, ITwitterRequest request);

        ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>> GetMutedUserIdsIterator(IGetMutedUserIdsParameters parameters, ITwitterRequest request);

        ITwitterPageIterator<ITwitterResult<IUserCursorQueryResultDTO>> GetMutedUsersIterator(IGetMutedUsersParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<IUserDTO>> MuteUserAsync(IMuteUserParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<IUserDTO>> UnmuteUserAsync(IUnmuteUserParameters parameters, ITwitterRequest request);

        Task<Stream> GetProfileImageStreamAsync(IGetProfileImageParameters parameters, ITwitterRequest request);
    }
}
