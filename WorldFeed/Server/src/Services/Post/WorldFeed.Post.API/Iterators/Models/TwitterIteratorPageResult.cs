namespace WorldFeed.Post.API.Iterators.Models
{
    using WorldFeed.Common.Iterators.Models;
    using WorldFeed.Post.API.Application.Web;

    public interface ITwitterIteratorPageResult<out TPageContent, out TCursor> : IIteratorPageResult<TPageContent, TCursor>
    {
        string RawResult { get; }
    }

    public class TwitterIteratorPageResult<TPageContent, TCursor> : IteratorPageResult<TPageContent, TCursor>, ITwitterIteratorPageResult<TPageContent, TCursor>
        where TPageContent : ITwitterResult
    {

        public TwitterIteratorPageResult(TPageContent content, TCursor nextCursor, bool isLastPage)
            : base(content, nextCursor, isLastPage)
        {
            this.RawResult = content.Content;
        }

        public string RawResult { get; }
    }
}
