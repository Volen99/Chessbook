namespace Sharebook.Common.Iterators
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Sharebook.Common.Exceptions.Public;
    using Sharebook.Common.Extensions;
    using Sharebook.Common.Iterators.Models;
    using Sharebook.Common.Public.Iterators;

    public class MultiLevelCursorIterator<TParent, TItem> : MultiLevelCursorIterator<TParent, TItem, string>, IMultiLevelCursorIterator<TParent, TItem>
    {
        public MultiLevelCursorIterator(
            Func<Task<ICursorPageResult<TParent, string>>> iterateSubLevel,
            Func<TParent[], Task<IPageProcessingResult<TParent, TItem>>> getChildItemsPageFromParent) : base(iterateSubLevel, getChildItemsPageFromParent)
        {
        }
    }

    public class MultiLevelCursorIterator<TParent, TItem, TCursor> : IMultiLevelCursorIterator<TParent, TItem, TCursor>
    {
        private readonly Func<Task<ICursorPageResult<TParent, TCursor>>> iterateSubLevel;
        private readonly Func<TParent[], Task<IPageProcessingResult<TParent, TItem>>> getChildItemsPageFromParent;

        private HashSet<TParent> itemsLeftToProcess;
        private ICursorPageResult<TParent, TCursor> lastParentPageResult;

        public MultiLevelCursorIterator(
            Func<Task<ICursorPageResult<TParent, TCursor>>> iterateSubLevel,
            Func<TParent[], Task<IPageProcessingResult<TParent, TItem>>> getChildItemsPageFromParent)
        {
            this.iterateSubLevel = iterateSubLevel;
            this.getChildItemsPageFromParent = getChildItemsPageFromParent;
            this.itemsLeftToProcess = new HashSet<TParent>();
        }

        public bool Completed => this.lastParentPageResult != null && this.lastParentPageResult.IsLastPage && this.itemsLeftToProcess.Count == 0;

        public async Task<IMultiLevelCursorIteratorPage<TParent, TItem, TCursor>> NextPageAsync()
        {
            if (Completed)
            {
                throw new TwitterIteratorAlreadyCompletedException();
            }

            if (this.lastParentPageResult == null || this.itemsLeftToProcess.Count == 0)
            {
                this.lastParentPageResult = await this.iterateSubLevel().ConfigureAwait(false);
                this.itemsLeftToProcess = new HashSet<TParent>(this.lastParentPageResult.Items);
            }

            var childItemsPage = await this.getChildItemsPageFromParent(this.itemsLeftToProcess.ToArray()).ConfigureAwait(false);
            var processedParentItems = childItemsPage.AssociatedParentItems;

            processedParentItems.ForEach(item => { this.itemsLeftToProcess.Remove(item); });

            var pageResult = new MultiLevelCursorIteratorPage<TParent, TItem, TCursor>
            {
                Items = childItemsPage.Items,
                AssociatedParentItems = processedParentItems,
                NextCursor = this.lastParentPageResult.NextCursor,
                IsLastPage = Completed
            };

            return pageResult;
        }
    }
}
