namespace WorldFeed.Controllers.TwitterLists
{
    using System.Threading.Tasks;

    using WorldFeed.Common.Public.Models.Enums;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;
    using WorldFeed.Common.Public.Models.Interfaces.DTO.QueryDTO;
    using WorldFeed.Common.Public.Parameters.ListsClient;
    using WorldFeed.Common.Public.Parameters.ListsClient.Members;
    using WorldFeed.Common.Public.Parameters.ListsClient.Subscribers;
    using WorldFeed.Common.Web;

    public interface ITwitterListQueryExecutor
    {
        // list
        Task<ITwitterResult<ITwitterListDTO>> CreateListAsync(ICreateListParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<ITwitterListDTO>> GetListAsync(IGetListParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<ITwitterListDTO[]>> GetListsSubscribedByUserAsync(IGetListsSubscribedByUserParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<ITwitterListDTO>> UpdateListAsync(IUpdateListParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<ITwitterListDTO>> DestroyListAsync(IDestroyListParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<ITwitterListCursorQueryResultDTO>> GetListsOwnedByUserAsync(IGetListsOwnedByUserParameters parameters, ITwitterRequest request);

        // **************
        // MEMBERS
        // **************
        Task<ITwitterResult<ITwitterListDTO>> AddMemberToListAsync(IAddMemberToListParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<ITwitterListDTO>> AddMembersToListAsync(IAddMembersToListParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<ITwitterListCursorQueryResultDTO>> GetUserListMembershipsAsync(IGetUserListMembershipsParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<IUserCursorQueryResultDTO>> GetMembersOfListAsync(IGetMembersOfListParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<ITwitterListDTO>> CheckIfUserIsAListMemberAsync(ICheckIfUserIsMemberOfListParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<ITwitterListDTO>> RemoveMemberFromListAsync(IRemoveMemberFromListParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<ITwitterListDTO>> RemoveMembersFromListAsync(IRemoveMembersFromListParameters parameters, ITwitterRequest request);

        // **************
        // SUBSCRIPTIONS
        // **************
        Task<ITwitterResult<ITwitterListDTO>> SubscribeToListAsync(ISubscribeToListParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<ITwitterListDTO>> UnsubscribeFromListAsync(IUnsubscribeFromListParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<IUserCursorQueryResultDTO>> GetListSubscribersAsync(IGetListSubscribersParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<ITwitterListCursorQueryResultDTO>> GetUserListSubscriptionsAsync(IGetUserListSubscriptionsParameters parameters, ITwitterRequest request);

        Task<ITwitterResult<ITwitterListDTO>> CheckIfUserIsSubscriberOfListAsync(ICheckIfUserIsSubscriberOfListParameters parameters, ITwitterRequest request);

        // **************
        // TWEETS
        // **************
        Task<ITwitterResult<ITweetDTO[]>> GetTweetsFromListAsync(IGetTweetsFromListParameters parameters, ITwitterRequest request);
    }

    public class TwitterListQueryExecutor : ITwitterListQueryExecutor
    {
        private readonly ITwitterListQueryGenerator listsQueryGenerator;
        private readonly ITwitterAccessor twitterAccessor;

        public TwitterListQueryExecutor(ITwitterListQueryGenerator listsQueryGenerator, ITwitterAccessor twitterAccessor)
        {
            this.listsQueryGenerator = listsQueryGenerator;
            this.twitterAccessor = twitterAccessor;
        }

        public Task<ITwitterResult<ITwitterListDTO>> CreateListAsync(ICreateListParameters parameters, ITwitterRequest request)
        {
            request.Query.Url = this.listsQueryGenerator.GetCreateListQuery(parameters);
            request.Query.HttpMethod = HttpMethod.POST;
            return this.twitterAccessor.ExecuteRequestAsync<ITwitterListDTO>(request);
        }

        public Task<ITwitterResult<ITwitterListDTO>> GetListAsync(IGetListParameters parameters, ITwitterRequest request)
        {
            request.Query.Url = this.listsQueryGenerator.GetListQuery(parameters);
            request.Query.HttpMethod = HttpMethod.GET;
            return this.twitterAccessor.ExecuteRequestAsync<ITwitterListDTO>(request);
        }

        public Task<ITwitterResult<ITwitterListDTO[]>> GetListsSubscribedByUserAsync(IGetListsSubscribedByUserParameters parameters, ITwitterRequest request)
        {
            request.Query.Url = this.listsQueryGenerator.GetListsSubscribedByUserQuery(parameters);
            request.Query.HttpMethod = HttpMethod.GET;
            return this.twitterAccessor.ExecuteRequestAsync<ITwitterListDTO[]>(request);
        }

        public Task<ITwitterResult<ITwitterListDTO>> UpdateListAsync(IUpdateListParameters parameters, ITwitterRequest request)
        {
            request.Query.Url = this.listsQueryGenerator.GetUpdateListQuery(parameters);
            request.Query.HttpMethod = HttpMethod.POST;
            return this.twitterAccessor.ExecuteRequestAsync<ITwitterListDTO>(request);
        }

        public Task<ITwitterResult<ITwitterListDTO>> DestroyListAsync(IDestroyListParameters parameters, ITwitterRequest request)
        {
            request.Query.Url = this.listsQueryGenerator.GetDestroyListQuery(parameters);
            request.Query.HttpMethod = HttpMethod.POST;
            return this.twitterAccessor.ExecuteRequestAsync<ITwitterListDTO>(request);
        }

        public Task<ITwitterResult<ITwitterListCursorQueryResultDTO>> GetListsOwnedByUserAsync(IGetListsOwnedByUserParameters parameters, ITwitterRequest request)
        {
            request.Query.Url = this.listsQueryGenerator.GetListsOwnedByUserQuery(parameters);
            request.Query.HttpMethod = HttpMethod.GET;
            return this.twitterAccessor.ExecuteRequestAsync<ITwitterListCursorQueryResultDTO>(request);
        }

        public Task<ITwitterResult<ITwitterListDTO>> AddMemberToListAsync(IAddMemberToListParameters parameters, ITwitterRequest request)
        {
            request.Query.Url = this.listsQueryGenerator.GetAddMemberToListQuery(parameters);
            request.Query.HttpMethod = HttpMethod.POST;
            return this.twitterAccessor.ExecuteRequestAsync<ITwitterListDTO>(request);
        }

        public Task<ITwitterResult<ITwitterListDTO>> AddMembersToListAsync(IAddMembersToListParameters parameters, ITwitterRequest request)
        {
            request.Query.Url = this.listsQueryGenerator.GetAddMembersQuery(parameters);
            request.Query.HttpMethod = HttpMethod.POST;
            return this.twitterAccessor.ExecuteRequestAsync<ITwitterListDTO>(request);
        }

        public Task<ITwitterResult<ITwitterListCursorQueryResultDTO>> GetUserListMembershipsAsync(IGetUserListMembershipsParameters parameters, ITwitterRequest request)
        {
            request.Query.Url = this.listsQueryGenerator.GetUserListMembershipsQuery(parameters);
            request.Query.HttpMethod = HttpMethod.GET;
            return this.twitterAccessor.ExecuteRequestAsync<ITwitterListCursorQueryResultDTO>(request);
        }

        public Task<ITwitterResult<IUserCursorQueryResultDTO>> GetMembersOfListAsync(IGetMembersOfListParameters parameters, ITwitterRequest request)
        {
            request.Query.Url = this.listsQueryGenerator.GetMembersOfListQuery(parameters);
            request.Query.HttpMethod = HttpMethod.GET;
            return this.twitterAccessor.ExecuteRequestAsync<IUserCursorQueryResultDTO>(request);
        }

        public Task<ITwitterResult<ITwitterListDTO>> CheckIfUserIsAListMemberAsync(ICheckIfUserIsMemberOfListParameters parameters, ITwitterRequest request)
        {
            request.Query.Url = this.listsQueryGenerator.GetCheckIfUserIsMemberOfListQuery(parameters);
            request.Query.HttpMethod = HttpMethod.GET;
            return this.twitterAccessor.ExecuteRequestAsync<ITwitterListDTO>(request);
        }

        public Task<ITwitterResult<ITwitterListDTO>> RemoveMemberFromListAsync(IRemoveMemberFromListParameters parameters, ITwitterRequest request)
        {
            request.Query.Url = this.listsQueryGenerator.GetRemoveMemberFromListQuery(parameters);
            request.Query.HttpMethod = HttpMethod.POST;
            return this.twitterAccessor.ExecuteRequestAsync<ITwitterListDTO>(request);
        }

        public Task<ITwitterResult<ITwitterListDTO>> RemoveMembersFromListAsync(IRemoveMembersFromListParameters parameters, ITwitterRequest request)
        {
            request.Query.Url = this.listsQueryGenerator.GetRemoveMembersFromListQuery(parameters);
            request.Query.HttpMethod = HttpMethod.POST;
            return this.twitterAccessor.ExecuteRequestAsync<ITwitterListDTO>(request);
        }

        public Task<ITwitterResult<ITwitterListDTO>> SubscribeToListAsync(ISubscribeToListParameters parameters, ITwitterRequest request)
        {
            request.Query.Url = this.listsQueryGenerator.GetSubscribeToListQuery(parameters);
            request.Query.HttpMethod = HttpMethod.POST;
            return this.twitterAccessor.ExecuteRequestAsync<ITwitterListDTO>(request);
        }

        public Task<ITwitterResult<ITwitterListDTO>> UnsubscribeFromListAsync(IUnsubscribeFromListParameters parameters, ITwitterRequest request)
        {
            request.Query.Url = this.listsQueryGenerator.GetUnsubscribeFromListQuery(parameters);
            request.Query.HttpMethod = HttpMethod.POST;
            return this.twitterAccessor.ExecuteRequestAsync<ITwitterListDTO>(request);
        }

        public Task<ITwitterResult<IUserCursorQueryResultDTO>> GetListSubscribersAsync(IGetListSubscribersParameters parameters, ITwitterRequest request)
        {
            request.Query.Url = this.listsQueryGenerator.GetListSubscribersQuery(parameters);
            request.Query.HttpMethod = HttpMethod.GET;
            return this.twitterAccessor.ExecuteRequestAsync<IUserCursorQueryResultDTO>(request);
        }

        public Task<ITwitterResult<ITwitterListCursorQueryResultDTO>> GetUserListSubscriptionsAsync(IGetUserListSubscriptionsParameters parameters, ITwitterRequest request)
        {
            request.Query.Url = this.listsQueryGenerator.GetUserListSubscriptionsQuery(parameters);
            request.Query.HttpMethod = HttpMethod.GET;
            return this.twitterAccessor.ExecuteRequestAsync<ITwitterListCursorQueryResultDTO>(request);
        }

        public Task<ITwitterResult<ITwitterListDTO>> CheckIfUserIsSubscriberOfListAsync(ICheckIfUserIsSubscriberOfListParameters parameters, ITwitterRequest request)
        {
            request.Query.Url = this.listsQueryGenerator.GetCheckIfUserIsSubscriberOfListQuery(parameters);
            request.Query.HttpMethod = HttpMethod.GET;
            return this.twitterAccessor.ExecuteRequestAsync<ITwitterListDTO>(request);
        }

        public Task<ITwitterResult<ITweetDTO[]>> GetTweetsFromListAsync(IGetTweetsFromListParameters parameters, ITwitterRequest request)
        {
            request.Query.Url = this.listsQueryGenerator.GetTweetsFromListQuery(parameters, request.ExecutionContext.TweetMode);
            request.Query.HttpMethod = HttpMethod.GET;
            return this.twitterAccessor.ExecuteRequestAsync<ITweetDTO[]>(request);
        }
    }
}
