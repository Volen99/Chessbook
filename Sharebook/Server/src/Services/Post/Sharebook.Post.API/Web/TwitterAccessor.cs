namespace Sharebook.Post.API.Application.Web
{
    using System.Threading.Tasks;

    using Sharebook.Post.API.WebLogic;
    using Sharebook.Post.Application.Requesters;

    public class TwitterAccessor : ITwitterAccessor
    {
        private readonly ITwitterRequestHandler twitterRequestHandler;
        private readonly ITwitterResultFactory twitterResultFactory;

        public TwitterAccessor(ITwitterRequestHandler twitterRequestHandler, ITwitterResultFactory twitterResultFactory)
        {
            this.twitterRequestHandler = twitterRequestHandler;
            this.twitterResultFactory = twitterResultFactory;
        }

        public async Task<ITwitterResult> ExecuteRequestAsync(ITwitterRequest request) // APPEND goes here
        {
            var response = await this.twitterRequestHandler.ExecuteQueryAsync(request).ConfigureAwait(false);
            return this.twitterResultFactory.Create(request, response);
        }

        public async Task<ITwitterResult<T>> ExecuteRequestAsync<T>(ITwitterRequest request) // INIT and FINALIZE goes here
            where T : class
        {
            var typeCurrnet = typeof(T);
            var response = await this.twitterRequestHandler.ExecuteQueryAsync(request).ConfigureAwait(false);
            var result = this.twitterResultFactory.Create<T>(request, response);

            return result;
        }

        // Sign
        public Task PrepareTwitterRequestAsync(ITwitterRequest request)
        {
            return this.twitterRequestHandler.PrepareTwitterRequestAsync(request);
        }
    }
}
