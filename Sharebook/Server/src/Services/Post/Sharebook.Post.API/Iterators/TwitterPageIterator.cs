namespace Sharebook.Post.API.Iterators
{
    using System;
    using System.Threading.Tasks;

    using Sharebook.Common.Exceptions.Public;
    using Sharebook.Post.API.Application.Web;
    using Sharebook.Post.API.Iterators.Models;

    // Iterators let you request multiple pages until no more items are available. - docs
    public interface ITwitterPageIterator<TPage, TCursor>
    {
        Task<ITwitterIteratorPageResult<TPage, TCursor>> NextPageAsync(); // request twitter for the next page of results

        TCursor NextCursor { get; } // is updated after each call to NextPageAsync. It can be used to start a new request at this position

        bool Completed { get; } // is updated after each call to NextPageAsync. It is marked as true when no more results are available

    }

    public interface ITwitterPageIterator<TPage> : ITwitterPageIterator<TPage, string>
    {
    }

    public class TwitterPageIterator<TPage> : TwitterPageIterator<TPage, string>, ITwitterPageIterator<TPage> where TPage : ITwitterResult
    {
        public TwitterPageIterator(string initialCursor,
            Func<string, Task<TPage>> getNextPage,
            Func<TPage, string> extractNextCursor,
            Func<TPage, bool> isCompleted)
            : base(initialCursor, getNextPage, extractNextCursor, isCompleted)
        {
        }
    }

    public class TwitterPageIterator<TPage, TCursor> : ITwitterPageIterator<TPage, TCursor> where TPage : ITwitterResult
    {
        private readonly Func<TCursor, Task<TPage>> getNextPage;
        private readonly Func<TPage, TCursor> extractNextCursor;
        private readonly Func<TPage, bool> isCompleted;

        public TwitterPageIterator(TCursor initialCursor,
            Func<TCursor, Task<TPage>> getNextPage,
            Func<TPage, TCursor> extractNextCursor,
            Func<TPage, bool> isCompleted)
        {
            NextCursor = initialCursor;

            this.getNextPage = getNextPage;
            this.extractNextCursor = extractNextCursor;
            this.isCompleted = isCompleted;
        }

        public TCursor NextCursor { get; private set; }

        public bool Completed { get; private set; }

        public async Task<ITwitterIteratorPageResult<TPage, TCursor>> NextPageAsync()
        {
            if (Completed)
            {
                throw new TwitterIteratorAlreadyCompletedException();
            }

            var page = await this.getNextPage(NextCursor).ConfigureAwait(false);
            NextCursor = this.extractNextCursor(page);
            Completed = this.isCompleted(page);

            return new TwitterIteratorPageResult<TPage, TCursor>(page, NextCursor, Completed);
        }
    }
}
