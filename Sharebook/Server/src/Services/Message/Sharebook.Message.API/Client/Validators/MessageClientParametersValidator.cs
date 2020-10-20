namespace Sharebook.Message.Client.Validators
{
    using System;
    using System.Linq;

    using Sharebook.Common.Exceptions.Public;
    using Sharebook.Common.Helpers;
    using Sharebook.Common.Settings;
    using Sharebook.Message.Application.Parameters.MessageClient;
    using Sharebook.Message.Domain.AggregateRoots.MessageAggregate;

    public interface IMessagesClientParametersValidator
    {
        void Validate(IPublishMessageParameters parameters);

        void Validate(IDeleteMessageParameters parameters);

        void Validate(IGetMessageParameters parameters);

        void Validate(IGetMessagesParameters parameters);
    }

    public class MessagesClientParametersValidator : IMessagesClientParametersValidator
    {
        private readonly ITwitterClient client;
        private readonly IMessagesClientRequiredParametersValidator messagesClientRequiredParametersValidator;

        public MessagesClientParametersValidator(
            ITwitterClient client,
            IMessagesClientRequiredParametersValidator messagesClientRequiredParametersValidator)
        {
            this.client = client;
            this.messagesClientRequiredParametersValidator = messagesClientRequiredParametersValidator;
        }

        private WorldFeedLimits Limits => this.client.Config.Limits;

        public void Validate(IPublishMessageParameters parameters)
        {
            this.messagesClientRequiredParametersValidator.Validate(parameters);

            if (parameters.Text.UTF32Length() > Limits.MESSAGE_MAX_SIZE)
            {
                throw new TwitterArgumentLimitException($"{nameof(parameters.Text)}",
                    Limits.MESSAGE_MAX_SIZE,
                    nameof(Limits.MESSAGE_MAX_SIZE),
                    "characters");
            }

            if (parameters.QuickReplyOptions != null && parameters.QuickReplyOptions.Length > 0)
            {
                if (parameters.QuickReplyOptions.Length > Limits.MESSAGE_QUICK_REPLY_MAX_OPTIONS)
                {
                    throw new TwitterArgumentLimitException($"{nameof(parameters.QuickReplyOptions)}",
                        Limits.MESSAGE_QUICK_REPLY_MAX_OPTIONS,
                        nameof(Limits.MESSAGE_QUICK_REPLY_MAX_OPTIONS),
                        "options");
                }

                // If one option has a description, then they all must
                //  https://developer.twitter.com/en/docs/direct-messages/quick-replies/api-reference/options
                var numberOfOptionsWithDescription = parameters.QuickReplyOptions.Count(x => !string.IsNullOrEmpty(x.Description));
                if (numberOfOptionsWithDescription > 0 && numberOfOptionsWithDescription != parameters.QuickReplyOptions.Length)
                {
                    throw new ArgumentException("If one Quick Reply Option has a description, then they all must", $"{nameof(parameters.QuickReplyOptions)}");
                }

                if (numberOfOptionsWithDescription > 0 && parameters.QuickReplyOptions.Any(x => x.Description.UTF32Length() > Limits.MESSAGE_QUICK_REPLY_DESCRIPTION_MAX_LENGTH))
                {
                    throw new TwitterArgumentLimitException($"{nameof(parameters.QuickReplyOptions)}.{nameof(QuickReplyOption.Description)}",
                        Limits.MESSAGE_QUICK_REPLY_DESCRIPTION_MAX_LENGTH,
                        nameof(Limits.MESSAGE_QUICK_REPLY_DESCRIPTION_MAX_LENGTH),
                        "characters per quick option description");
                }

                if (parameters.QuickReplyOptions.Any(x => string.IsNullOrEmpty(x.Label)))
                {
                    throw new ArgumentException("Quick Reply Option Label is a required field",
                    $"{nameof(parameters)}{nameof(parameters.QuickReplyOptions)}.{nameof(QuickReplyOption.Label)}");
                }

                if (parameters.QuickReplyOptions.Any(x => x.Label.UTF32Length() > Limits.MESSAGE_QUICK_REPLY_LABEL_MAX_LENGTH))
                {
                    throw new TwitterArgumentLimitException($"{nameof(parameters.QuickReplyOptions)}.{nameof(QuickReplyOption.Label)}",
                        Limits.MESSAGE_QUICK_REPLY_LABEL_MAX_LENGTH,
                        nameof(Limits.MESSAGE_QUICK_REPLY_LABEL_MAX_LENGTH),
                        "characters per quick option label");
                }

                if (parameters.QuickReplyOptions.Any(x => x.Metadata.UTF32Length() > Limits.MESSAGE_QUICK_REPLY_METADATA_MAX_LENGTH))
                {
                    throw new TwitterArgumentLimitException($"{nameof(parameters.QuickReplyOptions)}",
                        Limits.MESSAGE_QUICK_REPLY_METADATA_MAX_LENGTH,
                        nameof(Limits.MESSAGE_QUICK_REPLY_METADATA_MAX_LENGTH),
                        "characters per quick option metadata ");
                }
            }
        }

        public void Validate(IDeleteMessageParameters parameters)
        {
            this.messagesClientRequiredParametersValidator.Validate(parameters);
        }

        public void Validate(IGetMessageParameters parameters)
        {
            this.messagesClientRequiredParametersValidator.Validate(parameters);
        }

        public void Validate(IGetMessagesParameters parameters)
        {
            this.messagesClientRequiredParametersValidator.Validate(parameters);

            var maxPageSize = Limits.MESSAGES_GET_MAX_PAGE_SIZE;
            if (parameters.PageSize > maxPageSize)
            {
                throw new TwitterArgumentLimitException($"{nameof(parameters.PageSize)}", maxPageSize, nameof(Limits.MESSAGES_GET_MAX_PAGE_SIZE), "page size");
            }
        }
    }
}
