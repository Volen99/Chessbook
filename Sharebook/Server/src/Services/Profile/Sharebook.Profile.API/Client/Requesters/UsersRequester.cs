namespace Sharebook.Profile.Client.Requesters
{
    using System.Threading.Tasks;

    using Sharebook.Client;
    using Sharebook.Common.Client.Validators;
    using Sharebook.Common.Events;
    using Sharebook.Common.Iterators;
    using Sharebook.Common.JsonConverters;
    using Sharebook.Common.Public.Models.Interfaces.DTO;
    using Sharebook.Common.Public.Models.Interfaces.DTO.QueryDTO;
    using Sharebook.Common.Public.Parameters.UsersClient;
    using Sharebook.Common.Public.Parameters.UsersClients;
    using Sharebook.Profile.Application.DTO.QueryDTO.Cursor;
    using Sharebook.Profile.Application.Parameters.AccountClient;
    using Sharebook.Profile.Application.Web;
    using Sharebook.Profile.Controllers;
    using Sharebook.Profile.DTO;
    using Sharebook.Profile.Infrastructure.Inject;

    public class UsersRequester : BaseRequester, IUsersRequester
    {
        private readonly ITwitterClient client;
        private readonly IUserController userController;
        private readonly IUsersClientRequiredParametersValidator validator;

        public UsersRequester(ITwitterClient client, ITwitterClientEvents clientEvents, IUserController userController,
            IUsersClientRequiredParametersValidator validator)
        : base(client, clientEvents)
        {
            this.client = client;
            this.userController = userController;
            this.validator = validator;
        }

        public Task<ITwitterResult<IUserDTO>> GetAuthenticatedUserAsync(IGetAuthenticatedUserParameters parameters)
        {
            this.validator.Validate(parameters);

            var request = TwitterClient.CreateRequest();
            return ExecuteRequestAsync(() => this.userController.GetAuthenticatedUserAsync(parameters, request), request);
        }

        public Task<ITwitterResult<IUserDTO>> GetUserAsync(IGetUserParameters parameters)
        {
            this.validator.Validate(parameters);
            return ExecuteRequestAsync(request => this.userController.GetUserAsync(parameters, request));
        }

        public Task<ITwitterResult<IUserDTO[]>> GetUsersAsync(IGetUsersParameters parameters)
        {
            this.validator.Validate(parameters);
            return ExecuteRequestAsync(request => this.userController.GetUsersAsync(parameters, request));
        }

        public ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>> GetFriendIdsIterator(IGetFriendIdsParameters parameters)
        {
            this.validator.Validate(parameters);

            var request = TwitterClient.CreateRequest();
            request.ExecutionContext.Converters = JsonQueryConverterRepository.Converters;
            return this.userController.GetFriendIdsIterator(parameters, request);
        }

        public ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>> GetFollowerIdsIterator(IGetFollowerIdsParameters parameters)
        {
            this.validator.Validate(parameters);

            var request = TwitterClient.CreateRequest();
            request.ExecutionContext.Converters = JsonQueryConverterRepository.Converters;
            return this.userController.GetFollowerIdsIterator(parameters, request);
        }

        public Task<ITwitterResult<IRelationshipDetailsDTO>> GetRelationshipBetweenAsync(IGetRelationshipBetweenParameters parameters)
        {
            this.validator.Validate(parameters);
            return ExecuteRequestAsync(request => this.userController.GetRelationshipBetweenAsync(parameters, request));
        }

        // FOLLOWERS
        public Task<ITwitterResult<IUserDTO>> FollowUserAsync(IFollowUserParameters parameters)
        {
            this.validator.Validate(parameters);
            return ExecuteRequestAsync(request => this.userController.FollowUserAsync(parameters, request));
        }

        public Task<ITwitterResult<IRelationshipDetailsDTO>> UpdateRelationshipAsync(IUpdateRelationshipParameters parameters)
        {
            this.validator.Validate(parameters);
            return ExecuteRequestAsync(request => this.userController.UpdateRelationshipAsync(parameters, request));
        }

        public Task<ITwitterResult<IUserDTO>> UnfollowUserAsync(IUnfollowUserParameters parameters)
        {
            this.validator.Validate(parameters);
            return ExecuteRequestAsync(request => this.userController.UnfollowUserAsync(parameters, request));
        }

        public ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>> GetUserIdsRequestingFriendshipIterator(IGetUserIdsRequestingFriendshipParameters parameters)
        {
            this.validator.Validate(parameters);

            var request = TwitterClient.CreateRequest();
            request.ExecutionContext.Converters = JsonQueryConverterRepository.Converters;
            return this.userController.GetUserIdsRequestingFriendshipIterator(parameters, request);
        }

        public ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>> GetUserIdsYouRequestedToFollowIterator(IGetUserIdsYouRequestedToFollowParameters parameters)
        {
            this.validator.Validate(parameters);

            var request = TwitterClient.CreateRequest();
            request.ExecutionContext.Converters = JsonQueryConverterRepository.Converters;
            return this.userController.GetUserIdsYouRequestedToFollowIterator(parameters, request);
        }

        // BLOCK
        public Task<ITwitterResult<IUserDTO>> BlockUserAsync(IBlockUserParameters parameters)
        {
            this.validator.Validate(parameters);
            return ExecuteRequestAsync(request => this.userController.BlockUserAsync(parameters, request));
        }

        public Task<ITwitterResult<IUserDTO>> UnblockUserAsync(IUnblockUserParameters parameters)
        {
            this.validator.Validate(parameters);
            return ExecuteRequestAsync(request => this.userController.UnblockUserAsync(parameters, request));
        }

        public Task<ITwitterResult<IUserDTO>> ReportUserForSpamAsync(IReportUserForSpamParameters parameters)
        {
            this.validator.Validate(parameters);
            return ExecuteRequestAsync(request => this.userController.ReportUserForSpamAsync(parameters, request));
        }

        public ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>> GetBlockedUserIdsIterator(IGetBlockedUserIdsParameters parameters)
        {
            this.validator.Validate(parameters);

            var request = TwitterClient.CreateRequest();
            request.ExecutionContext.Converters = JsonQueryConverterRepository.Converters;
            return this.userController.GetBlockedUserIdsIterator(parameters, request);
        }

        public ITwitterPageIterator<ITwitterResult<IUserCursorQueryResultDTO>> GetBlockedUsersIterator(IGetBlockedUsersParameters parameters)
        {
            this.validator.Validate(parameters);

            var request = TwitterClient.CreateRequest();
            request.ExecutionContext.Converters = JsonQueryConverterRepository.Converters;
            return this.userController.GetBlockedUsersIterator(parameters, request);
        }

        // FRIENDSHIPS
        public Task<ITwitterResult<IRelationshipStateDTO[]>> GetRelationshipsWithAsync(IGetRelationshipsWithParameters parameters)
        {
            this.validator.Validate(parameters);
            return ExecuteRequestAsync(request => this.userController.GetRelationshipsWithAsync(parameters, request));
        }

        // MUTE
        public Task<ITwitterResult<long[]>> GetUserIdsWhoseRetweetsAreMutedAsync(IGetUserIdsWhoseRetweetsAreMutedParameters parameters)
        {
            this.validator.Validate(parameters);
            return ExecuteRequestAsync(request => this.userController.GetUserIdsWhoseRetweetsAreMutedAsync(parameters, request));
        }

        public ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>> GetMutedUserIdsIterator(IGetMutedUserIdsParameters parameters)
        {
            this.validator.Validate(parameters);

            var request = TwitterClient.CreateRequest();
            request.ExecutionContext.Converters = JsonQueryConverterRepository.Converters;
            return this.userController.GetMutedUserIdsIterator(parameters, request);
        }

        public ITwitterPageIterator<ITwitterResult<IUserCursorQueryResultDTO>> GetMutedUsersIterator(IGetMutedUsersParameters parameters)
        {
            this.validator.Validate(parameters);

            var request = TwitterClient.CreateRequest();
            request.ExecutionContext.Converters = JsonQueryConverterRepository.Converters;
            return this.userController.GetMutedUsersIterator(parameters, request);
        }

        public Task<ITwitterResult<IUserDTO>> MuteUserAsync(IMuteUserParameters parameters)
        {
            this.validator.Validate(parameters);
            return ExecuteRequestAsync(request => this.userController.MuteUserAsync(parameters, request));
        }

        public Task<ITwitterResult<IUserDTO>> UnmuteUserAsync(IUnmuteUserParameters parameters)
        {
            this.validator.Validate(parameters);
            return ExecuteRequestAsync(request => this.userController.UnmuteUserAsync(parameters, request));
        }

        public Task<System.IO.Stream> GetProfileImageStream(IGetProfileImageParameters parameters)
        {
            this.validator.Validate(parameters);
            return ExecuteRequestAsync(request => this.userController.GetProfileImageStreamAsync(parameters, request));
        }
    }
}
