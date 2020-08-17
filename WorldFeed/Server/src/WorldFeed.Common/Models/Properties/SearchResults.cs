namespace WorldFeed.Common.Models.Properties
{
    using System.Collections.Generic;
    using System.Linq;

    using global::WorldFeed.Common.Public.Models.Interfaces;
    using global::WorldFeed.Common.Public.Models.Interfaces.DTO;

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
