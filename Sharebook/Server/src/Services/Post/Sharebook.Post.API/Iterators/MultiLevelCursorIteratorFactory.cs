namespace Sharebook.Post.API.Iterators
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;

    using Sharebook.Common.Iterators;
    using Sharebook.Common.Iterators.Models;
    using Sharebook.Common.Public.Iterators;
    using Sharebook.Common.Public.Models.Interfaces.DTO.QueryDTO;
    using Sharebook.Post.API.Application.Web;
    using Sharebook.Post.API.Infrastructure.Inject.Contracts;

    public interface IMultiLevelCursorIteratorFactory
    {
        IMultiLevelCursorIterator<TInput, TOutput> Create<TDTO, TInput, TOutput>(
            ITwitterPageIterator<ITwitterResult<TDTO>> pageIterator,
            Func<TDTO, TInput[]> transform,
            Func<TInput[], Task<TOutput[]>> getChildItems,
            int maxPageSize);

        IMultiLevelCursorIterator<long, IUser> CreateUserMultiLevelIterator(ITwitterClient client,
            ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>> iterator, int maxPageSize);
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

        public IMultiLevelCursorIterator<long, IUser> CreateUserMultiLevelIterator(ITwitterClient client,
            ITwitterPageIterator<ITwitterResult<IIdsCursorQueryResultDTO>> iterator, int maxPageSize)
        {
            return Create(iterator, dtoIds => dtoIds.Ids, client.Users.GetUsersAsync, maxPageSize);
        }
    }
}
