namespace WorldFeed.Controllers.User
{
    using System.IO;
    using System.Threading.Tasks;

    using WorldFeed.Common.Helpers;
    using WorldFeed.Common.Public.Models.Enums;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;
    using WorldFeed.Common.Public.Models.Interfaces.DTO.QueryDTO;
    using WorldFeed.Common.Public.Parameters.AccountClient;
    using WorldFeed.Common.Public.Parameters.UsersClient;
    using WorldFeed.Common.Public.Parameters.UsersClients;
    using WorldFeed.Common.QueryGenerators;
    using WorldFeed.Common.Web;

    public interface IUserQueryExecutor
    {
        Task<ITwitterResult<IUserDTO>> GetAuthenticatedUserAsync(IGetAuthenticatedUserParameters parameters, ITwitterRequest request);

        // USERS
        Task<ITwitterResult<IUserDTO>> GetUserAsync(IGetUserParameters parameters, ITwitterRequest request);
        Task<ITwitterResult<IUserDTO[]>> GetUsersAsync(IGetUsersParameters parameters, ITwitterRequest request);

        // FRIENDS
        Task<ITwitterResult<IIdsCursorQueryResultDTO>> GetFriendIdsAsync(IGetFriendIdsParameters parameters, ITwitterRequest request);
        Task<ITwitterResult<IIdsCursorQueryResultDTO>> GetFollowerIdsAsync(IGetFollowerIdsParameters parameters, ITwitterRequest request);

        // BLOCK
        Task<ITwitterResult<IUserDTO>> BlockUserAsync(IBlockUserParameters parameters, ITwitterRequest request);
        Task<ITwitterResult<IUserDTO>> UnblockUserAsync(IUnblockUserParameters parameters, ITwitterRequest request);
        Task<ITwitterResult<IUserDTO>> ReportUserForSpamAsync(IReportUserForSpamParameters parameters, ITwitterRequest request);
        Task<ITwitterResult<IIdsCursorQueryResultDTO>> GetBlockedUserIdsAsync(IGetBlockedUserIdsParameters parameters, ITwitterRequest request);
        Task<ITwitterResult<IUserCursorQueryResultDTO>> GetBlockedUsersAsync(IGetBlockedUsersParameters parameters, ITwitterRequest request);

        // FOLLOWERS
        Task<ITwitterResult<IUserDTO>> FollowUserAsync(IFollowUserParameters parameters, ITwitterRequest request);
        Task<ITwitterResult<IUserDTO>> UnfollowUserAsync(IUnfollowUserParameters parameters, ITwitterRequest request);

        // ONGOING REQUESTS
        Task<ITwitterResult<IIdsCursorQueryResultDTO>> GetUserIdsRequestingFriendshipAsync(IGetUserIdsRequestingFriendshipParameters parameters, ITwitterRequest request);
        Task<ITwitterResult<IIdsCursorQueryResultDTO>> GetUserIdsYouRequestedToFollowAsync(IGetUserIdsYouRequestedToFollowParameters parameters, ITwitterRequest request);

        // FRIENDSHIPS
        Task<ITwitterResult<IRelationshipDetailsDTO>> GetRelationshipBetweenAsync(IGetRelationshipBetweenParameters parameters, ITwitterRequest request);
        Task<ITwitterResult<IRelationshipStateDTO[]>> GetRelationshipsWithAsync(IGetRelationshipsWithParameters parameters, ITwitterRequest request);

        // MUTE
        Task<ITwitterResult<IIdsCursorQueryResultDTO>> GetMutedUserIdsAsync(IGetMutedUserIdsParameters parameters, ITwitterRequest request);
        Task<ITwitterResult<IUserCursorQueryResultDTO>> GetMutedUsersAsync(IGetMutedUsersParameters cursoredParameters, ITwitterRequest request);

        Task<ITwitterResult<IUserDTO>> MuteUserAsync(IMuteUserParameters parameters, ITwitterRequest request);
        Task<ITwitterResult<IUserDTO>> UnmuteUserAsync(IUnmuteUserParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<IRelationshipDetailsDTO>> UpdateRelationshipAsync(IUpdateRelationshipParameters parameters, ITwitterRequest request);
        Task<ITwitterResult<long[]>> GetUserIdsWhoseRetweetsAreMutedAsync(IGetUserIdsWhoseRetweetsAreMutedParameters parameters, ITwitterRequest request);

        Task<Stream> GetProfileImageStreamAsync(IGetProfileImageParameters parameters, ITwitterRequest request);
    }

    public class UserQueryExecutor : IUserQueryExecutor
    {
        private readonly IUserQueryGenerator userQueryGenerator;
        private readonly ITwitterAccessor twitterAccessor;
        private readonly IWebHelper webHelper;

        public UserQueryExecutor(IUserQueryGenerator userQueryGenerator, ITwitterAccessor twitterAccessor, IWebHelper webHelper)
        {
            this.userQueryGenerator = userQueryGenerator;
            this.twitterAccessor = twitterAccessor;
            this.webHelper = webHelper;
        }

        public Task<ITwitterResult<IUserDTO>> GetAuthenticatedUserAsync(IGetAuthenticatedUserParameters parameters, ITwitterRequest request)
        {
            var query = this.userQueryGenerator.GetAuthenticatedUserQuery(parameters);

            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.GET;

            return this.twitterAccessor.ExecuteRequestAsync<IUserDTO>(request);
        }

        public Task<ITwitterResult<IUserDTO>> GetUserAsync(IGetUserParameters parameters, ITwitterRequest request)
        {
            var query = this.userQueryGenerator.GetUserQuery(parameters);

            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.GET;

            return this.twitterAccessor.ExecuteRequestAsync<IUserDTO>(request);
        }

        public Task<ITwitterResult<IUserDTO[]>> GetUsersAsync(IGetUsersParameters parameters, ITwitterRequest request)
        {
            if (parameters.Users.Length == 0)
            {
                ITwitterResult<IUserDTO[]> result = new TwitterResult<IUserDTO[]>(null)
                {
                    Request = null,
                    Response = null,
                    Model = new IUserDTO[0]
                };

                return Task.FromResult(result);
            }

            var query = this.userQueryGenerator.GetUsersQuery(parameters);

            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.GET;

            return this.twitterAccessor.ExecuteRequestAsync<IUserDTO[]>(request);
        }

        public Task<ITwitterResult<IIdsCursorQueryResultDTO>> GetFollowerIdsAsync(IGetFollowerIdsParameters parameters, ITwitterRequest request)
        {
            var query = this.userQueryGenerator.GetFollowerIdsQuery(parameters);

            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.GET;

            return this.twitterAccessor.ExecuteRequestAsync<IIdsCursorQueryResultDTO>(request);
        }

        public Task<ITwitterResult<IIdsCursorQueryResultDTO>> GetFriendIdsAsync(IGetFriendIdsParameters parameters, ITwitterRequest request)
        {
            var query = this.userQueryGenerator.GetFriendIdsQuery(parameters);

            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.GET;

            return this.twitterAccessor.ExecuteRequestAsync<IIdsCursorQueryResultDTO>(request);
        }

        public Task<ITwitterResult<IRelationshipDetailsDTO>> GetRelationshipBetweenAsync(IGetRelationshipBetweenParameters parameters, ITwitterRequest request)
        {
            var query = this.userQueryGenerator.GetRelationshipBetweenQuery(parameters);

            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.GET;

            return this.twitterAccessor.ExecuteRequestAsync<IRelationshipDetailsDTO>(request);
        }

        // Stream Profile Image
        public Task<Stream> GetProfileImageStreamAsync(IGetProfileImageParameters parameters, ITwitterRequest request)
        {
            var url = this.userQueryGenerator.DownloadProfileImageURL(parameters);

            request.Query.Url = url;
            request.Query.HttpMethod = HttpMethod.GET;

            return this.webHelper.GetResponseStreamAsync(request);
        }

        // BLOCK
        public Task<ITwitterResult<IUserDTO>> BlockUserAsync(IBlockUserParameters parameters, ITwitterRequest request)
        {
            var query = this.userQueryGenerator.GetBlockUserQuery(parameters);

            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.POST;

            return this.twitterAccessor.ExecuteRequestAsync<IUserDTO>(request);
        }

        public Task<ITwitterResult<IUserDTO>> UnblockUserAsync(IUnblockUserParameters parameters, ITwitterRequest request)
        {
            var query = this.userQueryGenerator.GetUnblockUserQuery(parameters);

            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.POST;

            return this.twitterAccessor.ExecuteRequestAsync<IUserDTO>(request);
        }

        public Task<ITwitterResult<IUserDTO>> ReportUserForSpamAsync(IReportUserForSpamParameters parameters, ITwitterRequest request)
        {
            var query = this.userQueryGenerator.GetReportUserForSpamQuery(parameters);

            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.POST;

            return this.twitterAccessor.ExecuteRequestAsync<IUserDTO>(request);
        }

        public Task<ITwitterResult<IIdsCursorQueryResultDTO>> GetBlockedUserIdsAsync(IGetBlockedUserIdsParameters parameters, ITwitterRequest request)
        {
            var query = this.userQueryGenerator.GetBlockedUserIdsQuery(parameters);
            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.GET;
            return this.twitterAccessor.ExecuteRequestAsync<IIdsCursorQueryResultDTO>(request);
        }

        public Task<ITwitterResult<IUserCursorQueryResultDTO>> GetBlockedUsersAsync(IGetBlockedUsersParameters parameters, ITwitterRequest request)
        {
            var query = this.userQueryGenerator.GetBlockedUsersQuery(parameters);
            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.GET;
            return this.twitterAccessor.ExecuteRequestAsync<IUserCursorQueryResultDTO>(request);
        }

        // FOLLOWERS
        public Task<ITwitterResult<IUserDTO>> FollowUserAsync(IFollowUserParameters parameters, ITwitterRequest request)
        {
            var query = this.userQueryGenerator.GetFollowUserQuery(parameters);
            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.POST;
            return this.twitterAccessor.ExecuteRequestAsync<IUserDTO>(request);
        }

        public Task<ITwitterResult<IRelationshipDetailsDTO>> UpdateRelationshipAsync(IUpdateRelationshipParameters parameters, ITwitterRequest request)
        {
            var query = this.userQueryGenerator.GetUpdateRelationshipQuery(parameters);
            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.POST;
            return this.twitterAccessor.ExecuteRequestAsync<IRelationshipDetailsDTO>(request);
        }

        public Task<ITwitterResult<IUserDTO>> UnfollowUserAsync(IUnfollowUserParameters parameters, ITwitterRequest request)
        {
            var query = this.userQueryGenerator.GetUnfollowUserQuery(parameters);
            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.POST;
            return this.twitterAccessor.ExecuteRequestAsync<IUserDTO>(request);
        }

        public Task<ITwitterResult<IIdsCursorQueryResultDTO>> GetUserIdsRequestingFriendshipAsync(IGetUserIdsRequestingFriendshipParameters parameters, ITwitterRequest request)
        {
            var query = this.userQueryGenerator.GetUserIdsRequestingFriendshipQuery(parameters);
            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.GET;
            return this.twitterAccessor.ExecuteRequestAsync<IIdsCursorQueryResultDTO>(request);
        }

        public Task<ITwitterResult<IIdsCursorQueryResultDTO>> GetUserIdsYouRequestedToFollowAsync(IGetUserIdsYouRequestedToFollowParameters parameters, ITwitterRequest request)
        {
            var query = this.userQueryGenerator.GetUserIdsYouRequestedToFollowQuery(parameters);
            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.GET;
            return this.twitterAccessor.ExecuteRequestAsync<IIdsCursorQueryResultDTO>(request);
        }

        // FRIENDSHIPS
        public Task<ITwitterResult<IRelationshipStateDTO[]>> GetRelationshipsWithAsync(IGetRelationshipsWithParameters parameters, ITwitterRequest request)
        {
            var query = this.userQueryGenerator.GetRelationshipsWithQuery(parameters);
            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.GET;
            return this.twitterAccessor.ExecuteRequestAsync<IRelationshipStateDTO[]>(request);
        }

        // MUTE
        public Task<ITwitterResult<long[]>> GetUserIdsWhoseRetweetsAreMutedAsync(IGetUserIdsWhoseRetweetsAreMutedParameters parameters, ITwitterRequest request)
        {
            var query = this.userQueryGenerator.GetUserIdsWhoseRetweetsAreMutedQuery(parameters);
            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.GET;
            return this.twitterAccessor.ExecuteRequestAsync<long[]>(request);
        }

        public Task<ITwitterResult<IIdsCursorQueryResultDTO>> GetMutedUserIdsAsync(IGetMutedUserIdsParameters parameters, ITwitterRequest request)
        {
            var query = this.userQueryGenerator.GetMutedUserIdsQuery(parameters);
            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.GET;
            return this.twitterAccessor.ExecuteRequestAsync<IIdsCursorQueryResultDTO>(request);
        }

        public Task<ITwitterResult<IUserCursorQueryResultDTO>> GetMutedUsersAsync(IGetMutedUsersParameters parameters, ITwitterRequest request)
        {
            var query = this.userQueryGenerator.GetMutedUsersQuery(parameters);
            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.GET;
            return this.twitterAccessor.ExecuteRequestAsync<IUserCursorQueryResultDTO>(request);
        }

        public Task<ITwitterResult<IUserDTO>> MuteUserAsync(IMuteUserParameters parameters, ITwitterRequest request)
        {
            var query = this.userQueryGenerator.GetMuteUserQuery(parameters);
            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.POST;
            return this.twitterAccessor.ExecuteRequestAsync<IUserDTO>(request);
        }

        public Task<ITwitterResult<IUserDTO>> UnmuteUserAsync(IUnmuteUserParameters parameters, ITwitterRequest request)
        {
            var query = this.userQueryGenerator.GetUnmuteUserQuery(parameters);
            request.Query.Url = query;
            request.Query.HttpMethod = HttpMethod.POST;
            return this.twitterAccessor.ExecuteRequestAsync<IUserDTO>(request);
        }
    }
}
