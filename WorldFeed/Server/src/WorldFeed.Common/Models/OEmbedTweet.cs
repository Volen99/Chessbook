namespace WorldFeed.Common.Models
{
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Models.Interfaces.DTO;

    public class OEmbedTweet : IOEmbedTweet
    {
        public IOEmbedTweetDTO OembedTweetDTO { get; set; }

        public OEmbedTweet(IOEmbedTweetDTO oEmbedTweetDTO)
        {
            OembedTweetDTO = oEmbedTweetDTO;
        }

        public string AuthorName => OembedTweetDTO.AuthorName;

        public string AuthorURL => OembedTweetDTO.AuthorURL;

        public string HTML => OembedTweetDTO.HTML;

        public string URL => OembedTweetDTO.URL;

        public string ProviderURL => OembedTweetDTO.ProviderURL;

        public double Width => OembedTweetDTO.Width;

        public double Height => OembedTweetDTO.Height;

        public string Version => OembedTweetDTO.Version;

        public string Type => OembedTweetDTO.Type;

        public string CacheAge => OembedTweetDTO.CacheAge;
    }
}
