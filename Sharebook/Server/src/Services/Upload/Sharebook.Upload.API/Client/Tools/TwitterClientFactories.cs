namespace Sharebook.Upload.Client.Tools
{
    using System.Collections.Generic;
    using System.Linq;

    using Sharebook.Common.Helpers;
    using Sharebook.Upload.Domain;
    using Sharebook.Upload.Domain.AggregatesModel.TweetAggregate;
    using Sharebook.Upload.DTO;
    using Sharebook.Upload.Infrastructure.Inject.Contracts;
    using Sharebook.Upload.Models.DTO;

    public class TwitterClientFactories : ITwitterClientFactories
    {
        private readonly ITwitterClient client;
        private readonly IJsonObjectConverter jsonObjectConverter;

        public TwitterClientFactories(ITwitterClient client, IJsonObjectConverter jsonObjectConverter)
        {
            this.client = client;
            this.jsonObjectConverter = jsonObjectConverter;
        }

        public IMedia CreateMedia(string json)
        {
            return this.jsonObjectConverter.Deserialize<Media>(json);
        }

        public IUploadedMediaInfo CreateUploadedMediaInfo(string json)
        {
            return this.jsonObjectConverter.Deserialize<IUploadedMediaInfo>(json);
        }

        public ITweet CreateTweet(string json)
        {
            var tweetDTO = this.jsonObjectConverter.Deserialize<ITweetDTO>(json);
            return CreateTweet(tweetDTO);
        }

        public ITweet CreateTweet(ITweetDTO tweetDTO)
        {
            if (tweetDTO == null)
            {
                return null;
            }

            // return new Tweet(tweetDTO, this.client.Config.TweetMode, this.client);

            return default;
        }

        public ITweet[] CreateTweets(IEnumerable<ITweetDTO> tweetDTOs)
        {
            return tweetDTOs?.Select(CreateTweet).ToArray();
        }
    }
}
