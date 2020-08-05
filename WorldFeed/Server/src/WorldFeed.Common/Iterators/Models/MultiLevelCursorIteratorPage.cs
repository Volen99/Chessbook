namespace WorldFeed.Common.Iterators.Models
{
    using WorldFeed.Common.Iterators.Models;
    using WorldFeed.Common.Public.Iterators;

    public class MultiLevelCursorIteratorPage<TParent, TItem, TCursor> : CursorPageResult<TItem, TCursor>, IMultiLevelCursorIteratorPage<TParent, TItem, TCursor>
    {
        public TParent[] AssociatedParentItems { get; set; }
    }
}
