namespace Sharebook.Post.Client.Validators
{
    using System;
    using System.Linq;

    using Sharebook.Common.Public.Models.Interfaces;
    using Sharebook.Post.Application.Parameters.TweetsClient;

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

        public void Validate(IGetTweetParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }

            ThrowIfTweetCannotBeUsed(parameters.Tweet, $"{nameof(parameters.Tweet)}");
        }

        public void Validate(IGetTweetsParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }

            if (parameters.Tweets == null)
            {
                throw new ArgumentNullException();
            }

            if (parameters.Tweets.Length == 0)
            {
                throw new ArgumentException("You need at least 1 tweet id", $"{nameof(parameters.Tweets)}");
            }

            var validTweetIdentifiers = parameters.Tweets.Where(x => x?.Id != null || !string.IsNullOrEmpty(x?.IdStr));

            if (!validTweetIdentifiers.Any())
            {
                throw new ArgumentException("There are no valid tweet identifiers", $"{nameof(parameters.Tweets)}");
            }
        }

        public void Validate(IDestroyTweetParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }

            ThrowIfTweetCannotBeUsed(parameters.Tweet, $"{nameof(parameters.Tweet)}");
        }

        public void Validate(IGetUserFavoriteTweetsParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }

            this.userQueryValidator.ThrowIfUserCannotBeIdentified(parameters.User, $"{nameof(parameters.User)}");
        }

        public void Validate(IGetRetweetsParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }

            ThrowIfTweetCannotBeUsed(parameters.Tweet, $"{nameof(parameters.Tweet)}");
        }

        public void Validate(IDestroyRetweetParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }

            ThrowIfTweetCannotBeUsed(parameters.Tweet, $"{nameof(parameters.Tweet)}");
        }

        public void Validate(IGetRetweeterIdsParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }
        }

        public void Validate(IFavoriteTweetParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }

            ThrowIfTweetCannotBeUsed(parameters.Tweet, $"{nameof(parameters.Tweet)}");
        }

        public void Validate(IUnfavoriteTweetParameters parameters)
        {
            if (parameters == null)
            {
                throw new ArgumentNullException(nameof(parameters));
            }

            ThrowIfTweetCannotBeUsed(parameters.Tweet, $"{nameof(parameters.Tweet)}");
        }

        public void Validate(IGetOEmbedTweetParameters parameters)
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
