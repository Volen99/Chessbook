namespace Sharebook.Post.Client.Tools
{
    using System.Collections.Generic;

    using Sharebook.Common.Helpers;
    using Sharebook.Post.Domain.AggregatesModel;
    using Sharebook.Post.Domain.AggregatesModel.TweetAggregate;
    using Sharebook.Post.DTO;

    public class TwitterClientFactories : ITwitterClientFactories
    {
        private readonly ITwitterClient _client;
        private readonly IJsonObjectConverter _jsonObjectConverter;

        public TwitterClientFactories(ITwitterClient client, IJsonObjectConverter jsonObjectConverter)
        {
            _client = client;
            _jsonObjectConverter = jsonObjectConverter;
        }



        public IPost CreateTweet(string json)
        {
            var tweetDTO = _jsonObjectConverter.Deserialize<IPostDTO>(json);
            return this.CreateTweet(tweetDTO);
        }

        public IPost CreateTweet(IPostDTO tweetDTO)
        {
            if (tweetDTO == null)
            {
                return null;
            }

            return new Post(tweetDTO, _client.Config.TweetMode, _client);
        }

        public IPost[] CreateTweets(IEnumerable<IPostDTO> tweetDTOs)
        {
            return tweetDTOs?.Select(CreateTweet).ToArray();
        }

        public ITweetWithSearchMetadata CreateTweetWithSearchMetadata(ITweetWithSearchMetadataDTO tweetWithSearchMetadataDTO)
        {
            if (tweetWithSearchMetadataDTO == null)
            {
                return null;
            }

            return new TweetWithSearchMetadata(tweetWithSearchMetadataDTO, _client.Config.TweetMode, _client);
        }

        public IOEmbedTweet CreateOEmbedTweet(string json)
        {
            var dto = _jsonObjectConverter.Deserialize<IOEmbedTweetDTO>(json);
            return CreateOEmbedTweet(dto);
        }

        public IOEmbedTweet CreateOEmbedTweet(IOEmbedTweetDTO oEmbedTweetDTO)
        {
            if (oEmbedTweetDTO == null)
            {
                return null;
            }

            return new OEmbedTweet(oEmbedTweetDTO);
        }
    }
}
