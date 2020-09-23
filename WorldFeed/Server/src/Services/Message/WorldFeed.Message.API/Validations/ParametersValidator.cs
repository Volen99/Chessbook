namespace WorldFeed.Message.API.Validations
{
    using WorldFeed.Message.Application.Parameters.MessageClient;
    using WorldFeed.Message.Client.Validators;

    public interface IParametersValidator : IMessagesClientParametersValidator
    {
    }

    public class ParametersValidator : IParametersValidator
    {
        private readonly IMessagesClientParametersValidator messagesClientParametersValidator;

        public ParametersValidator(IMessagesClientParametersValidator messagesClientParametersValidator)
        {
            this.messagesClientParametersValidator = messagesClientParametersValidator;
        }

        public void Validate(IPublishMessageParameters parameters)
        {
            this.messagesClientParametersValidator.Validate(parameters);
        }

        public void Validate(IDeleteMessageParameters parameters)
        {
            this.messagesClientParametersValidator.Validate(parameters);
        }

        public void Validate(IGetMessageParameters parameters)
        {
            this.messagesClientParametersValidator.Validate(parameters);
        }

        public void Validate(IGetMessagesParameters parameters)
        {
            this.messagesClientParametersValidator.Validate(parameters);
        }
    }
}
