namespace Sharebook.Common.Iterators.Models
{
    using Sharebook.Common.Iterators.Models;
    using Sharebook.Common.Public.Iterators;

    public class MultiLevelCursorIteratorPage<TParent, TItem, TCursor> : CursorPageResult<TItem, TCursor>, IMultiLevelCursorIteratorPage<TParent, TItem, TCursor>
    {
        public TParent[] AssociatedParentItems { get; set; }
    }
}
