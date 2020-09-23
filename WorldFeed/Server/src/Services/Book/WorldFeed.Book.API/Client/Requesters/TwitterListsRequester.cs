namespace WorldFeed.Book.Client.Requesters
{
    using System.Threading.Tasks;

    using WorldFeed.Book.Application.Parameters.ListsClient;
    using WorldFeed.Book.Application.Parameters.ListsClient.Members;
    using WorldFeed.Book.Application.Parameters.ListsClient.Subscribers;
    using WorldFeed.Book.DTO;
    using WorldFeed.Book.DTO.QueryDTO.Cursor;
    using WorldFeed.Book.Models;
    using WorldFeed.Client;
    using WorldFeed.Common.Client.Validators;
    using WorldFeed.Common.Events;
    using WorldFeed.Common.Iterators;
    using WorldFeed.Common.JsonConverters;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;
    using WorldFeed.Core.Controllers;

    public class TwitterListsRequester : BaseRequester, ITwitterListsRequester
    {
        private readonly ITwitterResultFactory twitterResultFactory;
        private readonly ITwitterClientFactories factories;
        private readonly ITwitterListController twitterListController;
        private readonly ITwitterListsClientRequiredParametersValidator validator;

        public TwitterListsRequester(
            ITwitterClient client,
            ITwitterClientEvents clientEvents,
            ITwitterResultFactory twitterResultFactory,
            ITwitterClientFactories factories,
            ITwitterListController twitterListController,
            ITwitterListsClientRequiredParametersValidator validator)
            : base(client, clientEvents)
        {
            this.twitterResultFactory = twitterResultFactory;
            this.factories = factories;
            this.twitterListController = twitterListController;
            this.validator = validator;
        }

        public Task<ITwitterResult<ITwitterListDTO>> CreateListAsync(ICreateListParameters parameters)
        {
            this.validator.Validate(parameters);
            return ExecuteRequestAsync(request => this.twitterListController.CreateListAsync(parameters, request));
        }

        public Task<ITwitterResult<ITwitterListDTO>> GetListAsync(IGetListParameters parameters)
        {
            this.validator.Validate(parameters);
            return ExecuteRequestAsync(request => this.twitterListController.GetListAsync(parameters, request));
        }

        public Task<ITwitterResult<ITwitterListDTO[]>> GetListsSubscribedByUserAsync(IGetListsSubscribedByUserParameters parameters)
        {
            this.validator.Validate(parameters);
            return ExecuteRequestAsync(request => this.twitterListController.GetListsSubscribedByUserAsync(parameters, request));
        }

        public Task<ITwitterResult<ITwitterListDTO>> UpdateListAsync(IUpdateListParameters parameters)
        {
            this.validator.Validate(parameters);
            return ExecuteRequestAsync(request => this.twitterListController.UpdateListAsync(parameters, request));
        }

        public Task<ITwitterResult<ITwitterListDTO>> DestroyListAsync(IDestroyListParameters parameters)
        {
            this.validator.Validate(parameters);
            return ExecuteRequestAsync(request => this.twitterListController.DestroyListAsync(parameters, request));
        }

        public ITwitterPageIterator<ITwitterResult<ITwitterListCursorQueryResultDTO>> GetListsOwnedByUserIterator(IGetListsOwnedByUserParameters parameters)
        {
            this.validator.Validate(parameters);

            var request = TwitterClient.CreateRequest();
            request.ExecutionContext.Converters = JsonQueryConverterRepository.Converters;
            return this.twitterListController.GetListsOwnedByUserIterator(parameters, request);
        }

        public Task<ITwitterResult<ITwitterListDTO, ITwitterList>> AddMemberToListAsync(IAddMemberToListParameters parameters)
        {
            this.validator.Validate(parameters);
            return ExecuteRequestAsync(async request =>
            {
                var twitterResult = await this.twitterListController.AddMemberToListAsync(parameters, request).ConfigureAwait(false);
                return this.twitterResultFactory.Create(twitterResult, dto => this.factories.CreateTwitterList(dto));
            });
        }

        public Task<ITwitterResult<ITwitterListDTO, ITwitterList>> AddMembersToListAsync(IAddMembersToListParameters parameters)
        {
            this.validator.Validate(parameters);
            return ExecuteRequestAsync(async request =>
            {
                var twitterResult = await this.twitterListController.AddMembersToListAsync(parameters, request).ConfigureAwait(false);
                return this.twitterResultFactory.Create(twitterResult, dto => this.factories.CreateTwitterList(dto));
            });
        }

        public ITwitterPageIterator<ITwitterResult<ITwitterListCursorQueryResultDTO>> GetUserListMembershipsIterator(IGetUserListMembershipsParameters parameters)
        {
            this.validator.Validate(parameters);

            var request = TwitterClient.CreateRequest();
            request.ExecutionContext.Converters = JsonQueryConverterRepository.Converters;
            return this.twitterListController.GetUserListMembershipsIterator(parameters, request);
        }

        public ITwitterPageIterator<ITwitterResult<IUserCursorQueryResultDTO>> GetMembersOfListIterator(IGetMembersOfListParameters parameters)
        {
            this.validator.Validate(parameters);

            var request = TwitterClient.CreateRequest();
            request.ExecutionContext.Converters = JsonQueryConverterRepository.Converters;
            return this.twitterListController.GetMembersOfListIterator(parameters, request);
        }

        public Task<ITwitterResult<ITwitterListDTO>> CheckIfUserIsAListMemberAsync(ICheckIfUserIsMemberOfListParameters parameters)
        {
            this.validator.Validate(parameters);
            return ExecuteRequestAsync(request => this.twitterListController.CheckIfUserIsAListMemberAsync(parameters, request));
        }

        public Task<ITwitterResult<ITwitterListDTO>> RemoveMemberFromListAsync(IRemoveMemberFromListParameters parameters)
        {
            this.validator.Validate(parameters);
            return ExecuteRequestAsync(request => this.twitterListController.RemoveMemberFromListAsync(parameters, request));
        }

        public Task<ITwitterResult<ITwitterListDTO>> RemoveMembersFromListAsync(IRemoveMembersFromListParameters parameters)
        {
            this.validator.Validate(parameters);
            return ExecuteRequestAsync(request => this.twitterListController.RemoveMembersFromListAsync(parameters, request));
        }

        public Task<ITwitterResult<ITwitterListDTO>> SubscribeToListAsync(ISubscribeToListParameters parameters)
        {
            this.validator.Validate(parameters);
            return ExecuteRequestAsync(request => this.twitterListController.SubscribeToListAsync(parameters, request));
        }

        public Task<ITwitterResult<ITwitterListDTO>> UnsubscribeFromListAsync(IUnsubscribeFromListParameters parameters)
        {
            this.validator.Validate(parameters);
            return ExecuteRequestAsync(request => this.twitterListController.UnsubscribeFromListAsync(parameters, request));
        }

        public ITwitterPageIterator<ITwitterResult<IUserCursorQueryResultDTO>> GetListSubscribersIterator(IGetListSubscribersParameters parameters)
        {
            this.validator.Validate(parameters);

            var request = TwitterClient.CreateRequest();
            request.ExecutionContext.Converters = JsonQueryConverterRepository.Converters;
            return this.twitterListController.GetListSubscribersIterator(parameters, request);

        }

        public ITwitterPageIterator<ITwitterResult<ITwitterListCursorQueryResultDTO>> GetUserListSubscriptionsIterator(IGetUserListSubscriptionsParameters parameters)
        {
            this.validator.Validate(parameters);

            var request = TwitterClient.CreateRequest();
            request.ExecutionContext.Converters = JsonQueryConverterRepository.Converters;
            return this.twitterListController.GetUserListSubscriptionsIterator(parameters, request);
        }

        public Task<ITwitterResult<ITwitterListDTO>> CheckIfUserIsSubscriberOfListAsync(ICheckIfUserIsSubscriberOfListParameters parameters)
        {
            this.validator.Validate(parameters);
            return ExecuteRequestAsync(request => this.twitterListController.CheckIfUserIsSubscriberOfListAsync(parameters, request));
        }

        public ITwitterPageIterator<ITwitterResult<ITweetDTO[]>, long?> GetTweetsFromListIterator(IGetTweetsFromListParameters parameters)
        {
            this.validator.Validate(parameters);

            var request = TwitterClient.CreateRequest();
            return this.twitterListController.GetTweetsFromListIterator(parameters, request);
        }
    }
}
