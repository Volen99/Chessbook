using System.Linq;
using Chessbook.Core.Domain.Posts;

namespace Chessbook.Services.Entities
{
    public static class PostExtensions
    {
        /// <summary>
        /// Sorts the elements of a sequence in order according to a post sorting rule
        /// </summary>
        /// <param name="productsQuery">A sequence of posts to order</param>
        /// <param name="orderBy">Post sorting rule</param>
        /// <returns>An System.Linq.IOrderedQueryable`1 whose elements are sorted according to a rule.</returns>
        public static IOrderedQueryable<Post> OrderBy(this IQueryable<Post> productsQuery, ProductSortingEnum orderBy) 
        {
            return orderBy switch
            {
                // ProductSortingEnum.NameAsc => productsQuery.OrderBy(p => p.Name),
                // ProductSortingEnum.NameDesc => productsQuery.OrderByDescending(p => p.Name),
                ProductSortingEnum.Match => productsQuery.OrderBy(p => p.Id),
                ProductSortingEnum.Likes => productsQuery.OrderByDescending(p => p.FavoriteCount),
                ProductSortingEnum.CreatedOn => productsQuery.OrderByDescending(p => p.CreatedAt),
                _ => productsQuery.OrderBy(p => p.Id)
            };
        }
    }
}
