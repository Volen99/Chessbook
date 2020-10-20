namespace Sharebook.Profile.Client.Validators
{
    using Sharebook.Common.Exceptions.Public;
    using Sharebook.Common.Settings;
    using Sharebook.Profile.Application.Parameters.AccountClient;
    using Sharebook.Profile.Application.Parameters.UsersClient;

    public interface IUsersClientParametersValidator
    {
        void Validate(IGetAuthenticatedUserParameters parameters);

        void Validate(IGetUserParameters parameters);

        void Validate(IGetUsersParameters parameters);

        void Validate(IGetFollowerIdsParameters parameters);

        void Validate(IGetFollowersParameters parameters);

        void Validate(IGetFriendIdsParameters parameters);

        void Validate(IGetFriendsParameters parameters);

        void Validate(IGetProfileImageParameters parameters);

        void Validate(IBlockUserParameters parameters);

        void Validate(IUnblockUserParameters parameters);

        void Validate(IReportUserForSpamParameters parameters);

        void Validate(IGetBlockedUserIdsParameters parameters);

        void Validate(IGetBlockedUsersParameters parameters);

        void Validate(IFollowUserParameters parameters);

        void Validate(IUnfollowUserParameters parameters);

        void Validate(IGetUserIdsRequestingFriendshipParameters parameters);

        void Validate(IGetUsersRequestingFriendshipParameters parameters);

        void Validate(IGetUserIdsYouRequestedToFollowParameters parameters);

        void Validate(IGetUsersYouRequestedToFollowParameters parameters);

        // RELATIONSHIPS
        void Validate(IUpdateRelationshipParameters parameters);

        void Validate(IGetRelationshipsWithParameters parameters);

        void Validate(IGetRelationshipBetweenParameters parameters);

        //  MUTE
        void Validate(IGetUserIdsWhoseRetweetsAreMutedParameters parameters);

        void Validate(IGetMutedUserIdsParameters parameters);

        void Validate(IGetMutedUsersParameters parameters);

        void Validate(IMuteUserParameters parameters);

        void Validate(IUnmuteUserParameters parameters);
    }

    public class UsersClientParametersValidator : IUsersClientParametersValidator
    {
        private readonly IUsersClientRequiredParametersValidator usersClientRequiredParametersValidator;
        private readonly ITwitterClient client;

        public UsersClientParametersValidator(
            ITwitterClient client,
            IUsersClientRequiredParametersValidator usersClientRequiredParametersValidator)
        {
            this.client = client;
            this.usersClientRequiredParametersValidator = usersClientRequiredParametersValidator;
        }

        private WorldFeedLimits Limits => this.client.Config.Limits;

        public void Validate(IGetUserParameters parameters)
        {
            this.usersClientRequiredParametersValidator.Validate(parameters);
        }

        public void Validate(IGetUsersParameters parameters)
        {
            this.usersClientRequiredParametersValidator.Validate(parameters);

            var maxSize = Limits.USERS_GET_USERS_MAX_SIZE;
            if (parameters.Users.Length > maxSize)
            {
                throw new TwitterArgumentLimitException($"{nameof(parameters.Users)}", maxSize, nameof(Limits.USERS_GET_USERS_MAX_SIZE), "users");
            }
        }

        public void Validate(IGetFollowerIdsParameters parameters)
        {
            this.usersClientRequiredParametersValidator.Validate(parameters);

            var maxPageSize = Limits.USERS_GET_FOLLOWER_IDS_PAGE_MAX_SIZE;
            if (parameters.PageSize > maxPageSize)
            {
                throw new TwitterArgumentLimitException($"{nameof(parameters.PageSize)}", maxPageSize, nameof(Limits.USERS_GET_FOLLOWER_IDS_PAGE_MAX_SIZE), "page size");
            }
        }

        public void Validate(IGetFollowersParameters parameters)
        {
            this.usersClientRequiredParametersValidator.Validate(parameters);

            Validate(parameters as IGetFollowerIdsParameters);

            var maxUserPerPage = Limits.USERS_GET_USERS_MAX_SIZE;
            if (parameters.GetUsersPageSize > maxUserPerPage)
            {
                throw new TwitterArgumentLimitException($"{nameof(parameters.GetUsersPageSize)}", maxUserPerPage, nameof(Limits.USERS_GET_USERS_MAX_SIZE), "user ids");
            }
        }

        public void Validate(IGetFriendIdsParameters parameters)
        {
            this.usersClientRequiredParametersValidator.Validate(parameters);

            var maxPageSize = Limits.USERS_GET_FRIEND_IDS_PAGE_MAX_SIZE;
            if (parameters.PageSize > maxPageSize)
            {
                throw new TwitterArgumentLimitException($"{nameof(parameters.PageSize)}", maxPageSize, nameof(Limits.USERS_GET_FRIEND_IDS_PAGE_MAX_SIZE), "page size");
            }
        }

        public void Validate(IGetFriendsParameters parameters)
        {
            this.usersClientRequiredParametersValidator.Validate(parameters);

            Validate(parameters as IGetFriendIdsParameters);

            var maxUserPerPage = Limits.USERS_GET_USERS_MAX_SIZE;
            if (parameters.GetUsersPageSize > maxUserPerPage)
            {
                throw new TwitterArgumentLimitException($"{nameof(parameters.GetUsersPageSize)}", maxUserPerPage, nameof(Limits.USERS_GET_USERS_MAX_SIZE), "user ids");
            }
        }

        public void Validate(IGetRelationshipBetweenParameters parameters)
        {
            this.usersClientRequiredParametersValidator.Validate(parameters);
        }

        public void Validate(IGetProfileImageParameters parameters)
        {
            this.usersClientRequiredParametersValidator.Validate(parameters);
        }

        public void Validate(IGetAuthenticatedUserParameters parameters)
        {
            this.usersClientRequiredParametersValidator.Validate(parameters);
        }

        public void Validate(IBlockUserParameters parameters)
        {
            this.usersClientRequiredParametersValidator.Validate(parameters);
        }

        public void Validate(IUnblockUserParameters parameters)
        {
            this.usersClientRequiredParametersValidator.Validate(parameters);
        }

        public void Validate(IReportUserForSpamParameters parameters)
        {
            this.usersClientRequiredParametersValidator.Validate(parameters);
        }

        public void Validate(IGetBlockedUserIdsParameters parameters)
        {
            this.usersClientRequiredParametersValidator.Validate(parameters);

            var maxPageSize = Limits.ACCOUNT_GET_BLOCKED_USER_IDS_MAX_PAGE_SIZE;
            if (parameters.PageSize > maxPageSize)
            {
                throw new TwitterArgumentLimitException($"{nameof(parameters.PageSize)}", maxPageSize, nameof(Limits.ACCOUNT_GET_BLOCKED_USER_IDS_MAX_PAGE_SIZE), "page size");
            }
        }

        public void Validate(IGetBlockedUsersParameters parameters)
        {
            this.usersClientRequiredParametersValidator.Validate(parameters);

            var maxPageSize = Limits.ACCOUNT_GET_BLOCKED_USER_MAX_PAGE_SIZE;
            if (parameters.PageSize > maxPageSize)
            {
                throw new TwitterArgumentLimitException($"{nameof(parameters.PageSize)}", maxPageSize, nameof(Limits.ACCOUNT_GET_BLOCKED_USER_MAX_PAGE_SIZE), "page size");
            }
        }

        public void Validate(IFollowUserParameters parameters)
        {
            this.usersClientRequiredParametersValidator.Validate(parameters);
        }

        public void Validate(IUnfollowUserParameters parameters)
        {
            this.usersClientRequiredParametersValidator.Validate(parameters);
        }

        public void Validate(IGetUserIdsRequestingFriendshipParameters parameters)
        {
            this.usersClientRequiredParametersValidator.Validate(parameters);

            var maxPageSize = Limits.ACCOUNT_GET_USER_IDS_REQUESTING_FRIENDSHIP_MAX_PAGE_SIZE;
            if (parameters.PageSize > maxPageSize)
            {
                throw new TwitterArgumentLimitException($"{nameof(parameters.PageSize)}", maxPageSize, nameof(Limits.ACCOUNT_GET_USER_IDS_REQUESTING_FRIENDSHIP_MAX_PAGE_SIZE),
                    "page size");
            }
        }

        public void Validate(IGetUsersRequestingFriendshipParameters parameters)
        {
            Validate(parameters as IGetUserIdsRequestingFriendshipParameters);

            var maxSize = Limits.USERS_GET_USERS_MAX_SIZE;
            if (parameters.GetUsersPageSize > maxSize)
            {
                throw new TwitterArgumentLimitException($"{nameof(parameters.GetUsersPageSize)}", maxSize, nameof(Limits.USERS_GET_USERS_MAX_SIZE), "users");
            }
        }

        public void Validate(IGetUserIdsYouRequestedToFollowParameters parameters)
        {
            this.usersClientRequiredParametersValidator.Validate(parameters);

            var maxPageSize = Limits.ACCOUNT_GET_REQUESTED_USER_IDS_TO_FOLLOW_MAX_PAGE_SIZE;
            if (parameters.PageSize > maxPageSize)
            {
                throw new TwitterArgumentLimitException($"{nameof(parameters.PageSize)}", maxPageSize, nameof(Limits.ACCOUNT_GET_REQUESTED_USER_IDS_TO_FOLLOW_MAX_PAGE_SIZE),
                    "page size");
            }
        }

        public void Validate(IGetUsersYouRequestedToFollowParameters parameters)
        {
            Validate(parameters as IGetUserIdsYouRequestedToFollowParameters);

            var maxSize = Limits.USERS_GET_USERS_MAX_SIZE;
            if (parameters.GetUsersPageSize > maxSize)
            {
                throw new TwitterArgumentLimitException($"{nameof(parameters.GetUsersPageSize)}", maxSize, nameof(Limits.USERS_GET_USERS_MAX_SIZE), "users");
            }
        }

        public void Validate(IUpdateRelationshipParameters parameters)
        {
            this.usersClientRequiredParametersValidator.Validate(parameters);
        }

        public void Validate(IGetRelationshipsWithParameters parameters)
        {
            this.usersClientRequiredParametersValidator.Validate(parameters);

            var maxUsers = Limits.ACCOUNT_GET_RELATIONSHIPS_WITH_MAX_SIZE;
            if (parameters.Users.Length > maxUsers)
            {
                throw new TwitterArgumentLimitException($"{nameof(parameters.Users)}", maxUsers, nameof(Limits.ACCOUNT_GET_RELATIONSHIPS_WITH_MAX_SIZE), "users");
            }
        }

        public void Validate(IGetUserIdsWhoseRetweetsAreMutedParameters parameters)
        {
            this.usersClientRequiredParametersValidator.Validate(parameters);
        }

        public void Validate(IGetMutedUserIdsParameters parameters)
        {
            this.usersClientRequiredParametersValidator.Validate(parameters);

            var maxPageSize = Limits.ACCOUNT_GET_MUTED_USER_IDS_MAX_PAGE_SIZE;
            if (parameters.PageSize > maxPageSize)
            {
                throw new TwitterArgumentLimitException($"{nameof(parameters.PageSize)}", maxPageSize, nameof(Limits.ACCOUNT_GET_MUTED_USER_IDS_MAX_PAGE_SIZE), "users");
            }
        }

        public void Validate(IGetMutedUsersParameters parameters)
        {
            this.usersClientRequiredParametersValidator.Validate(parameters);

            var maxPageSize = Limits.ACCOUNT_GET_MUTED_USERS_MAX_PAGE_SIZE;
            if (parameters.PageSize > maxPageSize)
            {
                throw new TwitterArgumentLimitException($"{nameof(parameters.PageSize)}", maxPageSize, nameof(Limits.ACCOUNT_GET_MUTED_USERS_MAX_PAGE_SIZE), "users");
            }
        }

        public void Validate(IMuteUserParameters parameters)
        {
            this.usersClientRequiredParametersValidator.Validate(parameters);
        }

        public void Validate(IUnmuteUserParameters parameters)
        {
            this.usersClientRequiredParametersValidator.Validate(parameters);
        }
    }
}
