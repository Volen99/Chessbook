namespace WorldFeed.Common.Iterators.Models
{
    public interface IIteratorPageResult<out TPageContent, out TCursor>
    {
        TPageContent Content { get; }

        /// <summary>
        /// contains the next cursor to use for following requests
        /// </summary>
        TCursor NextCursor { get; }

        /// <summary>
        /// informs whether the page was the last one that could be reached
        /// </summary>
        bool IsLastPage { get; }
    }

    /// <summary>
    /// Pages are enumerators and contain elements returned by a single request
    /// </summary>
    public class IteratorPageResult<TPageContent, TCursor>: IIteratorPageResult<TPageContent, TCursor>
    {
        public IteratorPageResult(TPageContent content, TCursor nextCursor, bool isLastPage)
        {
            this.Content = content;
            this.NextCursor = nextCursor;
            this.IsLastPage = isLastPage;
        }
        
        public TPageContent Content { get; }

        public TCursor NextCursor { get; }

        public bool IsLastPage { get; }
    }
}
