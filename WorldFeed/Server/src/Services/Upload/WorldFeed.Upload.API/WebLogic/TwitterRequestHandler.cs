namespace WorldFeed.Upload.API.WebLogic
{
    using System;
    using System.Threading.Tasks;

    using WorldFeed.Common.Web;
    using WorldFeed.Upload.API.Web;
    using WorldFeed.Upload.Application.Query;
    using WorldFeed.Upload.Application.Requesters;
    using WorldFeed.Upload.Exceptions;

    public interface ITwitterRequestHandler
    {
        Task<ITwitterResponse> ExecuteQueryAsync(ITwitterRequest request);

        Task PrepareTwitterRequestAsync(ITwitterRequest request);
    }

    public class TwitterRequestHandler : ITwitterRequestHandler
    {
        private readonly IWebRequestExecutor webRequestExecutor;

        public TwitterRequestHandler(IWebRequestExecutor webRequestExecutor)
        {
            this.webRequestExecutor = webRequestExecutor;
        }

        public async Task<ITwitterResponse> ExecuteQueryAsync(ITwitterRequest request)
        {
            await PrepareTwitterRequestAsync(request).ConfigureAwait(false);

            try
            {
                ITwitterResponse twitterResponse;

                if (!(request.Query is IMultipartTwitterQuery))
                {
                    twitterResponse = await this.webRequestExecutor.ExecuteQueryAsync(request, request.TwitterClientHandler).ConfigureAwait(false);
                }
                else
                {
                    twitterResponse = await this.webRequestExecutor.ExecuteMultipartQueryAsync(request).ConfigureAwait(false);
                }

                return twitterResponse;
            }
            catch (TwitterException ex)
            {
                throw ex;
            }
        }

        public async Task PrepareTwitterRequestAsync(ITwitterRequest request)
        {
            var twitterQuery = request.Query;
            twitterQuery.Url = CleanupQueryUrl(twitterQuery.Url); // TODO : THIS LOGIC SHOULD HAPPEN BEFORE ARRIVING HERE

            // before clean up: {https://upload.twitter.com/1.1/media/upload.json?command=INIT&media_type=video%2Fmp4&total_bytes=67465&media_category=tweet_video}
            // after clean up:  "https://upload.twitter.com/1.1/media/upload.json?command=INIT&media_type=video%2Fmp4&total_bytes=67465&media_category=tweet_video"
        }

        private static string CleanupQueryUrl(string query)
        {
            var index = query.IndexOf("?", StringComparison.OrdinalIgnoreCase);
            if (index > 0)
            {
                if (query.Length == index + 1)
                {
                    query = query.Remove(index);
                    return query;
                }

                if (query.Length > index && query[index + 1] == '&')
                {
                    query = query.Remove(index + 1, 1);
                }
            }

            return query;
        }
    }
}
