namespace Sharebook.Book.Controllers
{
    using System.Threading.Tasks;

    using Sharebook.Book.Application.Parameters.ListsClient;
    using Sharebook.Book.Application.Parameters.ListsClient.Members;
    using Sharebook.Book.Application.Parameters.ListsClient.Subscribers;
    using Sharebook.Common.Iterators;
    using Sharebook.Common.Public.Models.Interfaces.DTO;
    using Sharebook.Common.Public.Models.Interfaces.DTO.QueryDTO;
    using Sharebook.Core.Controllers;

    public class TwitterListController : ITwitterListController
    {
        private readonly ITwitterListQueryExecutor twitterListQueryExecutor;
        private readonly IPageCursorIteratorFactories pageCursorIteratorFactories;

        public TwitterListController(ITwitterListQueryExecutor twitterListQueryExecutor, IPageCursorIteratorFactories pageCursorIteratorFactories)
        {
            this.twitterListQueryExecutor = twitterListQueryExecutor;
            this.pageCursorIteratorFactories = pageCursorIteratorFactories;
        }

        public Task<ITwitterResult<ITwitterListDTO>> CreateListAsync(ICreateListParameters parameters, ITwitterRequest request)
        {
            return this.twitterListQueryExecutor.CreateListAsync(parameters, request);
        }

        public Task<ITwitterResult<ITwitterListDTO>> GetListAsync(IGetListParameters parameters, ITwitterRequest request)
        {
            return this.twitterListQueryExecutor.GetListAsync(parameters, request);
        }

        public Task<ITwitterResult<ITwitterListDTO[]>> GetListsSubscribedByUserAsync(IGetListsSubscribedByUserParameters parameters, ITwitterRequest request)
        {
            return this.twitterListQueryExecutor.GetListsSubscribedByUserAsync(parameters, request);
        }

        public Task<ITwitterResult<ITwitterListDTO>> UpdateListAsync(IUpdateListParameters parameters, ITwitterRequest request)
        {
            return this.twitterListQueryExecutor.UpdateListAsync(parameters, request);
        }

        Task<ITwitterResult<ITwitterListDTO>> ITwitterListController.DestroyListAsync(IDestroyListParameters parameters, ITwitterRequest request)
        {
            return this.twitterListQueryExecutor.DestroyListAsync(parameters, request);
        }

        public ITwitterPageIterator<ITwitterResult<ITwitterListCursorQueryResultDTO>> GetListsOwnedByUserIterator(IGetListsOwnedByUserParameters parameters, ITwitterRequest request)
        {
            return this.pageCursorIteratorFactories.Create(parameters, cursor =>
            {
                var cursoredParameters = new GetListsOwnedByAccountByUserParameters(parameters)
                {
                    Cursor = cursor
                };

                return this.twitterListQueryExecutor.GetListsOwnedByUserAsync(cursoredParameters, new TwitterRequest(request));
            });
        }

        public Task<ITwitterResult<ITwitterListDTO>> AddMemberToListAsync(IAddMemberToListParameters parameters, ITwitterRequest request)
        {
            return this.twitterListQueryExecutor.AddMemberToListAsync(parameters, request);
        }

        public Task<ITwitterResult<ITwitterListDTO>> AddMembersToListAsync(IAddMembersToListParameters parameters, ITwitterRequest request)
        {
            return this.twitterListQueryExecutor.AddMembersToListAsync(parameters, request);
        }

        public ITwitterPageIterator<ITwitterResult<ITwitterListCursorQueryResultDTO>> GetUserListMembershipsIterator(IGetUserListMembershipsParameters parameters, ITwitterRequest request)
        {
            return this.pageCursorIteratorFactories.Create(parameters, cursor =>
            {
                var cursoredParameters = new GetUserListMembershipsParameters(parameters)
                {
                    Cursor = cursor
                };

                return this.twitterListQueryExecutor.GetUserListMembershipsAsync(cursoredParameters, new TwitterRequest(request));
            });
        }

        public ITwitterPageIterator<ITwitterResult<IUserCursorQueryResultDTO>> GetMembersOfListIterator(IGetMembersOfListParameters parameters, ITwitterRequest request)
        {
            return this.pageCursorIteratorFactories.Create(parameters, cursor =>
            {
                var cursoredParameters = new GetMembersOfListParameters(parameters)
                {
                    Cursor = cursor
                };

                return this.twitterListQueryExecutor.GetMembersOfListAsync(cursoredParameters, new TwitterRequest(request));
            });
        }

        public Task<ITwitterResult<ITwitterListDTO>> CheckIfUserIsAListMemberAsync(ICheckIfUserIsMemberOfListParameters parameters, ITwitterRequest request)
        {
            return this.twitterListQueryExecutor.CheckIfUserIsAListMemberAsync(parameters, request);
        }

        public Task<ITwitterResult<ITwitterListDTO>> RemoveMemberFromListAsync(IRemoveMemberFromListParameters parameters, ITwitterRequest request)
        {
            return this.twitterListQueryExecutor.RemoveMemberFromListAsync(parameters, request);
        }

        public Task<ITwitterResult<ITwitterListDTO>> RemoveMembersFromListAsync(IRemoveMembersFromListParameters parameters, ITwitterRequest request)
        {
            return this.twitterListQueryExecutor.RemoveMembersFromListAsync(parameters, request);
        }

        public Task<ITwitterResult<ITwitterListDTO>> SubscribeToListAsync(ISubscribeToListParameters parameters, ITwitterRequest request)
        {
            return this.twitterListQueryExecutor.SubscribeToListAsync(parameters, request);
        }

        public Task<ITwitterResult<ITwitterListDTO>> UnsubscribeFromListAsync(IUnsubscribeFromListParameters parameters, ITwitterRequest request)
        {
            return this.twitterListQueryExecutor.UnsubscribeFromListAsync(parameters, request);
        }

        public ITwitterPageIterator<ITwitterResult<IUserCursorQueryResultDTO>> GetListSubscribersIterator(IGetListSubscribersParameters parameters, ITwitterRequest request)
        {
            return this.pageCursorIteratorFactories.Create(parameters, cursor =>
            {
                var cursoredParameters = new GetListSubscribersParameters(parameters)
                {
                    Cursor = cursor
                };

                return this.twitterListQueryExecutor.GetListSubscribersAsync(cursoredParameters, new TwitterRequest(request));
            });
        }

        public ITwitterPageIterator<ITwitterResult<ITwitterListCursorQueryResultDTO>> GetUserListSubscriptionsIterator(IGetUserListSubscriptionsParameters parameters, ITwitterRequest request)
        {
            return this.pageCursorIteratorFactories.Create(parameters, cursor =>
            {
                var cursoredParameters = new GetUserListSubscriptionsParameters(parameters)
                {
                    Cursor = cursor
                };

                return this.twitterListQueryExecutor.GetUserListSubscriptionsAsync(cursoredParameters, new TwitterRequest(request));
            });
        }

        public Task<ITwitterResult<ITwitterListDTO>> CheckIfUserIsSubscriberOfListAsync(ICheckIfUserIsSubscriberOfListParameters parameters, ITwitterRequest request)
        {
            return this.twitterListQueryExecutor.CheckIfUserIsSubscriberOfListAsync(parameters, request);
        }

        public ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, long?> GetTweetsFromListIterator(IGetTweetsFromListParameters parameters, ITwitterRequest request)
        {
            return this.pageCursorIteratorFactories.Create(parameters, cursor =>
            {
                var cursoredParameters = new GetTweetsFromListParameters(parameters)
                {
                    MaxId = cursor
                };

                return this.twitterListQueryExecutor.GetTweetsFromListAsync(cursoredParameters, new TwitterRequest(request));
            });
        }
    }
}
