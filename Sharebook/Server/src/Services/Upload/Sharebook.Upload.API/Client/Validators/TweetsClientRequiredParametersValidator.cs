namespace Sharebook.Upload.Client.Validators
{
    using System;
    using System.Linq;

    using Sharebook.Common.Public.Models.Interfaces;
    using Sharebook.Upload.Application.Parameters.TweetsClient;

    public interface ITweetsClientRequiredParametersValidator : ITweetsClientParametersValidator
    {
    }

    public class TweetsClientRequiredParametersValidator : ITweetsClientRequiredParametersValidator
    {
        private readonly IUserQueryValidator userQueryValidator;

        public TweetsClientRequiredParametersValidator(IUserQueryValidator userQueryValidator)
        {
            this.userQueryValidator = userQueryValidator;
        }

        public void Validate(IPublishTweetParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }

            if (parameters.InReplyToTweet != null)
            {
                ThrowIfTweetCannotBeUsed(parameters.InReplyToTweet);
            }

            if (parameters.QuotedTweet != null)
            {
                ThrowIfTweetCannotBeUsed(parameters.QuotedTweet);
            }

            if (parameters.Medias.Any(x => !x.HasBeenUploaded))
            {
                throw new ArgumentException("Some media were not uploaded", $"{nameof(parameters.Medias)}");
            }
        }

        public void Validate(IPublishRetweetParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }

            ThrowIfTweetCannotBeUsed(parameters.Tweet, $"{nameof(parameters.Tweet)}");
        }

        public void ThrowIfTweetCannotBeUsed(ITweetIdentifier tweet)
        {
            ThrowIfTweetCannotBeUsed(tweet, $"{nameof(tweet)}.{nameof(tweet.Id)}");
        }

        public void ThrowIfTweetCannotBeUsed(ITweetIdentifier tweet, string parameterName)
        {
            if (tweet == null)
            {
                throw new ArgumentNullException($"{nameof(tweet)}");
            }

            if (!IsValidTweetIdentifier(tweet))
            {
                throw new ArgumentException(parameterName);
            }
        }

        private bool IsValidTweetIdentifier(ITweetIdentifier tweetIdentifier)
        {
            return tweetIdentifier != null && tweetIdentifier.Id > 0;
        }
    }
}
