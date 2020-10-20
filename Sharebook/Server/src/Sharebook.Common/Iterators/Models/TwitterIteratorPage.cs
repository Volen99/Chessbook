namespace Sharebook.Common.Iterators.Models
{
    using System.Collections;
    using System.Collections.Generic;

    using Sharebook.Common.Public.Iterators;

    public class TwitterIteratorPage<TItemCollection, TItem, TCursor> : ITwitterIteratorPage<TItem, TCursor> where TItemCollection : IEnumerable<TItem>
    {
        private readonly TItemCollection items;

        public TwitterIteratorPage(TItemCollection items, TCursor nextCursor, bool isLastPage)
        {
            this.items = items;
            
            NextCursor = nextCursor;
            IsLastPage = isLastPage;
        }

        public TCursor NextCursor { get; }
        public bool IsLastPage { get; }

        public IEnumerator<TItem> GetEnumerator()
        {
            return ((IEnumerable<TItem>) this.items).GetEnumerator();    
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }
    }
}
