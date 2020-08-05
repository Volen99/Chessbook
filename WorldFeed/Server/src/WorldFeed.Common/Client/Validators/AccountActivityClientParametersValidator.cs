namespace WorldFeed.Common.Client.Validators
{
    using WorldFeed.Common.Public.Parameters.AccountActivity;

    public interface IAccountActivityClientParametersValidator
    {
        void Validate(ICreateAccountActivityWebhookParameters parameters);

        void Validate(IGetAccountActivityWebhookEnvironmentsParameters parameters);

        void Validate(IGetAccountActivityEnvironmentWebhooksParameters parameters);

        void Validate(IDeleteAccountActivityWebhookParameters parameters);

        void Validate(ITriggerAccountActivityWebhookCRCParameters parameters);

        void Validate(ISubscribeToAccountActivityParameters parameters);

        void Validate(ICountAccountActivitySubscriptionsParameters parameters);

        void Validate(IIsAccountSubscribedToAccountActivityParameters parameters);

        void Validate(IGetAccountActivitySubscriptionsParameters parameters);

        void Validate(IUnsubscribeFromAccountActivityParameters parameters);
    }

    public class AccountActivityClientParametersValidator : IAccountActivityClientParametersValidator
    {
        private readonly IAccountActivityClientRequiredParametersValidator activityClientRequiredParametersValidator;

        public AccountActivityClientParametersValidator(IAccountActivityClientRequiredParametersValidator activityClientRequiredParametersValidator)
        {
            this.activityClientRequiredParametersValidator = activityClientRequiredParametersValidator;
        }

        public void Validate(ICreateAccountActivityWebhookParameters parameters)
        {
            this.activityClientRequiredParametersValidator.Validate(parameters);
        }

        public void Validate(IGetAccountActivityWebhookEnvironmentsParameters parameters)
        {
            this.activityClientRequiredParametersValidator.Validate(parameters);
        }

        public void Validate(IGetAccountActivityEnvironmentWebhooksParameters parameters)
        {
            this.activityClientRequiredParametersValidator.Validate(parameters);
        }

        public void Validate(IDeleteAccountActivityWebhookParameters parameters)
        {
            this.activityClientRequiredParametersValidator.Validate(parameters);
        }

        public void Validate(ITriggerAccountActivityWebhookCRCParameters parameters)
        {
            this.activityClientRequiredParametersValidator.Validate(parameters);
        }

        public void Validate(ISubscribeToAccountActivityParameters parameters)
        {
            this.activityClientRequiredParametersValidator.Validate(parameters);
        }

        public void Validate(ICountAccountActivitySubscriptionsParameters parameters)
        {
            this.activityClientRequiredParametersValidator.Validate(parameters);
        }

        public void Validate(IIsAccountSubscribedToAccountActivityParameters parameters)
        {
            this.activityClientRequiredParametersValidator.Validate(parameters);
        }

        public void Validate(IGetAccountActivitySubscriptionsParameters parameters)
        {
            this.activityClientRequiredParametersValidator.Validate(parameters);
        }

        public void Validate(IUnsubscribeFromAccountActivityParameters parameters)
        {
            this.activityClientRequiredParametersValidator.Validate(parameters);
        }
    }
}
