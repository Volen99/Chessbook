namespace WorldFeed.Client.Requesters
{
    using System;
    using System.Threading.Tasks;

    using WorldFeed.Common.Events;
    using WorldFeed.Common.Public;
    using WorldFeed.Common.Public.Client.Requesters;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Web;

    public class ExecuteRequester : BaseRequester, IExecuteRequester
    {
        private readonly ITwitterAccessor accessor;

        public ExecuteRequester(ITwitterClient client, ITwitterClientEvents clientEvents, ITwitterAccessor accessor)
        : base(client, clientEvents)
        {
            this.accessor = accessor;
        }

        public Task<ITwitterResult<T>> RequestAsync<T>(Action<ITwitterRequest> configureRequest) where T : class
        {
            return ExecuteRequestAsync(request =>
            {
                configureRequest(request);
                return this.accessor.ExecuteRequestAsync<T>(request);
            });
        }

        public Task<ITwitterResult> RequestAsync(Action<ITwitterRequest> configureRequest)
        {
            return ExecuteRequestAsync(request =>
            {
                configureRequest(request);
                return this.accessor.ExecuteRequestAsync(request);
            });
        }

        public Task<ITwitterResult<T>> RequestAsync<T>(Action<ITwitterQuery> configureQuery) where T : class
        {
            return ExecuteRequestAsync(request =>
            {
                configureQuery(request.Query);
                return this.accessor.ExecuteRequestAsync<T>(request);
            });
        }

        public Task<ITwitterResult> RequestAsync(Action<ITwitterQuery> configureQuery)
        {
            return ExecuteRequestAsync(request =>
            {
                configureQuery(request.Query);
                return this.accessor.ExecuteRequestAsync(request);
            });
        }

        public Task<ITwitterRequest> PrepareTwitterRequestAsync(Action<ITwitterQuery> configureQuery)
        {
            return ExecuteRequestAsync(async request =>
            {
                configureQuery(request.Query);
                await this.accessor.PrepareTwitterRequestAsync(request).ConfigureAwait(false);
                return request;
            });
        }

        public Task<ITwitterRequest> PrepareTwitterRequestAsync(Action<ITwitterRequest> configureRequest)
        {
            return ExecuteRequestAsync(async request =>
            {
                configureRequest(request);
                await this.accessor.PrepareTwitterRequestAsync(request).ConfigureAwait(false);
                return request;
            });
        }
    }
}