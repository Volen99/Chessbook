namespace WorldFeed.Search.Models.Properties
{
    using System.Collections.Generic;
    using System.Linq;

    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Search.DTO;

    public class SearchResults : ISearchResults
    {
        public SearchResults(IEnumerable<ITweetWithSearchMetadata> tweets, ISearchMetadata searchMetadata)
        {
            Tweets = tweets?.ToArray();
            SearchMetadata = searchMetadata;
        }

        public ITweetWithSearchMetadata[] Tweets { get; }

        public ISearchMetadata SearchMetadata { get; }
    }
}
