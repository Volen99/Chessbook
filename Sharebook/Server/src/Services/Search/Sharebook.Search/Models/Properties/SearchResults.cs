namespace Sharebook.Search.Models.Properties
{
    using System.Collections.Generic;
    using System.Linq;

    using Sharebook.Common.Public.Models.Interfaces;
    using Sharebook.Search.DTO;

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
