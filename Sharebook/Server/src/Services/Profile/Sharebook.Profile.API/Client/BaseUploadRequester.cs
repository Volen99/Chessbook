namespace Sharebook.Profile.Client
{
    using System;
    using System.Threading.Tasks;

    using Sharebook.Common.Events;
    using Sharebook.Common.Exceptions.Public;
    using Sharebook.Profile.Application.Requesters;
    using Sharebook.Profile.Infrastructure.Inject;

    public interface IBaseUploadRequester
    {
    }

    public abstract class BaseUploadRequester : IBaseUploadRequester
    {
        protected ITwitterClient TwitterClient { get; }
        private readonly ITwitterClientEvents twitterClientEvents;

        protected BaseUploadRequester(ITwitterClient client, ITwitterClientEvents twitterClientEvents)
        {
            this.twitterClientEvents = twitterClientEvents;
            this.TwitterClient = client;
        }

        public Application.Requesters.ITwitterRequest CreateRequest()
        {
            return TwitterClient.CreateRequest();
        }

        protected async Task ExecuteRequestAsync(Func<Task> action, ITwitterRequest request)
        {
            try
            {
                await action().ConfigureAwait(false);
            }
            catch (TwitterException ex)
            {
                this.twitterClientEvents.RaiseOnTwitterException(ex);
                throw;
            }
        }

        protected async Task ExecuteRequestAsync(Func<ITwitterRequest, Task> action)
        {
            try
            {
                var request = TwitterClient.CreateRequest();
                await action(request).ConfigureAwait(false);
            }
            catch (TwitterException ex)
            {
                this.twitterClientEvents.RaiseOnTwitterException(ex);
                throw;
            }
        }

        protected async Task<T> ExecuteRequestAsync<T>(Func<ITwitterRequest, Task<T>> action) where T : class
        {
            try
            {
                var request = TwitterClient.CreateRequest();
                return await action(request).ConfigureAwait(false);
            }
            catch (TwitterException ex)
            {
                this.twitterClientEvents.RaiseOnTwitterException(ex);
                throw;
            }
        }

        protected async Task<T> ExecuteRequestAsync<T>(Func<Task<T>> action, ITwitterRequest request) where T : class
        {
            try
            {
                return await action().ConfigureAwait(false);
            }
            catch (TwitterException ex)
            {
                this.twitterClientEvents.RaiseOnTwitterException(ex);
                throw;
            }
        }
    }
}
