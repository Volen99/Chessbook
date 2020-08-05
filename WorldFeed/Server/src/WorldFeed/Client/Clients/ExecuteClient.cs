namespace WorldFeed.Client.Clients
{
    using System;
    using System.Threading.Tasks;

    using WorldFeed.Common.Public.Client.Clients;
    using WorldFeed.Common.Public.Client.Requesters;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Web;

    public class ExecuteClient : IExecuteClient
    {
        private readonly IExecuteRequester executeRequester;

        public ExecuteClient(IExecuteRequester executeRequester)
        {
            this.executeRequester = executeRequester;
        }

        public Task<ITwitterResult<T>> AdvanceRequestAsync<T>(Action<ITwitterRequest> configureRequest)
            where T : class
        {
            return this.executeRequester.RequestAsync<T>(configureRequest);
        }

        public Task<ITwitterResult> AdvanceRequestAsync(Action<ITwitterRequest> configureRequest)
        {
            return this.executeRequester.RequestAsync(configureRequest);
        }

        public Task<ITwitterResult<T>> RequestAsync<T>(Action<ITwitterQuery> configureQuery)
            where T : class
        {
            return this.executeRequester.RequestAsync<T>(configureQuery);
        }

        public Task<ITwitterResult> RequestAsync(Action<ITwitterQuery> configureQuery)
        {
            return this.executeRequester.RequestAsync(configureQuery);
        }

        public Task<ITwitterRequest> PrepareTwitterRequestAsync(Action<ITwitterQuery> configureQuery)
        {
            return this.executeRequester.PrepareTwitterRequestAsync(configureQuery);
        }

        public Task<ITwitterRequest> PrepareTwitterRequestAsync(Action<ITwitterRequest> configureRequest)
        {
            return this.executeRequester.PrepareTwitterRequestAsync(configureRequest);
        }
    }
}