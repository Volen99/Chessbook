namespace WorldFeed.Client
{
    using System;
    using System.Threading.Tasks;

    using WorldFeed.Common.Events;
    using WorldFeed.Common.Public;
    using WorldFeed.Common.Public.Exceptions;
    using WorldFeed.Common.Public.Models.Interfaces;

    public interface IBaseRequester
    {
    }

    public abstract class BaseRequester : IBaseRequester
    {
        protected ITwitterClient TwitterClient { get; }
        private readonly ITwitterClientEvents twitterClientEvents;

        protected BaseRequester(ITwitterClient client, ITwitterClientEvents twitterClientEvents)
        {
            this.twitterClientEvents = twitterClientEvents;
            TwitterClient = client;
        }

        public ITwitterRequest CreateRequest()
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
