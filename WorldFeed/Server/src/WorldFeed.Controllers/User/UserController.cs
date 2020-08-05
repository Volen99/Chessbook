namespace WorldFeed.Controllers.User
{
    using System.IO;
    using System.Threading.Tasks;

    using WorldFeed.Common.Iterators;
    using WorldFeed.Common.Public;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;
    using WorldFeed.Common.Public.Models.Interfaces.DTO.QueryDTO;
    using WorldFeed.Common.Public.Parameters.AccountClient;
    using WorldFeed.Common.Public.Parameters.UsersClient;
    using WorldFeed.Common.Public.Parameters.UsersClients;
    using WorldFeed.Common.Web;
    using WorldFeed.Core.Controllers;

    public class UserController : IUserController
    {
        private readonly IUserQueryExecutor userQueryExecutor;

        public UserController(IUserQueryExecutor userQueryExecutor)
        {
            this.userQueryExecutor = userQueryExecutor;
        }

        public Task<ITwitterResult<IUserDTO>> GetAuthenticatedUserAsync(IGetAuthenticatedUserParameters parameters, ITwitterRequest request)
        {
            return this.userQueryExecutor.GetAuthenticatedUserAsync(parameters, request);
        }

        public Task<ITwitterResult<IUserDTO>> GetUserAsync(IGetUserParameters parameters, ITwitterRequest request)
        {
            return this.userQueryExecutor.GetUserAsync(parameters, request);
        }

        public Task<ITwitterResult<IUserDTO[]>> GetUsersAsync(IGetUsersParameters parameters, ITwitterRequest request)
        {
            return this.userQueryExecutor.GetUsersAsync(parameters, request);
        }

        // Friend Ids
        public ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>> GetFriendIdsIterator(IGetFriendIdsParameters parameters, ITwitterRequest request)
        {
            var twitterCursorResult = new TwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>>(parameters.Cursor, cursor =>
                {
                    var cursoredParameters = new GetFriendIdsParameters(parameters)
                    {
                        Cursor = cursor
                    };

                    return this.userQueryExecutor.GetFriendIdsAsync(cursoredParameters, new TwitterRequest(request));
                },
                page => page.Model.NextCursorStr,
                page => page.Model.NextCursorStr == "0");

            return twitterCursorResult;
        }

        public ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>> GetFollowerIdsIterator(IGetFollowerIdsParameters parameters, ITwitterRequest request)
        {
            var twitterCursorResult = new TwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>>(parameters.Cursor, cursor =>
                {
                    var cursoredParameters = new GetFollowerIdsParameters(parameters)
                    {
                        Cursor = cursor
                    };

                    return this.userQueryExecutor.GetFollowerIdsAsync(cursoredParameters, new TwitterRequest(request));
                },
                page => page.Model.NextCursorStr,
                page => page.Model.NextCursorStr == "0");

            return twitterCursorResult;
        }

        public Task<ITwitterResult<IRelationshipDetailsDTO>> GetRelationshipBetweenAsync(IGetRelationshipBetweenParameters parameters, ITwitterRequest request)
        {
            return this.userQueryExecutor.GetRelationshipBetweenAsync(parameters, request);
        }

        // Profile Image
        public Task<Stream> GetProfileImageStreamAsync(IGetProfileImageParameters parameters, ITwitterRequest request)
        {
            return this.userQueryExecutor.GetProfileImageStreamAsync(parameters, request);
        }



        // FOLLOW/UNFOLLOW
        public Task<ITwitterResult<IUserDTO>> FollowUserAsync(IFollowUserParameters parameters, ITwitterRequest request)
        {
            return this.userQueryExecutor.FollowUserAsync(parameters, request);
        }

        public Task<ITwitterResult<IRelationshipDetailsDTO>> UpdateRelationshipAsync(IUpdateRelationshipParameters parameters, ITwitterRequest request)
        {
            return this.userQueryExecutor.UpdateRelationshipAsync(parameters, request);
        }

        public Task<ITwitterResult<IUserDTO>> UnfollowUserAsync(IUnfollowUserParameters parameters, ITwitterRequest request)
        {
            return this.userQueryExecutor.UnfollowUserAsync(parameters, request);
        }

        // FRIENDSHIP

        public Task<ITwitterResult<IRelationshipStateDTO[]>> GetRelationshipsWithAsync(IGetRelationshipsWithParameters parameters, ITwitterRequest request)
        {
            return this.userQueryExecutor.GetRelationshipsWithAsync(parameters, request);
        }

        public ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>> GetUserIdsRequestingFriendshipIterator(IGetUserIdsRequestingFriendshipParameters parameters, ITwitterRequest request)
        {
            var twitterCursorResult = new TwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>>(
                parameters.Cursor,
                cursor =>
                {
                    var cursoredParameters = new GetUserIdsRequestingFriendshipParameters(parameters)
                    {
                        Cursor = cursor
                    };

                    return this.userQueryExecutor.GetUserIdsRequestingFriendshipAsync(cursoredParameters, new TwitterRequest(request));
                },
                page => page.Model.NextCursorStr,
                page => page.Model.NextCursorStr == "0");

            return twitterCursorResult;
        }

        public ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>> GetUserIdsYouRequestedToFollowIterator(IGetUserIdsYouRequestedToFollowParameters parameters, ITwitterRequest request)
        {
            var twitterCursorResult = new TwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>>(
                parameters.Cursor,
                cursor =>
                {
                    var cursoredParameters = new GetUserIdsYouRequestedToFollowParameters(parameters)
                    {
                        Cursor = cursor
                    };

                    return this.userQueryExecutor.GetUserIdsYouRequestedToFollowAsync(cursoredParameters, new TwitterRequest(request));
                },
                page => page.Model.NextCursorStr,
                page => page.Model.NextCursorStr == "0");

            return twitterCursorResult;
        }

        // BLOCK
        public Task<ITwitterResult<IUserDTO>> BlockUserAsync(IBlockUserParameters parameters, ITwitterRequest request)
        {
            return this.userQueryExecutor.BlockUserAsync(parameters, request);
        }

        public Task<ITwitterResult<IUserDTO>> UnblockUserAsync(IUnblockUserParameters parameters, ITwitterRequest request)
        {
            return this.userQueryExecutor.UnblockUserAsync(parameters, request);
        }

        public Task<ITwitterResult<IUserDTO>> ReportUserForSpamAsync(IReportUserForSpamParameters parameters, ITwitterRequest request)
        {
            return this.userQueryExecutor.ReportUserForSpamAsync(parameters, request);
        }

        public ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>> GetBlockedUserIdsIterator(IGetBlockedUserIdsParameters parameters, ITwitterRequest request)
        {
            var twitterCursorResult = new TwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>>(
                parameters.Cursor,
                cursor =>
                {
                    var cursoredParameters = new GetBlockedUserIdsParameters(parameters)
                    {
                        Cursor = cursor
                    };

                    return this.userQueryExecutor.GetBlockedUserIdsAsync(cursoredParameters, new TwitterRequest(request));
                },
                page => page.Model.NextCursorStr,
                page => page.Model.NextCursorStr == "0");

            return twitterCursorResult;
        }

        public ITwitterPageIterator<ITwitterResult<IUserCursorQueryResultDTO>> GetBlockedUsersIterator(IGetBlockedUsersParameters parameters, ITwitterRequest request)
        {
            var twitterCursorResult = new TwitterPageIterator<ITwitterResult<IUserCursorQueryResultDTO>>(
                parameters.Cursor,
                cursor =>
                {
                    var cursoredParameters = new GetBlockedUsersParameters(parameters)
                    {
                        Cursor = cursor
                    };

                    return this.userQueryExecutor.GetBlockedUsersAsync(cursoredParameters, new TwitterRequest(request));
                },
                page => page.Model.NextCursorStr,
                page => page.Model.NextCursorStr == "0");

            return twitterCursorResult;
        }

        // MUTE
        public Task<ITwitterResult<long[]>> GetUserIdsWhoseRetweetsAreMutedAsync(IGetUserIdsWhoseRetweetsAreMutedParameters parameters, ITwitterRequest request)
        {
            return this.userQueryExecutor.GetUserIdsWhoseRetweetsAreMutedAsync(parameters, request);
        }

        public ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>> GetMutedUserIdsIterator(IGetMutedUserIdsParameters parameters, ITwitterRequest request)
        {
            var twitterCursorResult = new TwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>>(
                parameters.Cursor,
                cursor =>
                {
                    var cursoredParameters = new GetMutedUserIdsParameters(parameters)
                    {
                        Cursor = cursor
                    };

                    return this.userQueryExecutor.GetMutedUserIdsAsync(cursoredParameters, new TwitterRequest(request));
                },
                page => page.Model.NextCursorStr,
                page => page.Model.NextCursorStr == "0");

            return twitterCursorResult;
        }

        public ITwitterPageIterator<ITwitterResult<IUserCursorQueryResultDTO>> GetMutedUsersIterator(IGetMutedUsersParameters parameters, ITwitterRequest request)
        {
            var twitterCursorResult = new TwitterPageIterator<ITwitterResult<IUserCursorQueryResultDTO>>(
                parameters.Cursor,
                cursor =>
                {
                    var cursoredParameters = new GetMutedUsersParameters(parameters)
                    {
                        Cursor = cursor
                    };

                    return this.userQueryExecutor.GetMutedUsersAsync(cursoredParameters, new TwitterRequest(request));
                },
                page => page.Model.NextCursorStr,
                page => page.Model.NextCursorStr == "0");

            return twitterCursorResult;
        }

        public Task<ITwitterResult<IUserDTO>> MuteUserAsync(IMuteUserParameters parameters, ITwitterRequest request)
        {
            return this.userQueryExecutor.MuteUserAsync(parameters, request);
        }

        public Task<ITwitterResult<IUserDTO>> UnmuteUserAsync(IUnmuteUserParameters parameters, ITwitterRequest request)
        {
            return this.userQueryExecutor.UnmuteUserAsync(parameters, request);
        }
    }
}
