namespace WorldFeed.Common.Iterators
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using WorldFeed.Common.Iterators.Models;
    using WorldFeed.Common.Public.Iterators;

    public class TwitterIteratorProxy<TInput, TOutput> : TwitterIteratorProxy<TInput, TOutput, string>, ITwitterIterator<TOutput>
    {
        public TwitterIteratorProxy(ITwitterPageIterator<TInput, string> source, Func<TInput, TOutput[]> transform) : base(source, transform)
        {
        }
    }

    public class TwitterIteratorProxy<TInput, TOutput, TCursor> : ITwitterIterator<TOutput, TCursor>
    {
        private readonly ITwitterPageIterator<TInput, TCursor> source;
        private readonly Func<TInput, TOutput[]> transform;

        public TwitterIteratorProxy(ITwitterPageIterator<TInput, TCursor> source, Func<TInput, TOutput[]> transform)
        {
            this.source = source;
            this.transform = transform;
        }

        public TwitterIteratorProxy(ITwitterPageIterator<TInput, TCursor> source, Func<TInput, IEnumerable<TOutput>> transform)
        {
            this.source = source;
            this.transform = input => transform(input).ToArray();
        }

        public TCursor NextCursor { get; private set; }

        public bool Completed { get; private set; }

        public async Task<ITwitterIteratorPage<TOutput, TCursor>> NextPageAsync()
        {
            var page = await this.source.NextPageAsync().ConfigureAwait(false);
            var items = this.transform(page.Content);

            NextCursor = page.NextCursor;
            Completed = page.IsLastPage;

            return new TwitterIteratorPage<TOutput[], TOutput, TCursor>(items, NextCursor, Completed);
        }
    }
}
