namespace Sharebook.Profile.Client.Validators
{
    using System;
    using System.Linq;

    using Sharebook.Profile.Application.Parameters.AccountClient;
    using Sharebook.Profile.Application.Parameters.UsersClient;

    public interface IUsersClientRequiredParametersValidator : IUsersClientParametersValidator
    {
    }

    public class UsersClientRequiredParametersValidator : IUsersClientRequiredParametersValidator
    {
        private readonly IUserQueryValidator userQueryValidator;

        public UsersClientRequiredParametersValidator(IUserQueryValidator userQueryValidator)
        {
            this.userQueryValidator = userQueryValidator;
        }

        public void Validate(IGetUserParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }

            this.userQueryValidator.ThrowIfUserCannotBeIdentified(parameters.User);
        }

        public void Validate(IGetUsersParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }

            if (parameters.Users == null)
            {
                throw new ArgumentNullException($"{nameof(parameters.Users)}");
            }
        }

        public void Validate(IGetFollowerIdsParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }

            this.userQueryValidator.ThrowIfUserCannotBeIdentified(parameters.User, $"{nameof(parameters.User)}");
        }

        public void Validate(IGetFollowersParameters parameters)
        {
            Validate(parameters as IGetFollowerIdsParameters);
        }

        public void Validate(IGetFriendIdsParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }

            this.userQueryValidator.ThrowIfUserCannotBeIdentified(parameters.User, $"{nameof(parameters.User)}");
        }

        public void Validate(IGetFriendsParameters parameters)
        {
            Validate(parameters as IGetFriendIdsParameters);
        }

        public void Validate(IGetRelationshipBetweenParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }

            this.userQueryValidator.ThrowIfUserCannotBeIdentified(parameters.SourceUser, $"{nameof(parameters.SourceUser)}");
            this.userQueryValidator.ThrowIfUserCannotBeIdentified(parameters.TargetUser, $"{nameof(parameters.TargetUser)}");
        }

        public void Validate(IGetProfileImageParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }

            if (parameters.ImageUrl == null)
            {
                throw new ArgumentNullException($"{nameof(parameters.ImageUrl)}");
            }

            if (!Uri.IsWellFormedUriString(parameters.ImageUrl, UriKind.Absolute))
            {
                throw new ArgumentException("ImageUrl has to be valid absolute url", $"{nameof(parameters.ImageUrl)}");
            }
        }

        public void Validate(IGetAuthenticatedUserParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }
        }

        public void Validate(IBlockUserParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }

            this.userQueryValidator.ThrowIfUserCannotBeIdentified(parameters.User, $"{nameof(parameters.User)}");
        }

        public void Validate(IUnblockUserParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }

            this.userQueryValidator.ThrowIfUserCannotBeIdentified(parameters.User, $"{nameof(parameters.User)}");
        }

        public void Validate(IReportUserForSpamParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }

            this.userQueryValidator.ThrowIfUserCannotBeIdentified(parameters.User, $"{nameof(parameters.User)}");
        }

        public void Validate(IGetBlockedUserIdsParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }
        }

        public void Validate(IGetBlockedUsersParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }
        }

        public void Validate(IFollowUserParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }

            this.userQueryValidator.ThrowIfUserCannotBeIdentified(parameters.User, $"{nameof(parameters.User)}");
        }

        public void Validate(IUnfollowUserParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }

            this.userQueryValidator.ThrowIfUserCannotBeIdentified(parameters.User, $"{nameof(parameters.User)}");
        }

        public void Validate(IGetUserIdsRequestingFriendshipParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }
        }

        public void Validate(IGetUsersRequestingFriendshipParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }
        }

        public void Validate(IGetUserIdsYouRequestedToFollowParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }
        }

        public void Validate(IGetUsersYouRequestedToFollowParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }
        }

        public void Validate(IUpdateRelationshipParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }

            this.userQueryValidator.ThrowIfUserCannotBeIdentified(parameters.User, $"{nameof(parameters.User)}");
        }

        public void Validate(IGetRelationshipsWithParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }

            if (parameters.Users == null)
            {
                throw new ArgumentNullException($"{nameof(parameters.Users)}");
            }

            if (parameters.Users.All(user => user.Id <= 0 && string.IsNullOrEmpty(user.IdStr) && string.IsNullOrEmpty(user.ScreenName)))
            {
                throw new ArgumentException("At least 1 valid user identifier is required.", $"{nameof(parameters.Users)}");
            }
        }

        public void Validate(IGetUserIdsWhoseRetweetsAreMutedParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }
        }

        public void Validate(IGetMutedUserIdsParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }
        }

        public void Validate(IGetMutedUsersParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }
        }

        public void Validate(IMuteUserParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }

            this.userQueryValidator.ThrowIfUserCannotBeIdentified(parameters.User, $"{nameof(parameters.User)}");
        }

        public void Validate(IUnmuteUserParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }

            this.userQueryValidator.ThrowIfUserCannotBeIdentified(parameters.User, $"{nameof(parameters.User)}");
        }
    }
}
