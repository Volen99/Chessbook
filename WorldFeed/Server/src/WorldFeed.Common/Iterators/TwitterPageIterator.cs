namespace WorldFeed.Common.Iterators
{
    using System;
    using System.Threading.Tasks;

    using WorldFeed.Common.Iterators.Models;
    using WorldFeed.Common.Public.Exceptions;
    using WorldFeed.Common.Web;

    public interface ITwitterPageIterator<TPage, TCursor>
    {
        TCursor NextCursor { get; }
        bool Completed { get; }
        Task<ITwitterIteratorPageResult<TPage, TCursor>> NextPageAsync();
    }

    public interface ITwitterPageIterator<TPage> : ITwitterPageIterator<TPage, string>
    {
    }

    public class TwitterPageIterator<TPage> : TwitterPageIterator<TPage, string>, ITwitterPageIterator<TPage> where TPage : ITwitterResult
    {
        public TwitterPageIterator(
            string initialCursor,
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

        public TwitterPageIterator(
            TCursor initialCursor,
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
