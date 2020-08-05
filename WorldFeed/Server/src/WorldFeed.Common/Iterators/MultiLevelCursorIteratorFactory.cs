namespace WorldFeed.Common.Iterators
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;

    using WorldFeed.Common.Iterators.Models;
    using WorldFeed.Common.Public;
    using WorldFeed.Common.Public.Iterators;
    using WorldFeed.Common.Public.Models.Interfaces;
    using WorldFeed.Common.Public.Models.Interfaces.DTO.QueryDTO;
    using WorldFeed.Common.Web;

    public interface IMultiLevelCursorIteratorFactory
    {
        IMultiLevelCursorIterator<TInput, TOutput> Create<TDTO, TInput, TOutput>(
            ITwitterPageIterator<ITwitterResult<TDTO>> pageIterator,
            Func<TDTO, TInput[]> transform,
            Func<TInput[], Task<TOutput[]>> getChildItems,
            int maxPageSize);

        IMultiLevelCursorIterator<long, IUser> CreateUserMultiLevelIterator(
            ITwitterClient client,
            ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>> iterator,
            int maxPageSize);
    }

    public class MultiLevelCursorIteratorFactory : IMultiLevelCursorIteratorFactory
    {
        public IMultiLevelCursorIterator<TInput, TOutput> Create<TDTO, TInput, TOutput>(
            ITwitterPageIterator<ITwitterResult<TDTO>> pageIterator,
            Func<TDTO, TInput[]> transform,
            Func<TInput[], Task<TOutput[]>> getChildItems,
            int maxPageSize)
        {
            var iterator = new MultiLevelCursorIterator<TInput, TOutput>(
                async () =>
                {
                    var userIdsPage = await pageIterator.NextPageAsync().ConfigureAwait(false);

                    return new CursorPageResult<TInput, string>
                    {
                        Items = transform(userIdsPage.Content.Model),
                        NextCursor = userIdsPage.NextCursor,
                        IsLastPage = userIdsPage.IsLastPage
                    };
                }, async inputs =>
                {
                    var userIdsToAnalyze = inputs.Take(maxPageSize).ToArray();
                    var friends = await getChildItems(userIdsToAnalyze).ConfigureAwait(false);

                    return new MultiLevelPageProcessingResult<TInput, TOutput>
                    {
                        Items = friends,
                        AssociatedParentItems = userIdsToAnalyze,
                    };
                });

            return iterator;
        }

        public IMultiLevelCursorIterator<long, IUser> CreateUserMultiLevelIterator(
            ITwitterClient client,
            ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>> iterator,
            int maxPageSize)
        {
            return Create(iterator, dtoIds => dtoIds.Ids, client.Users.GetUsersAsync, maxPageSize);
        }
    }
}
