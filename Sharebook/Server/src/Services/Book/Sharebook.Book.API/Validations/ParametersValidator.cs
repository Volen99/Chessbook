namespace Sharebook.Post.API.Application.Validations
{
    using Sharebook.Book.Application.Parameters.ListsClient;
    using Sharebook.Book.Application.Parameters.ListsClient.Members;
    using Sharebook.Book.Application.Parameters.ListsClient.Subscribers;
    using Sharebook.Book.Client.Validators;

    public interface IParametersValidator : ITwitterListsClientParametersValidator
    {
    }

    public class ParametersValidator : IParametersValidator
    {
        private readonly ITwitterListsClientParametersValidator twitterListsClientParametersValidator;

        public ParametersValidator(ITwitterListsClientParametersValidator twitterListsClientParametersValidator)
        {
            this.twitterListsClientParametersValidator = twitterListsClientParametersValidator;   
        }

        public void Validate(ICreateListParameters parameters)
        {
            this.twitterListsClientParametersValidator.Validate(parameters);
        }

        public void Validate(IGetListParameters parameters)
        {
            this.twitterListsClientParametersValidator.Validate(parameters);
        }

        public void Validate(IGetListsSubscribedByUserParameters parameters)
        {
            this.twitterListsClientParametersValidator.Validate(parameters);
        }

        public void Validate(IUpdateListParameters parameters)
        {
            this.twitterListsClientParametersValidator.Validate(parameters);
        }

        public void Validate(IDestroyListParameters parameters)
        {
            this.twitterListsClientParametersValidator.Validate(parameters);
        }

        public void Validate(IGetListsOwnedByUserParameters parameters)
        {
            this.twitterListsClientParametersValidator.Validate(parameters);
        }

        public void Validate(IGetTweetsFromListParameters parameters)
        {
            this.twitterListsClientParametersValidator.Validate(parameters);
        }

        public void Validate(IAddMemberToListParameters parameters)
        {
            this.twitterListsClientParametersValidator.Validate(parameters);
        }

        public void Validate(IAddMembersToListParameters parameters)
        {
            this.twitterListsClientParametersValidator.Validate(parameters);
        }

        public void Validate(IGetUserListMembershipsParameters parameters)
        {
            this.twitterListsClientParametersValidator.Validate(parameters);
        }

        public void Validate(IGetMembersOfListParameters parameters)
        {
            this.twitterListsClientParametersValidator.Validate(parameters);
        }

        public void Validate(ICheckIfUserIsMemberOfListParameters parameters)
        {
            this.twitterListsClientParametersValidator.Validate(parameters);
        }

        public void Validate(IRemoveMemberFromListParameters parameters)
        {
            this.twitterListsClientParametersValidator.Validate(parameters);
        }

        public void Validate(IRemoveMembersFromListParameters parameters)
        {
            this.twitterListsClientParametersValidator.Validate(parameters);
        }

        public void Validate(ISubscribeToListParameters parameters)
        {
            this.twitterListsClientParametersValidator.Validate(parameters);
        }

        public void Validate(IUnsubscribeFromListParameters parameters)
        {
            this.twitterListsClientParametersValidator.Validate(parameters);
        }

        public void Validate(IGetListSubscribersParameters parameters)
        {
            this.twitterListsClientParametersValidator.Validate(parameters);
        }

        public void Validate(IGetUserListSubscriptionsParameters parameters)
        {
            this.twitterListsClientParametersValidator.Validate(parameters);
        }

        public void Validate(ICheckIfUserIsSubscriberOfListParameters parameters)
        {
            this.twitterListsClientParametersValidator.Validate(parameters);
        }
    }
}
