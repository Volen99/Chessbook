namespace WorldFeed.Common.Client.Validators
{
    using System;

    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Parameters.ListsClient;
    using WorldFeed.Common.Public.Parameters.ListsClient.Members;
    using WorldFeed.Common.Public.Parameters.ListsClient.Subscribers;

    public interface ITwitterListsClientRequiredParametersValidator : ITwitterListsClientParametersValidator
    {

    }

    public class TwitterListsClientRequiredParametersValidator : ITwitterListsClientRequiredParametersValidator
    {
        private readonly IUserQueryValidator userQueryValidator;

        public TwitterListsClientRequiredParametersValidator(IUserQueryValidator userQueryValidator)
        {
            this.userQueryValidator = userQueryValidator;
        }

        public void Validate(ICreateListParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }

            if (string.IsNullOrEmpty(parameters.Name))
            {
                throw new ArgumentNullException($"{nameof(parameters.Name)}");
            }
        }

        public void Validate(IGetListParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }

            ThrowIfListIdentifierIsNotValid(parameters.List);
        }

        public void Validate(IGetListsSubscribedByUserParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }
        }

        public void Validate(IUpdateListParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }

            ThrowIfListIdentifierIsNotValid(parameters.List);
        }

        public void Validate(IDestroyListParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }

            ThrowIfListIdentifierIsNotValid(parameters.List);
        }

        public void Validate(IGetListsOwnedByUserParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }

            this.userQueryValidator.ThrowIfUserCannotBeIdentified(parameters.User);
        }

        public void Validate(IGetTweetsFromListParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }

            ThrowIfListIdentifierIsNotValid(parameters.List);
        }

        public void Validate(IAddMemberToListParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }

            ThrowIfListIdentifierIsNotValid(parameters.List);
            this.userQueryValidator.ThrowIfUserCannotBeIdentified(parameters.User);
        }

        public void Validate(IAddMembersToListParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }

            ThrowIfListIdentifierIsNotValid(parameters.List);
        }

        public void Validate(IGetUserListMembershipsParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }

            this.userQueryValidator.ThrowIfUserCannotBeIdentified(parameters.User);
        }

        public void Validate(IGetMembersOfListParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }

            ThrowIfListIdentifierIsNotValid(parameters.List);
        }

        public void Validate(ICheckIfUserIsMemberOfListParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }

            ThrowIfListIdentifierIsNotValid(parameters.List);
            this.userQueryValidator.ThrowIfUserCannotBeIdentified(parameters.User);
        }

        public void Validate(IRemoveMemberFromListParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }

            ThrowIfListIdentifierIsNotValid(parameters.List);
            this.userQueryValidator.ThrowIfUserCannotBeIdentified(parameters.User);
        }

        public void Validate(IRemoveMembersFromListParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }

            ThrowIfListIdentifierIsNotValid(parameters.List);
        }

        // SUBSCRIBERS
        public void Validate(ISubscribeToListParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }

            ThrowIfListIdentifierIsNotValid(parameters.List);
        }

        public void Validate(IUnsubscribeFromListParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }

            ThrowIfListIdentifierIsNotValid(parameters.List);
        }

        public void Validate(IGetListSubscribersParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }

            ThrowIfListIdentifierIsNotValid(parameters.List);
        }

        public void Validate(IGetUserListSubscriptionsParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }

            this.userQueryValidator.ThrowIfUserCannotBeIdentified(parameters.User);
        }

        public void Validate(ICheckIfUserIsSubscriberOfListParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }

            ThrowIfListIdentifierIsNotValid(parameters.List);
            this.userQueryValidator.ThrowIfUserCannotBeIdentified(parameters.User);
        }

        public void ThrowIfListIdentifierIsNotValid(ITwitterListIdentifier twitterListIdentifier)
        {
            if (twitterListIdentifier == null)
            {
                throw new ArgumentNullException(nameof(twitterListIdentifier), $"{nameof(twitterListIdentifier)} cannot be null");
            }

            var isIdValid = twitterListIdentifier.Id > 0;
            var isSlugWithUsernameValid = twitterListIdentifier.Slug != null && (twitterListIdentifier.OwnerScreenName != null || twitterListIdentifier.OwnerId > 0);

            if (!isIdValid && !isSlugWithUsernameValid)
            {
                throw new ArgumentException("List identifier(id or slug + userIdentifier) must be specified.");
            }
        }
    }
}
